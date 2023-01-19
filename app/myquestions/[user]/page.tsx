import { IQuestion } from 'interfaces/interfaces'
import Card from '../../(cards)/(components)/(card)'

async function getCollection(user: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/questions/records/?filter=(owner="${user}")`, { cache: "no-cache" })
  return res.json()
}

export default async function Page({ params }: { params: { user: string } }) {
  const { items } = await getCollection(params.user)

  return (
    <div>
      {items.map((question: IQuestion, index: number) => {
        return <Card key={index} props={{ question }} />
      })}
    </div>
  )
}

