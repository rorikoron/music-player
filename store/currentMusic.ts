export interface musicProps{
  id? : string,
  cover?: Blob,
  title?: string,
  description?: string,
  author?: string
}

const MUSIC_PROPS : musicProps = {
  id: undefined,
  cover: undefined,
  title: undefined,
  description: undefined,
  author: undefined,
  
}

export const { state, getter, mutation, ...store } = createStore('currentMusic', MUSIC_PROPS)

export const setCurrentMusic = mutation('setCurrentMusic', (state : musicProps, newState : musicProps) => {
  Object.assign(state, newState);
})
