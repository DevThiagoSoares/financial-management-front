import React from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

import { actions, container, titleStyle } from './styles'
import { useModal } from '../../shared/hooks/useModal'

interface ToolbarContainerProps {
  title: string
  captionButton: string
}

export function ToolbarContainer({
  title,
  captionButton,
}: ToolbarContainerProps) {
  const { openModal } = useModal()

  const handleOpenModal = () => {
    openModal()
  }

  return (
    <Box sx={container}>
      <Typography style={titleStyle}>{title}</Typography>
      <Box sx={actions}>
        <Button variant="contained" onClick={handleOpenModal}>
          {captionButton}
        </Button>
      </Box>
    </Box>
  )
}
