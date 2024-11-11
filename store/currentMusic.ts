export interface musicProps{
  id? : string,
  jacket?: string,
  title?: string,
  description?: string,
  author?: string
}

const MUSIC_PROPS : musicProps = {
  id: undefined,
  jacket: "DummyLinkToJacket",
  title: "DummyTitle",
  description: "DummyDescription",
  author: "DummyAuthor"
  
}

export const { state, getter, mutation, ...store } = createStore('currentMusic', MUSIC_PROPS)

export const setCurrentMusic = mutation('setCurrentMusic', (state : musicProps, newState : musicProps) => {
  Object.assign(state, newState);
})
