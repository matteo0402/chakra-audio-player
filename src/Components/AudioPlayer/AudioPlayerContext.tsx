import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { LocalStorage, useLocalStorage } from '../../hooks/useLocalStorage'
import { useHotkeys } from 'react-hotkeys-hook'

interface AudioPlayerContextProps {
  src: string | undefined,
  setSrc: (src: string | undefined) => void,
  isPlaying: boolean,
  isReady: boolean,
  isError: boolean,
  volume: number,
  loop: boolean,
  duration: number,
  currentTime: number,
  toggleLoop: () => void,
  setVolume: (vol: number) => void,
  setCurrentTime: (time: number) => void,
  togglePlay: () => void,
}

const AudioPlayerContext = createContext<AudioPlayerContextProps>({
  src: undefined,
  setSrc: () => {},
  isPlaying: false,
  isReady: false,
  isError: false,
  volume: 50,
  loop: false,
  duration: 0,
  currentTime: 0,
  toggleLoop: () => {},
  setVolume: () => {},
  setCurrentTime: () => {},
  togglePlay: () => {},
});

AudioPlayerContext.displayName = 'AudioPlayerContext';

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error("useManager must be used within a ManagerProvider");
  }

  return context;
};

interface AudioPlayerProviderProps {
  src?: string | undefined
  children: ReactNode
}

export const AudioPlayerProvider = forwardRef<HTMLAudioElement, AudioPlayerProviderProps>(
  ({ children, src }, _ref) => {
    const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
    const [isDefaultSource, setIsDefaultSource] = useState(false);

    const [volumeState, setVolumeState] = useLocalStorage<number>(LocalStorage.AUDIO_PLAYER_VOLUME, 0.5)
    const [previousVolume, setPreviousVolume] = useState<number>(volumeState)

    const [loop, setLoop] = useLocalStorage(LocalStorage.AUDIO_PLAYER_LOOP,false)
    const [isReady, setIsReady] = useState(false)
    const [isError, setIsError] = useState(false)
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleSetSrc = (src: string | undefined) => {
      setIsDefaultSource(false);
      setCurrentSrc(src);
    };

    const togglePlay = useCallback(async () => {
      const audio = audioRef.current;
      if (!audio) return;

      if ((audio.paused || audio.ended) && audio.src) {
        if (isReady) {
          const playPromise = audio.play();
          if (playPromise) {
            await playPromise;
          }
        } else {
          audio.load();
          await new Promise(resolve => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
          });
          const playPromise = audio.play();
          if (playPromise) {
            await playPromise;
          }
        }
      } else {
        audio.pause();
      }
    }, [isReady]);

    useEffect(() => {
      // don't play audio if it's default source
      if (isReady && !isDefaultSource) {
        togglePlay().then(() => (
          console.info('playing audio')
        ));
      }
    }, [isReady, isDefaultSource, currentSrc, setCurrentSrc]);

    const setVolume = (vol: number) => {
      if (vol >= 0 && vol <= 1) {
        setVolumeState(vol);
        const audio = audioRef.current;
        if (audio) {
          audio.volume = vol;
        }
      }
    };

    const setAudioCurrentTime = (time: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (time >= 0 && time <= duration) {
        audio.currentTime = time;
        setCurrentTime(time);
      }
    };

    const toggleLoop = () => {
      setLoop(!loop);
    };

    useHotkeys('space', () => togglePlay())

    useHotkeys('l', () => toggleLoop())

    useHotkeys('m', () => {
      setPreviousVolume(volumeState)
      setVolume(volumeState === 0 ? previousVolume : 0)
    })

    useHotkeys('up', () => {
      if (volumeState > 1-0.05) {
        setVolume(1)
      } else {
        setVolume(volumeState+0.05)
      }
    })

    useHotkeys('down', () => {
      if (volumeState < 0.05) {
        setVolume(0)
      } else {
        setVolume(volumeState-0.05)
      }
    })

    useHotkeys('right', () => {
      if (currentTime > duration-10) {
        setAudioCurrentTime(duration)
      } else {
        setAudioCurrentTime(currentTime+10)
      }
    })

    useHotkeys('left', () => {
      if (currentTime < 10) {
        setAudioCurrentTime(0)
      } else {
        setAudioCurrentTime(currentTime-10)
      }
    })

    return (
      <AudioPlayerContext.Provider
        value={{
          src: currentSrc,
          setSrc: handleSetSrc,
          isPlaying: isPlaying,
          isReady,
          isError,
          volume: volumeState,
          loop,
          duration,
          currentTime,
          toggleLoop,
          setVolume,
          setCurrentTime: setAudioCurrentTime,
          togglePlay,
        }}
      >
        <audio
          ref={audioRef}
          loop={loop}
          preload={'metadata'}
          onCanPlay={(e) => {
            e.currentTarget.volume = volumeState;
            if (!src) {
              setIsDefaultSource(false);
            } else {
              setIsDefaultSource(true);
            }
            setIsReady(true);
          }}
          onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          onEnded={(e) => {
            e.currentTarget.currentTime = 0
          }}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
          src={currentSrc}
        />
        {children}
      </AudioPlayerContext.Provider>
    );
  }
);