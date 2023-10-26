import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {ExistingDirectory} from "../common/existing-directory";
import {NodeFileSystem} from "../file-system/node-file-system";
import {FileExtensionFilter} from "../file-filter/file-extension-filter";
import {FileOrganizer} from "../file-organizer";
import {
    CopyFileRelocator,
    CreationDateDestinationBuilder,
    MoveFileRelocator
} from "../file-path-converter/file-destination-builder";

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
    .command('copy', 'Copy files from source to destination', (yargs) => {
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
        copy(argv.source, argv.destination).then();
    })
    .demandCommand()
    .argv;

async function move(source: string, destination: string) {
    const fileSystem = new NodeFileSystem();
    const fileOrganizer = new FileOrganizer(
        fileSystem,
        new CreationDateDestinationBuilder(fileSystem),
        new MoveFileRelocator(fileSystem),
        [
            new FileExtensionFilter(['jpg', 'jpeg', 'png']),
            new FileExtensionFilter(['mp4', 'mov', 'avi'])
        ]
    );
    fileOrganizer.organizeFiles(
        ExistingDirectory.existingValid(source, fileSystem),
        ExistingDirectory.existingValid(destination, fileSystem)
    );
}

async function copy(source: string, destination: string) {
    const fileSystem = new NodeFileSystem();
    const fileOrganizer = new FileOrganizer(
        fileSystem,
        new CreationDateDestinationBuilder(fileSystem),
        new CopyFileRelocator(fileSystem),
        [
            new FileExtensionFilter(['jpg', 'jpeg', 'png']),
            new FileExtensionFilter(['mp4', 'mov', 'avi'])
        ]
    );

    fileOrganizer.organizeFiles(
        ExistingDirectory.existingValid(source, fileSystem),
        ExistingDirectory.existingValid(destination, fileSystem)
    );
}
