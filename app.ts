import 'module-alias/register';

import Args from './args';
import { FileManager } from './files';
import { ProcessedManager, Processed } from './processed';
import { Converter, Presets } from './converter';
import { Watcher } from './watcher';

let fileManager = new FileManager(),
    processedManager = new ProcessedManager(),
    converter = new Converter(),
    watcher = new Watcher();

processedManager.get().then(() => {
    return fileManager.find(Args.path, Args.extensions, Args.recursive);
}).then(files => {
    console.log(`App: Found ${files.length} files.`);
    files.forEach(file => {
        processedManager.add(new Processed(file, false));
    });
}).then(() => {
    return processedManager.save();
}).then(async () => {
    let unprocessed = processedManager.getFirstUnprocessed();
    while (unprocessed) {
        await converter.convert(unprocessed.path, Presets.chromecast);
        unprocessed.isProcessed = true;
        processedManager.save();
        
        unprocessed = processedManager.getFirstUnprocessed();
    }

    console.log('No files to process.');
}).catch(e => {
    console.error(e);
});