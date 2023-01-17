import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';

interface MenuItem {
  title: string
  icon: React.ReactNode
  function?: () => any
}

export default function Menu({ close, user }: { close: any, user: string }) {
  const route = useRouter()

  const links: MenuItem[] = [
    {
      title: "Questions",
      icon: <FontAwesomeIcon icon={faQuestion} />,
      function: () => route.push(`/myquestions/${user}`)
    },
    {
      title: "Create new question",
      icon: <FontAwesomeIcon icon={faPlus} />,
      function: () => route.push("/myquestions/newquestion"),
    }

  ]

  return (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
    >
      {
        links.map((link, key) => {
          return (
            <List key={key}>
              <ListItem
                key={key}
                onClick={() => {
                  if (!link.function) return
                  close(false)
                  link.function()
                }}
              >
                {link.icon}
                <ListItemText style={{ margin: "0 1rem" }} primary={link.title} />
              </ListItem>
            </List>
          )
        })
      }
    </Box>
  )
}
