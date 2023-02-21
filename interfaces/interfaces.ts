import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export interface IVoter extends Array<any> {
  name: string
  id: string
  vote: number
}

export interface IVoters {
  voted: string[]
  voters: IVoter
}

export interface IComment {
  userID: string,
  user: string,
  message: string,
  thread: any
}

export interface IComments {
  comments: IComment[]
}

export interface IApiFetchCall {
  items: IQuestion[]
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}

export interface IQuestionSimplified extends Object {
  title: string
  desc?: string
  image1?: any
  image2?: any
  optionNameOne: string
  optionNameTwo: string
}

export interface IQuestion extends Object {
  owner?: string
  collectionId: string
  collectionName: string
  created: any
  id: string
  updated: any
  title: string
  desc?: string
  image1?: any
  image2?: any
  answerOne: number
  answerTwo: number
  optionNameOne: string
  optionNameTwo: string
  voters: IVoters
  likers: string[]
  comments?: IComments
}

export interface IPBRecord {
  items: Array<IQuestion>
}

export interface IUserData {
  username: string,
  email: string,
  emailVisibility: boolean,
  password: string,
  passwordConfirm: string,
  name: string,
  image?: any
}

export interface IDrawer {
  open: boolean;
  position: "right" | "left";
  size: boolean;
}

export interface MenuItem {
  title: string
  icon: IconDefinition
  function?: () => void
}

