import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {ExistingDirectory} from "../common/existing-directory";
import {NodeFileSystem} from "../file-system/node-file-system";
import {FileExtensionFilter} from "../file-filter/file-extension-filter";
import {FileOrganizer} from "../file-organizer";
import {
  CopyFileRelocator,
  CreationDateDestinationBuilder, FileRelocator,
  MoveFileRelocator
} from "../file-path-converter/file-destination-builder";
import {ConsoleLogger} from "../logger/logger-console";

yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .example('$0 <command> -s ./source -d ./destination', 'Organize files')
  .command('move', 'Move files from source to destination', (yargs) => {
    return commandArguments(yargs);
  }, (argv) => {
    move(argv.source, argv.destination, argv.format).then();
  })
  .command('copy', 'Copy files from source to destination', (yargs) => {
    return commandArguments(yargs);
  }, (argv) => {
    copy(argv.source, argv.destination, argv.format).then();
  })
  .demandCommand()
  .argv;

function commandArguments(yargs: yargs.Argv<object>) {
  return yargs
    .option('source', {
      alias: 's',
      type: 'string',
      description: 'Source directory'
    })
    .option('destination', {
      alias: 'd',
      type: 'string',
      description: 'Destination directory'
    })
    .option('format', {
      alias: 'f',
      type: 'string',
      default: 'yyyy/mm',
      description: 'Output directory structure e.g. yyyy/mm/dd'
    })
    .demandOption(['source', 'destination']);
}

async function move(source: string, destination: string, format: string): Promise<never> {
  return relocate(source, destination, format, 'move');
}

async function copy(source: string, destination: string, format: string): Promise<never> {
  return relocate(source, destination, format, 'copy');
}

async function relocate(source: string, destination: string, format: string, method: 'copy' | 'move'): Promise<never> {
  const logger = new ConsoleLogger();
  const fileSystem = new NodeFileSystem();
  const relocator: FileRelocator =
    method === 'copy'
      ? new CopyFileRelocator(fileSystem)
      : new MoveFileRelocator(fileSystem);
  const fileOrganizer = new FileOrganizer(
    fileSystem,
    new CreationDateDestinationBuilder(fileSystem, format),
    relocator,
    [
      new FileExtensionFilter(['jpg', 'jpeg', 'png']),
      new FileExtensionFilter(['mp4', 'mov', 'avi'])
    ]
  );

  try {
    await fileOrganizer.organizeFiles(
      ExistingDirectory.existingValid(source, fileSystem),
      ExistingDirectory.existingValid(destination, fileSystem)
    );
  } catch (e) {
    if (e instanceof Error) {
      logger.error(e.message);
    }
    process.exit(1);
  }

  process.exit(0);
}
