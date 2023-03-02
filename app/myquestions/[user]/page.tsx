import { IQuestion } from 'interfaces/interfaces'
import Card from '../../(cards)/(components)/(card)'

async function getCollection(user: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/questions/records/?filter=(owner="${user}")`, { cache: "no-cache" })
  return res.json()
}

export default async function Page({ params }: { params: { user: string } }) {
  const { items } = await getCollection(params.user)

  return (
    <div className="card-wrapper">
      {items.map((question: IQuestion, index: number) => {
        const id = question.id
        return <Card key={index} props={{ id }} />
      })}
    </div>
  )
}

