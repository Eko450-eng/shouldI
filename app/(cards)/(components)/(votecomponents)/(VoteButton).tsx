import { Button, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import answer from "app/(cards)/(logic)";
import pb from "app/(pb_functions)";
import { IFirstAnswer, ISecondAnswer, IUser, IVoteButton } from "interfaces/interfaces";

export default function VoteButton({ props }: { props: IVoteButton }) {
  const { name, votes, vote, card, voteValue, currentState } = props
  const highlight: boolean = vote == voteValue



  function onVoteHandler(vote: number) {
    if (!pb.authStore.model || currentState !== "canVote") {
      showNotification({
        title: "You shall not vote",
        message: "Pleas login to be able to vote",
        color: "red"
      })
      return
    }
    answer(pb.authStore.model as IUser, card.id, vote)
      .then(
        (value: IFirstAnswer | ISecondAnswer | undefined) => {
          if (!value) return
          pb.collection("questions").update(card.id, value)
        }
      ).catch((e) => {
        showNotification({
          title: "Opps",
          message: `${e.message}`,
          color: "red"
        })
      })
  }


  return (
    <Button
      sx={(theme) => ({
        background: "none",
        color: "white",
        border: highlight ? `2px solid ${vote == 1 ? card.color1 : card.color2}` : "1px solid white",
        margin: "1rem"
      })}
      onClick={() => onVoteHandler(vote)}>

      <Text sx={{ paddingInline: "1rem" }} >
        {name}
      </Text>

    </Button>
  )
}