import { all } from 'axios';
import { openDB, type IDBPDatabase } from 'idb';
import { musicProps, mylistProps } from '~/store/currentMylist';

const DB_NAME = 'MusicDB';
const MYLIST_STORE_NAME = 'MylistStore';
const MUSIC_STORE_NAME = 'MusicStore'
// instance of db
let dbPromise : Promise<IDBPDatabase<unknown>>;

export function useDatabase() {

    // create new instance if haven't created
    if(!dbPromise && import.meta.client){
        dbPromise = openDB(DB_NAME, 1, {
        upgrade(db) {
        if (!db.objectStoreNames.contains(MYLIST_STORE_NAME)) {
            db.createObjectStore(MYLIST_STORE_NAME, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(MUSIC_STORE_NAME)) {
            db.createObjectStore(MUSIC_STORE_NAME, { keyPath: 'id' });
        }
        },
    });
    }
  
  return dbPromise;
}

export async function addMylist(data: mylistProps){
    const id = crypto.randomUUID();
    await dbPromise.then(obj => obj.add(MYLIST_STORE_NAME, {...data, id: id}))
}
export async function getMylist(id: string){
    const db = await dbPromise;
    const data = await db.get(MYLIST_STORE_NAME, id);
    console.log(data);
    return data;
}

export async function getMylistAll() {
    const db = await dbPromise;
    const allData = await db.getAll(MYLIST_STORE_NAME);
    console.log(allData);
    return allData;
}

export async function getMusic(id:string) : Promise<musicProps[]> {
    const db = await dbPromise;
    const data = (await db.getAll(MUSIC_STORE_NAME)).filter(music => music.mylistId === id);
    console.log(data);
    return data;
}
export async function addMusic(data: musicProps){
    const id = crypto.randomUUID();
    // TODO: change to put and make access auth
    await dbPromise.then(obj => obj.add(MUSIC_STORE_NAME, {...data, id: id}))
}