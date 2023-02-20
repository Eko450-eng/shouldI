'use client'
import pb from '../../(pb_functions)'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useState } from 'react';
import { logout } from 'app/(pb_functions)';
import { useRouter } from 'next/navigation';
import { Group, Navbar, Center, Stack, Tooltip, UnstyledButton, createStyles, Affix, Paper } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestion, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { IDrawer, MenuItem } from 'interfaces/interfaces';
import Mobile from './(mobile)';
import Desktop from './(desktop)';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
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

export default function ActionBar() {
  const { classes, cx } = useStyles()
  const [windowWidth, setWindowWidth] = useState<boolean>(false)

  const placeholder = `${process.env.NEXT_PUBLIC_DBURL}/api/files/assets/ocmfvobwbq7xu1u/frame_2_qAqNR4gVxy.png`
  const [avatar, setAvatar] = useState<string>(placeholder)
  const router = useRouter()

  useEffect(() => {
    setWindowWidth(window.innerWidth < 980 ? true : false)
    window.addEventListener("resize", (e: any) => {
      if (!e.target) return
      setWindowWidth(e.target.innerWidth < 980 ? true : false)
    })
  }, [])

  useEffect(() => {
    if (!pb.authStore.model || !pb.authStore.model.image) return
    setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.image}`)
  }, [])


  const options: MenuItem[] = [
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
      title: "Signup",
      icon: faRightToBracket,
      function: () => router.push("/Signin"),
    }
  ]


  function MenuList({ props }: { props: MenuItem }) {
    return (
      <Tooltip label={props.title} position="right" transitionDuration={0} >

        <UnstyledButton onClick={props.function} className={cx(classes.link, { [classes.active]: true })}>
          <FontAwesomeIcon color="white" icon={props.icon} />
        </UnstyledButton>

      </Tooltip>
    )

  }

  const links = pb.authStore.isValid ? options.map((option, index) => (
    <MenuList props={option} key={index} />
  )) : lastOption.map((option, index) => (
    <MenuList props={option} key={index} />
  ))

  return (
    <div>
      {
        windowWidth ?
          <Mobile props={{ avatar, links }} />
          :
          <Desktop props={{ avatar, links }} />
      }
    </div >
  )
}
