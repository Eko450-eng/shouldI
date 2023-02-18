'use client'
import pb from '../../(pb_functions)'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import AvatarIcon from './(avatar)'
import Link from 'next/link';
import { logout } from 'app/(pb_functions)';
import { useRouter } from 'next/navigation';
import { Drawer, Group, ActionIcon, MantineProvider } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlus, faQuestion, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { IDrawer, MenuItem } from 'interfaces/interfaces';
import { Button } from '@mui/material';

export default function ActionBar() {
  const [drawer, setOpenDrawer] = useState<IDrawer>({
    open: false,
    position: "right",
    size: false,
  })

  const [windowWidth, setWindowWidth] = useState<boolean>(false)

  const placeholder = `${process.env.NEXT_PUBLIC_DBURL}/api/files/assets/ocmfvobwbq7xu1u/frame_2_qAqNR4gVxy.png`
  const [avatar, setAvatar] = useState<string>(placeholder)
  const router = useRouter()

  window.addEventListener("resize", (e: any) => {
    if (!e.target) return
    setWindowWidth(e.target.innerWidth < 980 ? true : false)
  })

  useEffect(() => {
    if (!pb.authStore.model || !pb.authStore.model.image) return
    setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.image}`)
  }, [])

  function openDrawer(value: boolean) { setOpenDrawer({ ...drawer, open: value }) }

  const options: MenuItem[] = [
    {
      title: "Questions",
      icon: <FontAwesomeIcon icon={faQuestion} />,
      function: () => router.push(`/myquestions/${pb.authStore.model ? pb.authStore.model.id : undefined}`)
    },
    {
      title: "Create new question",
      icon: <FontAwesomeIcon icon={faPlus} />,
      function: () => router.push("/myquestions/newquestion"),
    },
    {
      title: "Logout",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
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
      icon: <FontAwesomeIcon icon={faRightToBracket} />,
      function: () => router.push("/Signin"),
    }
  ]

  function MenuListItems({ props }: { props: any }) {
    const { link } = props
    return (
      <li
        className="menu-items menu-items-link"
        onClick={() => link.function!()}>
        <div className="menu-items-description">
          <div>
            {link.icon}
          </div>
          {drawer.size ? "" : link.title}
        </div>
      </li>
    )
  }

  function MenuList() {
    return (
      <div className="drawer">
        <div className="">
          {
            pb.authStore.isValid ?
              options.map((link, key) => {
                return (
                  <MenuListItems key={key} props={{ link }} />
                )
              })
              :
              lastOption.map((link, key) => {
                return (
                  <MenuListItems key={key} props={{ link }} />
                )
              })
          }
        </div>
        <ActionIcon
          className="caret"
          onClick={() => setOpenDrawer({ ...drawer, size: !drawer.size })}>
          <FontAwesomeIcon icon={drawer.size ? faAngleRight : faAngleLeft} />
        </ActionIcon>
      </div>
    )

  }

  return (
    <div className="action-bar">
      <MantineProvider theme={{
        colorScheme: "dark"
      }} withNormalizeCSS withGlobalStyles>
        <div className="drawer-profile">
          {
            windowWidth &&
            <>
              <Link className="link-btn" href="/">
                <h2 className="title">Should I?</h2>
              </Link>
              <AvatarIcon openDrawer={(t: boolean) => openDrawer(t)} />
            </>
          }
        </div>

        {
          windowWidth ?
            <Drawer
              className="menu"
              opened={drawer.open}
              onClose={() => setOpenDrawer({ ...drawer, open: false })}
              title={
                <Image
                  alt={`Avatar Image of the user`}
                  className="profile-icon"
                  src={avatar}
                  width="40"
                  height="40"
                />
              }
              position="right"
              size={drawer.size ? "l" : "xs"}
            >

              <Group position="center">
                <MenuList />
              </Group>
            </Drawer>
            :
            <div className="menu-desktop">
              {drawer.size ?
                <AvatarIcon openDrawer={(t: boolean) => router.push("/")} /> :
                <Link className="link-btn" href="/">
                  <h2 className="title">Should I?</h2>
                </Link>
              }
              <MenuList />
            </div>
        }
      </MantineProvider>
    </div >
  )
}
