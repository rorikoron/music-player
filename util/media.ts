export const eventToBlob = async (event: Event): Promise<Blob | undefined> => {
    return new Promise((resolve, reject) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
        const file = target.files[0];
        
        // FileReaderを使ってBlobに変換
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        
        reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: file.type });
            resolve(blob)  // formProps.coverにBlobを格納
        };
    
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            reject(error)
        };
        }else{
            resolve(undefined);
        }
    })
};
export const eventToFileName = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        return file.name;
    }
    return ''
}
export const getAudioDuration = async (blob: Blob): Promise<number> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        const url = URL.createObjectURL(blob);
        
        audio.src = url;
        audio.onloadedmetadata = () => {
            const duration = audio.duration; // 再生時間を秒で取得
            URL.revokeObjectURL(url); // メモリ解放のためURLを解放
            resolve(duration);
        };

        audio.onerror = (error) => {
            URL.revokeObjectURL(url);
            reject(error); // エラー処理
        };
    })
}
