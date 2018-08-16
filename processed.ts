import * as fs from 'fs';

import Config from './config';

class ProcessedManager {
    processed: Processed[];

    async get() : Promise<Processed[]> {
        let resolve, reject;

        const location = Config.processedFileLocation;
        fs.exists(location, (exists: boolean) => {
            if (!exists)
                resolve([]);
            else
                fs.readFile(location, 'utf8', (error, data: string) => {
                    if (error)
                        reject(error);
                    else {
                        let json = JSON.parse(data);
                        this.processed = json.map(d => Processed.fromRaw(d));
                        resolve(this.processed);
                    }
                });
        });

        return new Promise<Processed[]>((r, e) => {
            resolve = r;
            reject = e;
        });
    }

    async save() : Promise<void> {
        let resolve, reject;

        let raw = this.processed.map(p => JSON.stringify(p));
        fs.writeFile(Config.processedFileLocation, raw, (error) => {
            if (error)
                reject(error);
            else
                resolve();
        });

        return new Promise<void>((r, e) => {
            resolve = r;
            reject = e;
        });
    }
}

let manager = new ProcessedManager();
export { manager as ProcessedManager };

export class Processed {
    path: string;
    isProcessed: boolean;

    constructor(path: string, isProcessed: boolean) {
        this.path = path;
        this.isProcessed = isProcessed;
    }

    static fromRaw(data: any) : Processed {
        return new Processed(data.path, data.isProcessed);
    }
}