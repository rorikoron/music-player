import { all } from 'axios';
import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'MusicDB';
const STORE_NAME = 'MusicStore';

// instance of db
let dbPromise : Promise<IDBPDatabase<unknown>>;

export function useDatabase() {

    // create new instance if haven't created
    if(!dbPromise && import.meta.client){
        dbPromise = openDB(DB_NAME, 1, {
        upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
        },
    });
    }
  
  return dbPromise;
}


export async function addDataBase(data: any){
    const id = crypto.randomUUID();
    await dbPromise.then(obj => obj.add(STORE_NAME, {...data, id: id}))
}
export async function getDataBase(id: string){
    const db = await dbPromise;
    const data = await db.get(STORE_NAME, id);
    console.log(data);
    return data;
}

export async function getDataBaseAll() {
    const db = await dbPromise;
    const allData = await db.getAll(STORE_NAME);
    console.log(allData);
    return allData;
}