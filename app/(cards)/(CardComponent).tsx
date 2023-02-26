'use client'
import pb from 'app/(pb_functions)';
import Loading from 'app/loading';
import { useRouter } from 'next/navigation';
import { ListResult, Record } from 'pocketbase';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../interfaces/interfaces';
import '../../styles/globals.scss'
import Card from './(components)/(card)';

export default function CardComponent() {
  const [items, setItems] = useState<IQuestion[] | null>(null)
  const router = useRouter()

  async function refetch() {
    await pb.collection("questions").getList(1, 50, { $autoCancel: false, sort: "-created" })
      .then((e: ListResult<Record>) => {
        let item = e.items as IQuestion[]
        setItems(item)
      })
  }

  useEffect(() => { refetch() }, [])

  pb.collection("questions").subscribe('*', () => {
    refetch()
  })

  pb.authStore.onChange(() => router.refresh())

  return (
    <div className="card-wrapper">
      {items ?
        items.map((question, index) =>
          <Card key={index} props={{ question }} />
        )
        :
        <Loading />
      }
    </div>
  )
}
