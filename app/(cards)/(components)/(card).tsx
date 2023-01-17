'use client'
import Buttons from "./(buttons)"
import ImageComponent from "./(imageComponent)"
import InteractionsRow from "./(InteractionsRow)"

interface InterfaceProps { i: any }

export default function card({ props }: { props: InterfaceProps }) {
  const { i } = props
  const image1 = `${process.env.NEXT_PUBLIC_DBURL}/api/files/${i.collectionId}/${i.id}/${i.image1}`
  const image2 = `${process.env.NEXT_PUBLIC_DBURL}/api/files/${i.collectionId}/${i.id}/${i.image2}`

  return (
    <div className="question-card">
      <h2 className="question-card-title">{i.title}</h2>
      <p className="question-card-desc">{i.desc ? i.desc : ""}</p>
      <ImageComponent props={{ i, image1, image2 }} />
      <Buttons i={i} />
      <InteractionsRow question={i.id} />
    </div>
  )
}
