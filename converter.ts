import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';

import { Async, IPromise } from './base';

export class Converter extends Async {
    suffix: string = '-temp';

    convert(path: string, preset: Function) : Promise<void> {
        console.log(`Converter.convert: ${path}`);
        let p = this.promise<void>();
        
        let newPath = `${path}${this.suffix}`;
        if (fs.existsSync(newPath))
            fs.unlinkSync(newPath);
        
        ffmpeg(path)
            .preset(preset)
            .on('error', e => p.reject(e))
            .on('progress', data => console.log(`Converter.convert: Progress ${data.percent}`))
            .on('end', () => {
                this.moveFiles(path, newPath);
                p.resolve(null);
            })
            .save(newPath);

        return p.promise;
    }

    private moveFiles(oldPath: string, newPath: string) {
        console.log(`Converter.moveFiles: ${oldPath}, ${newPath}`);
        fs.unlinkSync(oldPath);
        fs.renameSync(newPath, oldPath);
    }
}

export class Presets {
    static chromecast(ffmpeg) {
        ffmpeg
            .format('matroska')
            .videoBitrate('5000k')
            .videoCodec('libx264')
            .audioBitrate('256k')
            .audioChannels(2)
            .audioCodec('libmp3lame');
    }
}