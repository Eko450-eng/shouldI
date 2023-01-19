'use client'
import { Modal, Fade } from '@mui/material'
import { useState } from 'react'
import { IQuestion } from '../../../interfaces/interfaces'
import Image from 'next/image'

interface InterfaceProps {
  question: IQuestion
  image1: string
  image2: string
}

interface selectionImage {
  open: boolean
  selectedImage: string | undefined
}

export default function ImageComponent({ props }: { props: InterfaceProps }) {
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
        open={open.open}
        onClose={closeImage}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open.open} timeout={500}>
          <Image
            alt="Fullscreen image for preview"
            width={500}
            height={500}
            style={{ maxHeight: "90%", maxWidth: "90%" }} className="fullscreen-image"
            src={open.selectedImage!} />
        </Fade>
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

