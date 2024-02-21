import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react';
import {useAudioPlayer} from './AudioPlayerContext';
import { useEffect } from 'react'

function AudioPlayerProgress() {

  const {currentTime, setCurrentTime, duration} = useAudioPlayer()

  return (
    <Slider
      aria-label="progress-slider"
      defaultValue={currentTime}
      value={currentTime}
      onChange={setCurrentTime}
      max={duration === 0 ? 100 : duration}
      min={0}
      step={0.01}
      w={'500%'}
    >
      <SliderTrack>
        <SliderFilledTrack/>
      </SliderTrack>
      <SliderThumb/>
    </Slider>
  )
}

export default AudioPlayerProgress