import {
  IconButton,
  Td,
  Tooltip,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
import { Audio } from '../../types/audio'
import { useAudioPlayer } from '../AudioPlayer/AudioPlayerContext'
import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5'
import { useState } from 'react'

interface QueueItemProps {
  audio: Audio
}

function QueueItem({audio}: QueueItemProps) {
  const {isPlaying, togglePlay, setSrc, src} = useAudioPlayer()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Tr
      _hover={{backgroundColor: 'gray.200'}}
    >
      <Td>
        <Tooltip
          color={useColorModeValue('#fcfcfc', '#000000')}
          label={isPlaying && src === audio.src ? 'Pause' : 'Play'}
        >
          <IconButton
            aria-label={'Play'}
            icon={isPlaying && src === audio.src ?
              <IoPauseOutline size={22}/> : <IoPlayOutline size={22}/>}
            variant={'ghost'}
            size={'sm'}
            onClick={async (e) => {
              e.stopPropagation()
              if (src !== audio.src) {
                setIsLoading(true)
                // fake async function - e.g. get audio from api
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(false)
                setSrc(audio.src)
              }
              togglePlay()
            }}
            isLoading={isLoading}
          />
        </Tooltip>
      </Td>
      <Td>{audio.title}</Td>
      <Td>{audio.artist}</Td>
    </Tr>
  );
}

export default QueueItem