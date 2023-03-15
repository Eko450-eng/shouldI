'use client'
import { useState } from 'react'
import { IImageProps, selectionImage } from '../../../interfaces/interfaces'
import Image from 'next/image'
import { Modal } from '@mantine/core'

export default function ImageComponent({ props }: { props: IImageProps }) {
  const { question, image1, image2 } = props
  const [open, setOpen] = useState<selectionImage>({
    open: false,
    selectedImage: undefined
  })

  function openImage(image: string | undefined) { setOpen({ selectedImage: image, open: true }) }
  function closeImage() { setOpen({ ...open, open: false }) }

  return (
    <>
      <Modal
        opened={open.open}
        onClose={closeImage}
        fullScreen
        closeOnClickOutside
        withCloseButton
        closeButtonLabel="CLOSE"
        centered
      >
        {/* <Fade in={open.open} timeout={500}> */}
        <Image
          onClick={closeImage}
          className="fullscreen-modal-image"
          alt="Fullscreen image for preview"
          fill
          style={{
            objectFit: "contain",
            zIndex: "-1"
          }}
          src={open.selectedImage!} />
        {/* </Fade> */}
      </Modal>

      {/* could be done way nicer probably... but ain't nobody got time for that */}
      {
        question.image1 && question.image2 ?
          <div className="question-card-image-wrapper">
            <Image
              alt="Image 1 of the question"
              width={100}
              height={100}
              onClick={() => openImage(image1)} className="double-image" src={image1} />
            <Image
              alt="Image 2 of the question"
              width={100}
              height={100}
              onClick={() => openImage(image2)} className="double-image" src={image2} />
          </div>
          : question.image1 ?
            <div className="question-card-image-wrapper">
              <Image
                alt="Image 1 of the question"
                width={100}
                height={100}
                onClick={() => openImage(image1)} className="single-image" src={image1} />
            </div>
            : question.image2 ?
              <div className="question-card-image-wrapper">
                <Image
                  alt="Image 2 of the question"
                  width={100}
                  height={100}
                  onClick={() => openImage(image2)}
                  className="single-image"
                  src={image2} />
              </div>
              : null
      }
    </>
  )
}

