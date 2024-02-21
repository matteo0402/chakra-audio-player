import { Box, BoxProps, Flex } from '@chakra-ui/react';
import AudioPlayerPlayButton from './AudioPlayerPlayButton';
import AudioPlayerProgress from './AudioPlayerProgress';
import AudioPlayerVolumeSlider from './AudioPlayerVolumeSlider';
import AudioPlayerDuration from './AudioPlayerDuration';
import AudioPlayerLoopButton from './AudioPlayerLoopButton';
import AudioPlayerMuteButton from './AudioPlayerMuteButton'

function AudioPlayer({...props}: BoxProps) {

  return (
    <Box border={'1px'} borderColor={'inherit'} borderRadius={'md'} w={'100%'} {...props}>
      <Flex alignItems={'center'} gap={4}>
        <AudioPlayerPlayButton/>
        <AudioPlayerProgress/>
        <AudioPlayerMuteButton/>
        <AudioPlayerVolumeSlider/>
        <AudioPlayerDuration/>
        <AudioPlayerLoopButton/>
      </Flex>
    </Box>
  )


}

export default AudioPlayer