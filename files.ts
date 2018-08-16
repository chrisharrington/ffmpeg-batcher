import * as fs from 'fs';
import * as path from 'path';

import { Async } from './base';
import Config from './config';
import { rejects } from 'assert';

export class FileManager extends Async {
    async find(dir: string, extensions: string[], recursive?: boolean) : Promise<string[]> {
        return await this.findInDirectory(dir, extensions);
    }

    private async findInDirectory(dir: string, extensions: string[]) : Promise<string[]> {
        let p = this.promise<string[]>();

        let result: string[] = [];

        let files = await this.getFiles(dir, extensions);
        files.forEach(async file => {
            let local = `${dir}\\${file}`;
            let isDirectory = await this.isDirectory(local);
            if (isDirectory) {
                let localFiles = await this.findInDirectory(local, extensions);
                result.concat(localFiles);
            } else if (extensions.indexOf(path.extname(file).substring(1)) > -1)
                result.push(local);
        });

        p.resolve(result);

        return p.promise;
    }

    private getFiles(dir: string, extensions: string[]) : Promise<string[]> {
        let p = this.promise<string[]>();

        fs.readdir(dir, (error, files: string[]) =>{
            if (error) return p.reject(error);
            p.resolve(files);
        });

        return p.promise;
    }

    private async isDirectory(dir) : Promise<boolean> {
        let p = this.promise<boolean>();

        fs.lstat(dir, (error, stat: fs.Stats) => {
            if (error) return p.reject(error);

            let blah = stat.isDirectory();
            return stat.isDirectory();
        })

        return p.promise;
    }
}