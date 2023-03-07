import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

type Data = {
  name: string,
  email: string,
  password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.user.findMany()
    console.log(data)
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json(e)
  }
}
