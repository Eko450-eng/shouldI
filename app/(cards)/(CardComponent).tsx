'use client'
import pb from 'app/(pb_functions)';
import Loading from 'app/loading';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../interfaces/interfaces';
import '../../styles/globals.scss'
import Card from './(components)/(card)';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

export default function CardComponent() {
  const [items, setItems] = useState<IQuestion[] | null>(null)
  const router = useRouter()

  async function refetch() {
    await pb.collection("questions").getList(1, 50, { $autoCancel: false })
      .then((e: any) => {
        let item = e.items as IQuestion[]
        setItems(item)
      })
  }

  useEffect(() => {
    refetch()
  }, [])

  pb.collection("questions").subscribe('*', () => {
    refetch()
  })

  pb.authStore.onChange(() => router.refresh())

  const [loading, setLoading] = useState(0)
  const [pullStartY, setPullStartY] = useState(0)
  const [pullCurrentY, setPullCurrentY] = useState(0)
  const [visualizer, setVisualizer] = useState(-30)

  function handleRefresh() {
    router.refresh()
  }

  useEffect(() => {
    window.addEventListener("touchstart", (e: TouchEvent) => {
      setPullStartY(e.targetTouches[0].screenY)
    })
    window.addEventListener("touchmove", (e: TouchEvent) => {
      setPullCurrentY(e.changedTouches[0].screenY)
      let changeInY = pullStartY < pullCurrentY ? Math.abs(pullStartY - pullCurrentY) : 0
      setLoading(changeInY)

      setVisualizer(changeInY - 80)
    })

    window.addEventListener("touchcancel", (e: TouchEvent) => {
      setLoading(0)
    })

    window.addEventListener("touchend", (e: TouchEvent) => {
      setVisualizer(-30)
      console.log(loading)
      if (loading >= 150) handleRefresh()
      setLoading(0)
    })
  })

  return (
    <div className="card-wrapper">
      <FontAwesomeIcon icon={faRotateRight} style={{
        position: "absolute",
        top: "0",
        right: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        transition: "all linear .1s ",
        // rotate: `${visualizer * 1.5}deg`,
        // marginTop: `${visualizer}px`
      }} />
      {items ?
        items.map((question, index) => <Card key={index} props={{ question }} />)
        : <Loading />
      }
    </div>
  )
}
