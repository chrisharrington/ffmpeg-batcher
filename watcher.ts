import * as fs from 'fs';

import { Processed, ProcessedManager } from './processed';
import { Async } from './base';

export class Watcher extends Async {
    watch(path: string, manager: ProcessedManager, recursive: boolean = true) {
        fs.watch(path, {  recursive }, (eventType, filename) => {
            if (eventType === 'rename') {
                console.log(`Watcher.watch: ${filename}`);
                manager.add(new Processed(filename, false));
            }
        });
    }
}