'use client'
import pb from '../(pb_functions)'
import { useEffect, useState } from 'react';
import { logout } from 'app/(pb_functions)';
import { useRouter } from 'next/navigation';
import { Tooltip, UnstyledButton, createStyles } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faQuestion, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'interfaces/interfaces';
import Mobile from './(mobile)';
import Desktop from './(desktop)';

const useStyles = createStyles((theme) => ({
  link: {
    width: 30,
    height: 30,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

export default function NavBar() {
  const { classes, cx } = useStyles()
  const [windowWidth, setWindowWidth] = useState<boolean>(false)

  const placeholder = `${process.env.NEXT_PUBLIC_DBURL}/api/files/assets/ocmfvobwbq7xu1u/frame_2_qAqNR4gVxy.png`
  const [avatar, setAvatar] = useState<string>(placeholder)
  const router = useRouter()

  useEffect(() => {
    setWindowWidth(window.innerWidth < 980 ? true : false)
    window.addEventListener("resize", (e: UIEvent) => {
      const win = e.target as Window
      if (!win) return
      setWindowWidth(win.innerWidth < 980 ? true : false)
    })
  }, [])

  function getAvatarImage() {
    if (!pb.authStore.model || !pb.authStore.model.image) return
    setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.image}`)
  }

  useEffect(() => {
    getAvatarImage()
  }, [])

  pb.authStore.onChange(() => {
    getAvatarImage()
  })


  const options: MenuItem[] = [
    {
      title: "Home",
      icon: faHome,
      function: () => router.push(`/`)
    },
    {
      title: "Questions",
      icon: faQuestion,
      function: () => router.push(`/myquestions/${pb.authStore.model ? pb.authStore.model.id : undefined}`)
    },
    {
      title: "Create new question",
      icon: faPlus,
      function: () => router.push("/myquestions/newquestion"),
    },
    {
      title: "Logout",
      icon: faRightFromBracket,
      function: () => {
        logout()
        window.location.reload()
        router.push("/")
      }
    }
  ]

  const lastOption: MenuItem[] = [
    {
      title: "Home",
      icon: faHome,
      function: () => router.push(`/`)
    },
    {
      title: "Signup",
      icon: faRightToBracket,
      function: () => router.push("/Signin"),
    }
  ]


  function MenuList({ props }: { props: MenuItem }) {
    return (
      <Tooltip label={props.title} position="right" transitionDuration={0} >

        <UnstyledButton id={`link-${props.title.replace(/ /g, '')}`} onClick={props.function} className={cx(classes.link, { [classes.active]: true })}>
          <FontAwesomeIcon color="white" icon={props.icon} />
        </UnstyledButton>

      </Tooltip>
    )

  }

  const links: JSX.Element[] = pb.authStore.isValid ? options.map((option, index) => (
    <MenuList props={option} key={index} />
  )) : lastOption.map((option, index) => (
    <MenuList props={option} key={index} />
  ))

  return (
    <>
      {
        windowWidth ?
          <Mobile props={{ avatar, links }} />
          :
          <Desktop props={{ avatar, links }} />
      }
    </>
  )
}
