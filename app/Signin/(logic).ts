import pb from "../(pb_functions)"
import { IUserData } from "../../interfaces/interfaces";


export const login = async (userName: string, password: string) => {
  pb.collection("users").authWithPassword(userName, password)
  return true
}

export const signup = async (data: IUserData) => {
  await pb.collection('users').create(data);
  if (!pb.authStore.isValid)
    pb.collection("users").authWithPassword(data.username, data.password)
  await pb.collection('users').requestVerification(data.email);
  return true
}
