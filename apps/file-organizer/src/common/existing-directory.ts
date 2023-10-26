import {FileSystem} from "./file-system";
import {Path} from "./path";

export class ExistingDirectory {
  private constructor(public readonly path: Path) {}
  static existingValid(path: string, fileSystem: FileSystem): ExistingDirectory {
    const directoryPath = new Path(path);
    if (fileSystem.exists(directoryPath.asString()) && fileSystem.isDirectory(directoryPath.asString())) {
      return new ExistingDirectory(directoryPath);
    }

    throw new Error(`Directory ${path} does not exist`);
  }

  addPath(path: Path): Path {
    return this.path.addPath(path);
  }
}
