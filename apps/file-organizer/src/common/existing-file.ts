import {CheckIfFileExists, CheckIfIsDirectory, GetFileStats} from "./file-system";
import {Path} from "./path";

export type ExistingFileFileSystem = CheckIfFileExists & CheckIfIsDirectory;

export class ExistingFile {
  public readonly path: Path;
  private constructor(data: {
    path: Path;
  }) {
    this.path = data.path;
  }

  static existingValid(
      path: string,
      fileSystem: ExistingFileFileSystem
  ): ExistingFile {
    const filePath = new Path(path);
    if (fileSystem.exists(filePath.asString()) && !fileSystem.isDirectory(filePath.asString())) {
      return new ExistingFile({
        path: filePath,
      });
    }

    throw new Error(`File ${path} does not exist`);
  }

  private static hasExtension(file: ExistingFile, extension: string): boolean {
    return file.path.asString().endsWith(extension);
  }

  static filterByExtension(files: ExistingFile[], extension: string): ExistingFile[] {
    return files.filter((file) => {
      return ExistingFile.hasExtension(file, extension);
    });
  }

  getName(): string {
    return this.path.asString().split('/').pop() || '';
  }

  getCreatedAt(fileSystem: GetFileStats): Date {
    return fileSystem.stats(this.path.asString()).mtime;
  }
}
