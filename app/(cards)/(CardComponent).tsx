'use client'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Stack } from '@mantine/core';
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
  const [page, setPage] = useState<number>(1)

  pb.autoCancellation(false)

  async function fetchData() {
    const data = await pb.collection("questions").getList(page, 10, { sort: "-created" })
    setData(data.items as IQuestion[])
  }

  function changePage(direction: "back" | "forward") {
    switch (direction) {
      case "back":
        if (page >= 1) return
        setPage(page - 1)
        return
      case "forward":
        setPage(page + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  pb.authStore.onChange(() => router.refresh())

  return (
    <Stack>
      <div className="card-wrapper">
        {data && data.map((question, index) => {
          const id = question.id
          return (
            <Card key={index} props={{ id }} />
          )
        }
        )}
      </div>

      <div className="card-wrapper">
        <ActionIcon onClick={() => changePage("back")}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </ActionIcon>

        <ActionIcon onClick={() => changePage("forward")}>
          <FontAwesomeIcon icon={faCaretRight} />
        </ActionIcon>
      </div>
    </Stack>
  )
}
