import * as fs from 'fs';

import Config from './config';

export class ProcessedManager {
    processed: Processed[];

    async get() : Promise<Processed[]> {
        let resolve, reject, promise = new Promise<Processed[]>((r, e) => { resolve = r; reject = e; });

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

        return promise;
    }

    async save() : Promise<void> {
        let resolve, reject, promise = new Promise<void>((r, e) => { resolve = r; reject = e; });

        fs.writeFile(Config.processedFileLocation, JSON.stringify(this.processed), (error) => {
            if (error)
                reject(error);
            else
                resolve();
        });

        return promise;
    }
}

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