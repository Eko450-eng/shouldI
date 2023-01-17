import Pocketbase from 'pocketbase'
import { IApiFetchCall, IPBRecord, IQuestion } from '../interfaces/interfaces'
const pb = new Pocketbase(process.env.NEXT_PUBLIC_DBURL)

export function logout() { pb.authStore.clear() }

export async function getData(collection: string) {
  const record: IPBRecord = await pb.collection(collection).getList(1, 20, { $autoCancel: false })
  const item: IQuestion[] = record.items
  return item
}

export async function getCollection(collection: string, c?: "no-store" | "force-cache") {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/${collection}/records`, { cache: `${c == "no-store" ? "no-store" : c == "force-cache" ? "force-cache" : "no-store"}` })
  const returnValue = await res.json() as IApiFetchCall
  return returnValue.items
}

export async function getUsers() {
  if (!pb.authStore.model) return
  const user = await fetch(`${process.env.NEXT_PUBLIC_DBURL}/api/collections/users/records/${pb.authStore.model.id}`, { cache: "no-store" })
  return user.json()
}


export default pb
