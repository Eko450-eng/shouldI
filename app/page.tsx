import CardComponent from './(cards)/(CardComponent)'
import ActionBar from './profile/(actionbar)/(actionBar)'
import '../styles/globals.scss'

export default async function Page() {

  return (
    <main className="main">
      <ActionBar />
      <CardComponent />
    </main>
  )
}
