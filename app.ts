import 'module-alias/register';

import Args from './args';
import Files from './files';
import Config from './config';

Files.find(Args.path, Args.extensions, Args.recursive);

// read completed files
// find all files (recursively with option) in specified folder
// foreach file in files not already completed
//   try
//     process file
//   catch
//     graceful clean up

