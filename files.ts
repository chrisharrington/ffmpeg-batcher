import * as fs from 'fs';

import Config from './config';

class Files {
    find(path: string, extensions: string[], recursive?: boolean) : string[] {
        return [];
    }

    async getProcessed() : Promise<string[]> {
        let resolve, reject;

        const location = Config.processedFileLocation;
        fs.exists(location, (exists: boolean) => {
            if (!exists)
                resolve([]);
            else
                fs.readFile(location, 'utf8', (error, data: string) => {
                    if (error)
                        reject(error);
                    else
                        resolve(JSON.parse(data));
                });
        });
        Config.processedFileLocation;
        
        return new Promise<string[]>((r, e) => {
            resolve = r;
            reject = e;
        });
    }

    private findInDirectory(path: string, extensions: string[]) : string[] {
        return [];
    }
}

export default new Files();