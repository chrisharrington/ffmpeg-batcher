import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';

import { Async, IPromise } from './base';

export class Converter extends Async {
    suffix: string = '-temp';

    async convert(path: string, preset: Function) : Promise<void> {
        let p = this.promise<void>();

        let newPath = `${path}${this.suffix}`;
        ffmpeg(path)
            .preset(preset)
            .on('error', e => p.reject(e))
            .on('progress', data => console.log(data.percent))
            .on('end', () => this.moveFiles(newPath, p))
            .save(newPath);

        return p.promise;
    }

    private moveFiles(path: string, p: IPromise<void>) {
        try {
            fs.unlinkSync(path);
            fs.renameSync(path, path.substring(0, path.length - this.suffix.length));
            p.resolve(null);
        } catch (e) {
            p.reject(e);
        }
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