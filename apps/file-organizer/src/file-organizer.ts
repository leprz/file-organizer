import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {Directory} from "./common/directory";
import {FileOrganizer} from "./path-converter/file-organizer";
import {NodeFileSystem} from "./file-system/node-file-system";

yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')
    .example('$0 <command> -s ./source -d ./destination', 'Organize files')
    .command('move', 'Move files from source to destination', (yargs) => {
        return yargs.option('source', {
            alias: 's',
            type: 'string',
            description: 'Source directory'
        })
            .option('destination', {
                alias: 'd',
                type: 'string',
                description: 'Destination directory'
            })
            .demandOption(['source', 'destination']);
    }, (argv) => {
        move(argv.source, argv.destination).then();
    })
    .demandCommand()
    .argv;

async function move(source: string, destination: string) {
    const fileOrganizer = new FileOrganizer(new NodeFileSystem());
    fileOrganizer.organizeFiles(
        Directory.existingValid(source, new NodeFileSystem()),
        Directory.existingValid(destination, new NodeFileSystem())
    );
}
