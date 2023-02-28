'use client'
import pb from 'app/(pb_functions)';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IQuestion } from '../../interfaces/interfaces';
import '../../styles/globals.scss'
import Card from './(components)/(card)';
global.EventSource = require("eventsource");

export default function CardComponent() {
  const router = useRouter()
  const [data, setData] = useState<IQuestion[] | null>(null)
  pb.autoCancellation(false)
  async function fetchData() {
    const data = await pb.collection("questions").getFullList()
    setData(data as IQuestion[])
  }
  useEffect(() => { fetchData() }, [])
  pb.authStore.onChange(() => router.refresh())

  pb.collection("questions").subscribe('*', () => fetchData())

  return (
    <div className="card-wrapper">
      {data &&
        data.map((question, index) =>
          <Card key={index} props={{ question }} />
        )
      }
    </div>
  )
}
