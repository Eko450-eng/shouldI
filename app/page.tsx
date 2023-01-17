import CardComponent from './(cards)/(CardComponent)'

export default async function Page() {

  return (
    <main>
      {/* @ts-expect-error react types */}
      <CardComponent />
    </main>
  )
}
