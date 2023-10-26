import * as fs from 'fs';
import {FileSystem} from "../common/file-system";
import {ExistingDirectory} from "../common/existing-directory";
import {ExistingFile} from "../common/existing-file";
import {Path} from "../common/path";

export class NodeFileSystem implements FileSystem {
  exists(path: string): boolean {
    return fs.existsSync(path);
  }

  isDirectory(path: string): boolean {
    return fs.lstatSync(path).isDirectory();
  }

  stats(path: string): { mtime: Date } {
    return {mtime: new Date(fs.lstatSync(path).mtime)};
  }

  loadFilesFromDirectory(directory: ExistingDirectory): ExistingFile[] {
    return this.getFilesFromDirRecursively(directory.path.asString()).map((filePath) => {
      return ExistingFile.existingValid(filePath, this);
    });
  }
  private getFilesFromDirRecursively(directory: string): string[] {
    let filePaths: string[] = [];
    for (const dirent of fs.readdirSync(directory, { withFileTypes: true })) {
      const path = directory + '/' + dirent.name;
      if (dirent.isDirectory()) {
        filePaths = [
          ...filePaths,
          ...this.getFilesFromDirRecursively(path)
        ];
      } else {
        filePaths = [...filePaths, path];
      }
    }
    return filePaths;
  }

  move(sourceFile: ExistingFile, destination: Path): void {
    this.makeDirIfNotExists(destination.getDirName().asString());
    fs.renameSync(sourceFile.path.asString(), destination.asString());
  }

  copy(sourceFile: ExistingFile, destination: Path): void {
    this.makeDirIfNotExists(destination.getDirName().asString());
    fs.copyFileSync(sourceFile.path.asString(), destination.asString());
  }

  private makeDirIfNotExists(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {recursive: true});
    }
  }
}
