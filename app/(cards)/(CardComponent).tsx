import { IApiFetchCall } from '../../interfaces/interfaces';
import '../../styles/globals.scss'
import Card from './(components)/(card)';

async function getCollection() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/questions/records`, { cache: 'no-store' })
  const returnValue = await res.json()
  return returnValue
}

export default async function CardComponent() {
  const { items } = await getCollection() as IApiFetchCall

  return (
    <>
      {
        items.map((i, index) => <Card key={index} props={{ i }} />)
      }
    </>
  )
}
