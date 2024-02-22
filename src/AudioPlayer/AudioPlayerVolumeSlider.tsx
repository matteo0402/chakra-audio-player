import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { useAudioPlayer } from './AudioPlayerContext';

function AudioPlayerVolumeSlider() {

  const {volume, setVolume} = useAudioPlayer()

  return (
    <Slider aria-label='volume-slider' defaultValue={volume} value={volume} onChange={setVolume} max={1} min={0} step={0.01}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        color={useColorModeValue('#fcfcfc', '#000000')}
        label={'Volume'}
      >
        <SliderThumb boxSize={6}>
          <Box color="blue.500" fontSize={12}>
            {Math.round(volume * 100)}
          </Box>
        </SliderThumb>
      </Tooltip>
    </Slider>
  )

}

export default AudioPlayerVolumeSlider