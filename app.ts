import 'module-alias/register';

import Args from './args';
import { FileManager } from './files';
import Config from './config';
import { ProcessedManager } from './processed';

let manager = new FileManager();
manager.find(Args.path, Args.extensions, Args.recursive).then(files => {
    console.log(files);
});

// let manager = new ProcessedManager();
// manager.get().then(names => {
//     console.log(names);
// });

// read completed files
// find all files (recursively with option) in specified folder
// foreach file in files not already completed
//   try
//     process file
//   catch
//     graceful clean up

