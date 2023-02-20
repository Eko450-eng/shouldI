'use client'
import pb from 'app/(pb_functions)';
import Loading from 'app/loading';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../interfaces/interfaces';
import '../../styles/globals.scss'
import Card from './(components)/(card)';

export default function CardComponent() {
  const [items, setItems] = useState<IQuestion[] | null>(null)

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

  return (
    <div className="card-wrapper">
      {items ?
        items.map((question, index) => <Card key={index} props={{ question }} />)
        : <Loading />
      }
    </div>
  )
}
