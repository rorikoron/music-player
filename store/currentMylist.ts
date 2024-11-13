enum MylistType{
  AppCreated,
  LoadDrive
}
export interface mylistProps{
  status?: MylistType,
  id? : string,
  cover?: Blob,
  title?: string,
  description?: string,
  author?: string
}
export interface musicProps{
  title: string,
  blob: Blob,
  lastUpdate: String,
  audioLength: number,
  mylistId: string,
}
const MYLIST_PROPS : mylistProps = {
  status: undefined,
  id: undefined,
  cover: undefined,
  title: undefined,
  description: undefined,
  author: undefined,
}
export const { state, getter, mutation, ...store } = createStore('currentMusic', MYLIST_PROPS)

export const setCurrentMusic = mutation('setCurrentMusic', (state : mylistProps, newState : mylistProps) => {
  Object.assign(state, newState);
})
