import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

type Data = {
  name: string,
  email: string,
  password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  try {
    const data = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password
      }
    })
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json(e)
  }
}
