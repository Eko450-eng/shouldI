import { Button, Progress, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import answer from "app/(cards)/(logic)";
import pb from "app/(pb_functions)";
import { IFirstAnswer, IQuestion, ISecondAnswer, IUser, IVoteButton } from "interfaces/interfaces";
import { useEffect, useState } from "react";

export default function VoteButton({ props }: { props: IVoteButton }) {
  const { name, votes, vote, card, voteValue, currentState } = props
  const [percentage, setPercentage] = useState<{ 1: number, 2: number }>({ 1: 0, 2: 0 })
  const highlight: boolean = vote == voteValue

  const getPercentageVoted = async () => {
    const question: IQuestion = await pb.collection("questions").getOne(card.id, { $autoCancel: false })
    setPercentage({
      1: question.answerOne / (question.answerOne + question.answerTwo) * 100,
      2: question.answerTwo / (question.answerOne + question.answerTwo) * 100,
    })
  }


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

  useEffect(() => {
    getPercentageVoted()
  }, [props])

  return (
    <Button
      sx={(theme) => ({
        background: highlight ? theme.colors.nord_green[4] : theme.colors.nord_gray[6],
        color: highlight ? theme.colors.dark : theme.white,
        border: highlight ? "1px solid white" : "none",
        padding: 0
      })}
      onClick={() => onVoteHandler(vote)}>

      <Text sx={{ paddingInline: "1rem" }} >
        <Progress
          size="xl"
          value={vote == 1 ? percentage[1] : percentage[2]}
          label={votes.toString()}
          color="red"
        />
        {name}
      </Text>

    </Button>
  )
}
