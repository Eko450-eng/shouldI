'use client'
import { Modal, Fade } from '@mui/material'
import { useState } from 'react'
import { IQuestion } from '../../../interfaces/interfaces'
interface InterfaceProps {
  i: IQuestion
  image1: string
  image2: string
}

interface selectionImage {
  open: boolean
  selection: any
}

export default function ImageComponent({ props }: { props: InterfaceProps }) {
  // set if and which image should be opened fullscreen
  const [open, setOpen] = useState<selectionImage>({
    open: false,
    selection: null
  })

  function openImage(image: any) { setOpen({ selection: image, open: true }) }
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
          <img style={{ maxHeight: "90%", maxWidth: "90%" }} className="fullscreen-image" src={open.selection} />
        </Fade>
      </Modal>

      {/* could be done way nicer probably... but ain't nobody got time for that */}
      {
        props.i.image1 && props.i.image2 ?
          <div className="question-card-image-wrapper">
            <img onClick={() => openImage(props.image1)} className="double-image" src={props.image1} />
            <img onClick={() => openImage(props.image2)} className="double-image" src={props.image2} />
          </div>
          : props.i.image1 ?
            <div className="question-card-image-wrapper">
              <img onClick={() => openImage(props.image1)} className="single-image" src={props.image1} />
            </div>
            : props.i.image2 ?
              <div className="question-card-image-wrapper">
                <img onClick={() => openImage(props.image2)} className="single-image" src={props.image2} />
              </div>
              : null
      }
    </>
  )
}

