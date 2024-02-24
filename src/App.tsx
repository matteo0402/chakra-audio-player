import React from 'react';
import { AbsoluteCenter, Flex } from '@chakra-ui/react'
import AudioPlayer from './Components/AudioPlayer/AudioPlayer'
import Queue from './Components/Queue/Queue'
import {
  AudioPlayerProvider
} from './Components/AudioPlayer/AudioPlayerContext'

function App() {

  return (
    <Flex h={'100vh'} w={'100vw'}>
      <AudioPlayerProvider>
        <AbsoluteCenter w={'800px'}>
          <Queue/>
        </AbsoluteCenter>
        <AudioPlayer position={'fixed'} left={0} bottom={0}/>
      </AudioPlayerProvider>
    </Flex>
  );
}

export default App;
