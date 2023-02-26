import { Group } from "@mantine/core";
import { IQuestion } from "../../../interfaces/interfaces";
import CommentButton from "./socialButtons/(comment)";
import LikeButton from "./socialButtons/(like)";

export default function InteractionsRow({ question }: { question: IQuestion }) {

  return (
    <Group
      sx={{ marginTop: ".5rem" }}
      position="apart">
      <CommentButton props={question} />
      <LikeButton props={question} />
    </Group>
  )
}
