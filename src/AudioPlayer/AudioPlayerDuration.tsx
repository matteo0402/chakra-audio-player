import {useAudioPlayer} from './AudioPlayerContext';
import {Text} from '@chakra-ui/react';
import { format } from 'date-fns';

function AudioPlayerDuration() {

  const {currentTime, duration} = useAudioPlayer()

  return (
    <Text w={'100%'}>
      {format((currentTime * 1000), 'mm:ss')} / {format((duration * 1000), 'mm:ss')}
    </Text>
  )
}

export default AudioPlayerDuration