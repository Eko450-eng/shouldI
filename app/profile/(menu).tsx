import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestion, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import { logout } from 'app/(pb_functions)';

interface MenuItem {
  title: string
  icon: React.ReactNode
  function?: () => void
}

export default function Menu({ close, user }: { close: (t: boolean) => void, user?: string | undefined }) {
  const route = useRouter()

  const userLinks: MenuItem[] = [
    {
      title: "Questions",
      icon: <FontAwesomeIcon icon={faQuestion} />,
      function: () => route.push(`/myquestions/${user}`)
    },
    {
      title: "Create new question",
      icon: <FontAwesomeIcon icon={faPlus} />,
      function: () => route.push("/myquestions/newquestion"),
    },
    {
      title: "Logout",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      function: () => {
        logout()
        window.location.reload()
        route.push("/")
      }
    }
  ]

  const guestLinks: MenuItem[] = [
    {
      title: "Signup",
      icon: <FontAwesomeIcon icon={faRightToBracket} />,
      function: () => route.push("/Signin"),
    }
  ]

  function listView(link: MenuItem, key: number) {
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
  }

  return (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
    >
      {user ?
        userLinks.map((link, key) => listView(link, key))
        : guestLinks.map((link, key) => listView(link, key))
      }
    </Box>
  )
}
