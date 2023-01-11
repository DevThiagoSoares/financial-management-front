import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider } from '@mui/material'
import Webcam from 'react-webcam'

interface PhotoModalProps {
  handleClose: () => void
  open: boolean
  changePhotoNewVisitant: (photo: string | null) => void
}

export default function PhotoModal({
  handleClose,
  open,
  changePhotoNewVisitant,
}: PhotoModalProps) {
  const [image, setImage] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)

  const handleCapture = (event: any) => {
    event.preventDefault()
    if (!image && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      setImage(imageSrc)
      changePhotoNewVisitant(imageSrc)
    } else {
      setImage(null)
    }
  }

  const handleClearCapture = () => {
    handleClose()
    setImage(null)
  }

  const isDisabled = !image

  return (
    <Dialog open={open} onClose={handleClearCapture} fullWidth maxWidth="md">
      <DialogTitle sx={{ textAlign: 'center' }}>Câmera</DialogTitle>
      <Divider />
      <DialogContent>
        {!image ? (
          <Webcam
            audio={false}
            style={{
              width: '100%',
            }}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'user',
            }}
            mirrored
          />
        ) : (
          <img src={image} />
        )}
      </DialogContent>
      <DialogActions
        sx={{
          padding: '0px 25px 25px 0px',
        }}
      >
        <Button onClick={handleCapture} variant="outlined">
          {image ? 'Tirar outra foto' : 'Capturar'}
        </Button>
        <Button
          onClick={handleClearCapture}
          variant="contained"
          disabled={isDisabled}
        >
          Usar foto
        </Button>
      </DialogActions>
    </Dialog>
  )
}
