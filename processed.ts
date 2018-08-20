import * as fs from 'fs';

import Config from './config';
import { Async } from './base';

export class ProcessedManager extends Async {
    private processed: {} = {};

    async get() : Promise<{}> {
        console.log(`ProcessedManager.get`);
        let p = this.promise<{}>();

        const location = Config.processedFileLocation;
        fs.exists(location, (exists: boolean) => {
            if (!exists)
                p.resolve([]);
            else
                fs.readFile(location, 'utf8', (error, data: string) => {
                    if (error)
                        p.reject(error);
                    else {
                        this.processed = JSON.parse(data);
                        p.resolve(this.processed);
                    }
                });
        });

        return p.promise;
    }

    add(processed: Processed) {
        if (!this.processed[processed.path]) 
            this.processed[processed.path] = processed;
    }

    getFirstUnprocessed() : Processed | null {
        let key = Object.keys(this.processed).find(key => !this.processed[key].isProcessed);
        return key ? this.processed[key] : null;
    }

    async save() : Promise<void> {
        let p = this.promise<void>();

        fs.writeFile(Config.processedFileLocation, JSON.stringify(this.processed), (error) => {
            if (error)
                p.reject(error);
            else
                p.resolve(null);
        });

        return p.promise;
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

    equals(processed: Processed) {
        return processed.path === this.path;
    }

    toString() {
        return `${this.path} / ${this.isProcessed}`;
    }
}