export interface voter extends Array<any> {
  name: string
  id: string
  vote: number
}

export interface voters {
  voted: string[]
  voters: voter
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
  voters: voters
  likers: string[]
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
  avatar?: ImageData
}
