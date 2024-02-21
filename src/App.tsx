import React from 'react';
import { AbsoluteCenter, Flex } from '@chakra-ui/react'
import AudioPlayer from './AudioPlayer/AudioPlayer'
import Queue from './Queue/Queue'
import { AudioPlayerProvider } from './AudioPlayer/AudioPlayerContext'

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
