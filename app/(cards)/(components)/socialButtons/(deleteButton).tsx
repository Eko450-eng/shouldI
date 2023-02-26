'use client'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon } from "@mantine/core";
import pb from "app/(pb_functions)";
import { IQuestion } from "interfaces/interfaces";
import { useEffect, useState } from "react";

export default function DeleteButton({ question }: { question: IQuestion }) {
  const [permission, setPermission] = useState<boolean>(false)
  // Check if the user has permission to delete
  useEffect(() => {
    if (pb.authStore.isValid && (question.owner == pb.authStore.model!.id || pb.authStore.model!.role > 9)) setPermission(true)
  }, [pb.authStore.model])

  return (
    <>
      {
        permission &&
        <ActionIcon
          className="btn-icon"
          onClick={() => pb.collection("questions").delete(question.id)}
        >
          <FontAwesomeIcon color="#e03131" icon={faTrash} />
        </ActionIcon>
      }
    </>
  )
}
