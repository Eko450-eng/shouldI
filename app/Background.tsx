'use client'
import { isMobile } from 'react-device-detect';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useMouse from '@react-hook/mouse-position'

export default function Background() {
  const bodyRef = useRef<any>(null)
  const animationRef = useRef<any>(null)

  const [divWidth, setDivWidth] = useState<any>(null)
  const [divHeight, setDivHeight] = useState<any>(null)
  const mouse = useMouse(bodyRef, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  useEffect(() => {
    bodyRef.current = document.body
    setDivWidth(bodyRef.current.offsetWidth)
    setDivHeight(bodyRef.current.offsetHeight)
  }, [])

  return (
    <>
      {
        isMobile ?
          <div
            ref={animationRef}
            id="cursorAnimation"
            style={{
              left: `${divWidth / 2}px`,
              top: `${divHeight / 2}px`,
            }}
            className="cursor-animation"
          ></div>
          :
          <div
            ref={animationRef}
            id="cursorAnimation"
            style={{
              left: `${mouse.clientX! - divWidth / 10}px`,
              top: `${mouse.clientY! - divHeight / 10}px`,
            }}
            className="cursor-animation"
          ></div>
      }
    </>
  )
}
