import * as fs from 'fs';
import {FileSystem} from "../common/file-system";
import {Directory} from "../common/directory";
import {File} from "../common/file";

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

  loadFilesFromDirectory(directory: Directory): File[] {
    return this.getFilesFromDirRecursively(directory.path).map((filePath) => {
      return File.existingValid(filePath, this);
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
}
