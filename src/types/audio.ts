export interface Audio {
  src: string
  title: string,
  artist: string
}

export const Songs: Audio[] = [
  {
    src: 'http://localhost:8888/6LACK%20-%20Nonchalant.mp3',
    title: 'Nonchalant',
    artist: '6lack'
  },
  {
    src: 'http://localhost:8888/Future%20-%20WE%20JUS%20WANNA%20GET%20HIGH.mp3',
    title: 'WE JUST WANNA GET HIGH',
    artist: 'Future'
  },
  {
    src: 'http://localhost:8888/Young%20Thug%20Sup%20Mate%20ft.%20Future%20Official%20Audio.mp3',
    title: 'Sup Mate',
    artist: 'Young Thug'
  }
]