import { IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5'
import { useAudioPlayer } from './AudioPlayerContext'
import { useState } from 'react'

function AudioPlayerMuteButton() {

  const {volume, setVolume} = useAudioPlayer()
  const [previousVolume, setPreviousVolume] = useState<number>(volume)

  return (
    <>
      <Tooltip
        color={useColorModeValue('#fcfcfc', '#000000')}
        label={volume === 0 ? 'Unmute' : 'Mute'}
      >
        <IconButton
          aria-label={'Play'}
          icon={volume === 0 ? <IoVolumeMute size={22}/> : <IoVolumeHigh size={22}/>}
          variant={'ghost'}
          onClick={() => {
            setPreviousVolume(volume)
            setVolume(volume === 0 ? previousVolume : 0)
          }}
        />
      </Tooltip>
    </>
  )


}

export default AudioPlayerMuteButton