import { IComment, IQuestion } from 'interfaces/interfaces'
import Card from '../../(cards)/(components)/(card)'
import AddComment from './(addComment)'

async function getComments(question: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/comments/records/?filter=(thread="${question}")`, { cache: 'no-store' })
  return res.json()
}

async function getCollection(question: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/questions/records/${question}`, { cache: 'no-store' })
  const returnValue = await res.json()
  return returnValue
}

export default async function Page({ params }: { params: { question: string } }) {
  const collection = await getCollection(params.question)
  const question = collection as IQuestion
  const { items } = await getComments(params.question)

  return (
    <div className="flex-center">
      <Card props={{ question }} />
      <div className="commentbox-wrapper">
        {
          items.map((comment: IComment, index: number) => {
            return (
              <div className="commentbox" key={index}>
                <p>{comment.user}</p>
                <p>{comment.message}</p>
              </div>
            )
          })
        }
      </div>
      <AddComment id={question.id} />
    </div>
  )
}
