import {ExistingDirectory} from "./common/existing-directory";
import {FileSystem} from "./common/file-system";
import {ExistingFile} from "./common/existing-file";
import {FileDestinationBuilder, FileRelocator, FileToRelocate} from "./file-path-converter/file-destination-builder";
import {FileFilter} from "./common/file-filter";
import {ProgressLogger} from "./logger/logger-progress";

export class FileOrganizer {
  constructor(
    private readonly fileSystem: FileSystem,
    private readonly destinationBuilder: FileDestinationBuilder,
    private readonly fileRelocator: FileRelocator,
    private readonly fileFilters: FileFilter[] = []
  ) {
  }
  async organizeFiles(source: ExistingDirectory, destination: ExistingDirectory) {
    const selectedFiles: ExistingFile[] = this.fileSystem.loadFilesFromDirectory(source);
    const filteredFiles: ExistingFile[] = FileFilter.many(this.fileFilters, selectedFiles);
    const filesToRelocate: FileToRelocate[] = this.destinationBuilder.buildFilesToRelocate(filteredFiles, destination);

    const progressBar = new ProgressLogger(filesToRelocate.length);
    const progress: Promise<void>[] = [];

    filesToRelocate.forEach((file) => {
      progress.push(new Promise((resolve) => {
        file.relocate(this.fileRelocator, progressBar);
        resolve();
      }));
    });

    return Promise.all(progress).then(() => {
      progressBar.stop();
    });
  }
}
