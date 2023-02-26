import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { Record } from "pocketbase";

// Interfaces for the Question prop
export interface IVoters {
  voted: string[];
  voters: [
    {
      name: string;
      id: string;
      vote: number;
    }
  ];
}

export interface IComment {
  userID: string;
  user: string;
  message: string;
  thread: string;
}

export interface IComments {
  comments: IComment[]
}

export interface IQuestionSimplified extends Object {
  title: string
  desc?: string
  image1?: string | File | null
  image2?: string | File | null
  optionNameOne: string
  optionNameTwo: string
  color1: string,
  color2: string
}

export interface IQuestion extends Record {
  color1: string,
  color2: string
  owner?: string
  collectionId: string
  collectionName: string
  created: string
  id: string
  updated: string
  title: string
  desc?: string
  image1?: string | File | null
  image2?: string | File | null
  answerOne: number
  answerTwo: number
  optionNameOne: string
  optionNameTwo: string
  voters: IVoters
  likers: string[]
  comments?: IComments
}

// My own
export interface IUser extends Record {
  username: string;
  email?: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
  image?: string | File | null;
  avatar?: string;
}

export interface MenuItem {
  title: string
  icon: IconDefinition
  function?: () => void
}


// Might be unnecessary
export interface IApiFetchCall {
  items: IQuestion[]
  page: number
  perPage: number
  totalItems: number
  totalPages: number
}

export interface IPBRecord {
  items: Array<IQuestion>
}

export interface IFirstAnswer {
  answerOne: number;
  voters: IVoters;
}

export interface ISecondAnswer {
  answerTwo: number;
  voters: IVoters;
}

export interface IVoteButton {
  name: string
  votes: number
  vote: 1 | 2
  voteValue: number
  card: IQuestion
  currentState: string
}

