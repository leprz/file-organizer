import {Directory} from "../common/directory";
import {FileSystem} from "../common/file-system";
import {File} from "../common/file";

export class FileOrganizer {
  constructor(private readonly fileSystem: FileSystem) {
  }
  organizeFiles(source: Directory, destination: Directory) {
    const sourceFiles: File[] = this.fileSystem.loadFilesFromDirectory(source);
    
  }
}
