import {FileSystem} from "./file-system";

interface FileData {
  path: string;
  createdAt: Date;
}
export class File {
  public readonly path: string;
  public readonly createdAt: Date;
  private constructor(data: FileData) {
    this.path = data.path;
    this.createdAt = data.createdAt;
  }

  static existingValid(path: string, fileSystem: FileSystem): File {
    if (fileSystem.exists(path) && !fileSystem.isDirectory(path)) {
      return new File({
        path,
        createdAt: fileSystem.stats(path).mtime
      });
    }

    throw new Error(`File ${path} does not exist`);
  }
}
