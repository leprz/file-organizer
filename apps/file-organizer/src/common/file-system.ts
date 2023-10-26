import {ExistingDirectory} from "./existing-directory";
import {ExistingFile} from "./existing-file";
import {Path} from "./path";

export interface FileSystem extends CheckIfFileExists, CheckIfIsDirectory, GetFileStats {
  loadFilesFromDirectory(source: ExistingDirectory): ExistingFile[];

  move(sourceFile: ExistingFile, destination: Path): void;

  copy(sourceFile: ExistingFile, destination: Path): void;
}

export interface CheckIfFileExists {
    exists(path: string): boolean;
}

export interface CheckIfIsDirectory {
    isDirectory(path: string): boolean;
}

export interface GetFileStats {
    stats(path: string): {mtime: Date};
}
