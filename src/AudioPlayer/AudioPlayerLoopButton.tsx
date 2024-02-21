import {useAudioPlayer} from './AudioPlayerContext';
import {IconButton, Tooltip, useColorModeValue} from '@chakra-ui/react';
import {TfiLoop} from 'react-icons/tfi';

function AudioPlayerLoopButton() {

  const {loop, toggleLoop} = useAudioPlayer()

  return (
    <>
      <Tooltip
        color={useColorModeValue('#fcfcfc', '#000000')}
        label={'Loop'}
      >
        <IconButton
          isActive={loop}
          aria-label={'loop'}
          icon={<TfiLoop size={loop ? 20 : 18}/>}
          variant={'ghost'}
          onClick={toggleLoop}
        />
      </Tooltip>
    </>
  )
}


export default AudioPlayerLoopButton