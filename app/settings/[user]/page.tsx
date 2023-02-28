'use client'
import { Button, Text } from "@mantine/core";
import { IUser } from "interfaces/interfaces";

export default function User({ params }: { params: { user: IUser } }) {
  console.log(params)


  return (
    <>
      <Text>Still in development</Text>
    </>
  )
}
