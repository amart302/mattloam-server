import fs from "fs/promises";
import { join } from "path";
import { getDirname } from "./pathUtils.js";

export async function deleteFilesByName(files){
    try {
        const __dirname = getDirname(import.meta.url);
        
        if(files){
            await Promise.all(files.map(async item => {
                const filePath = "../../uploads";
                try {
                    await fs.unlink(join(__dirname, filePath, item));
                } catch (error) {
                    console.error(`Не удалось удалить файл`, error.message);
                }
            }));
        }
    } catch (error) {
        console.log(error.message);
    }
}