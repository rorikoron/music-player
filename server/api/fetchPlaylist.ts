import { defineEventHandler } from 'h3'
import axios from 'axios';
import { apikeys } from 'googleapis/build/src/apis/apikeys';

export default defineEventHandler(async( event : any) =>{
    
    const query = getQuery(event);
    const driveId = <string>query.id;

    const apiKey = useRuntimeConfig().public.googleAPI;

    // get wav file from public folder
    try{
        const driveData = await axios.get(`https://www.googleapis.com/drive/v3/files`,{
            params:{
                key: apiKey,
                q: `'${driveId}' in parents and trashed = false`,
                fields: 'files(id, name, mimeType)'

            }
        })
        const fileData = driveData.data.files
            .filter(( file : any )=> file.mimeType === 'audio/wav')
            .map((file : any) => ({
                url: `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
                name: file.name,
        }));

        const wavFiles = await Promise.all(fileData.map(async (file : any) => {
            const blob = await axios.get(file.url, {
                responseType: 'blob',
                params: {
                    key: apiKey,
                }
             });
            return({
                blob: blob.data,
                name: file.name
            })
        }))
        console.log(wavFiles)
        return wavFiles;
    }catch(error : any){
        console.error(error)
        console.log("failed to read google drive");
    }
})