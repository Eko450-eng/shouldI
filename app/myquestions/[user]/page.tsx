import Card from '../../(cards)/(components)/(card)'
import pb from '../../(pb_functions)'
export async function getCollection(c?: "no-store" | "force-cache") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/questions/records`, { cache: `${c == "no-store" ? "no-store" : c == "force-cache" ? "force-cache" : "no-store"}` })
  const returnValue = await res.json()
  return returnValue
}

export default async function Page({ params }: any) {

  // const { items } = await getCollection()
  const questionIdsExpr = `owner='${params.user}'`
  const items = await pb.collection("questions").getFullList(200, { filter: questionIdsExpr })

  return (
    <div>
      {items.map((i: any, index: number) => <Card key={index} props={{ i }} />)}
    </div>
  )
}

