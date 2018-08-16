import 'module-alias/register';

import Args from './args';
import { FileManager } from './files';
import Config from './config';
import { ProcessedManager, Processed } from './processed';
import { Converter, Presets } from './converter';

let converter = new Converter();
converter.convert('c:\\temp\\test.mkv', Presets.chromecast).then(() => {
    console.log('Done.');
}).catch(e => {
    console.error(e);
});


// let fileManager = new FileManager(),
//     processedManager = new ProcessedManager();

// fileManager.find(Args.path, Args.extensions, Args.recursive).then(files => {
//     files.forEach(file => {
//         processedManager.add(new Processed(file, false));
//     });
// }).then(() => {
//     return processedManager.save();
// }).then(() => {
//     let unprocessed = processedManager.getFirstUnprocessed();
//     console.log(unprocessed);
//     // while (unprocessed) {
//     //     // convert file
        
//     //     unprocessed = processedManager.getFirstUnprocessed();
//     // }

//     console.log('No files to process.');
// }).catch(e => {
//     console.error(e);
// });