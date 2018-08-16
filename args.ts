import * as minimist from 'minimist';

class Args {
    path: string;
    recursive: boolean;
    extensions: string[];

    constructor() {
        let args = minimist(process.argv.slice(2));
        this.path = args._[0];
        this.recursive = !!args.recursive;
        this.extensions = args.extensions ? args.extensions.split(',') : [];

        if (!this.path)
            throw new Error('No path specified.');
    }
}

export default new Args();