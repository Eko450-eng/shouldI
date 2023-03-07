// 'use client'
// import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ActionIcon, Stack } from '@mantine/core';
import { IQuestion } from 'interfaces/interfaces';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { IQuestion } from '../../interfaces/interfaces';
import '../../styles/globals.scss'
import Card from './(components)/(card)';
global.EventSource = require("eventsource");

async function fetchData() {
  const res = await fetch('https://pbdb.shouldi.online/api/collections/questions/records?sort=-created', { cache: "no-cache" })
  const jsonData = await res.json()
  const items = jsonData.items
  if (!res.ok) return
  return items as IQuestion[]
}

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/getUsers')
  if (!res.ok) return
  return res.json
}

export default async function CardComponent() {
  const data = await fetchData()
  const users = await getUsers()
  console.log(users)
  // const router = useRouter()
  // const [data, setData] = useState<IQuestion[] | null>(null)
  // const [page, setPage] = useState<number>(1)


  // async function fetchData() {
  //   const data = await pb.collection("questions").getList(page, 10, { sort: "-created" })
  //   setData(data.items as IQuestion[])
  // }

  // function changePage(direction: "back" | "forward") {
  //   switch (direction) {
  //     case "back":
  //       if (page >= 1) return
  //       setPage(page - 1)
  //       return
  //     case "forward":
  //       setPage(page + 1)
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [page])

  // pb.authStore.onChange(() => router.refresh())

  return (
    <div>
      <div className="card-wrapper">
        {data && data.map((question, index) => {
          const id = question.id
          return (
            <Card key={index} props={{ id }} />
          )
        }
        )}
      </div>

      {/* <div className="card-wrapper"> */}
      {/*   <ActionIcon onClick={() => changePage("back")}> */}
      {/*     <FontAwesomeIcon icon={faCaretLeft} /> */}
      {/*   </ActionIcon> */}

      {/*   <ActionIcon onClick={() => changePage("forward")}> */}
      {/*     <FontAwesomeIcon icon={faCaretRight} /> */}
      {/*   </ActionIcon> */}
      {/* </div> */}
    </div>
  )
}
