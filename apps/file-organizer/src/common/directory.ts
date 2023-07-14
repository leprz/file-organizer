import {FileSystem} from "./file-system";
export class Directory {
  private constructor(public readonly path: string) {}
  static existingValid(path: string, fileSystem: FileSystem): Directory {
    if (fileSystem.exists(path) && fileSystem.isDirectory(path)) {
      return new Directory(path);
    }

    throw new Error(`Directory ${path} does not exist`);
  }
}
