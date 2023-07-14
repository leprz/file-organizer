import {Directory} from "./directory";
import {File} from "./file";

export interface FileSystem {
  exists(path: string): boolean;

  isDirectory(path: string): boolean;

  loadFilesFromDirectory(source: Directory): File[];

  stats(path: string): {mtime: Date};
}
