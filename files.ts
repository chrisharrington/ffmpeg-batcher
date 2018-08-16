import * as fs from 'fs';
import * as path from 'path';

import { Async } from './base';
import Config from './config';

export class FileManager extends Async {
    async find(dir: string, extensions: string[], recursive?: boolean) : Promise<string[]> {
        return new Promise<string[]>(resolve => {
            let files = this.findInDirectory(dir, extensions);
            resolve(files);
        });
    }

    private findInDirectory(dir: string, extensions: string[]) : string[] {
        let result: string[] = [];

        let files = this.getFiles(dir);
        files.forEach(file => {
            let local = `${dir}\\${file}`;
            let isDirectory = this.isDirectory(local);
            if (isDirectory) {
                let localFiles = this.findInDirectory(local, extensions);
                result = result.concat(localFiles);
            } else if (extensions.indexOf(path.extname(file).substring(1)) > -1)
                result.push(local);
        });
        return result;
    }

    private getFiles(dir: string) : string[] {
        let files = fs.readdirSync(dir);
        return files;
    }

    private isDirectory(dir: string) : boolean {
        let stats = fs.lstatSync(dir);
        return stats.isDirectory();
    }
}