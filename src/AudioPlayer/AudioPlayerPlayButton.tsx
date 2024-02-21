import {IconButton, Tooltip, useColorModeValue} from '@chakra-ui/react';
import {useAudioPlayer} from './AudioPlayerContext';
import {IoPauseOutline, IoPlayOutline} from 'react-icons/io5';

function AudioPlayerPlayButton() {

  const {isPlaying, togglePlay, src} = useAudioPlayer()

  return (
    <>
      <Tooltip
        color={useColorModeValue('#fcfcfc', '#000000')}
        label={isPlaying ? 'Pause' : 'Play'}
      >
        <IconButton
          aria-label={'Play'}
          icon={isPlaying ? <IoPauseOutline size={22}/> : <IoPlayOutline size={22}/>}
          variant={'ghost'}
          onClick={togglePlay}
          isDisabled={!src}
        />
      </Tooltip>
    </>
  )
}

export default AudioPlayerPlayButton