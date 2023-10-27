import {ExistingDirectory} from "../common/existing-directory";
import {ExistingFile} from "../common/existing-file";
import {Path} from "../common/path";
import {FileSystem, GetFileStats} from "../common/file-system";
import {Logger} from "../common/logger";
import {format} from 'date-fns'

export abstract class FileDestinationBuilder {
  abstract buildFilesToRelocate(filesToRelocate: ExistingFile[], destination: ExistingDirectory): FileToRelocate[];
}

export class FileToRelocate {
  constructor(private readonly source: ExistingFile, private readonly destination: Path) {}

  relocate(relocator: FileRelocator, logger: Logger): void {
    relocator.relocate(this.source, this.destination);
    logger.success(`Relocated ${this.source.path.asString()} to ${this.destination.asString()}`);
  }
}

export abstract class FileRelocator {
  abstract relocate(source: ExistingFile, destination: Path): void;
}

export class MoveFileRelocator implements FileRelocator {
  constructor(private readonly filesystem: FileSystem) {}

  relocate(source: ExistingFile, destination: Path): void {
    this.filesystem.move(source, destination);
  }
}

export class CopyFileRelocator implements FileRelocator {
  constructor(private readonly filesystem: FileSystem) {}
  relocate(source: ExistingFile, destination: Path): void {
    this.filesystem.copy(source, destination);
  }
}

export class CreationDateDestinationBuilder implements FileDestinationBuilder {
  constructor(
    private readonly fileSystem: GetFileStats,
    private readonly format = 'yyyy/mm'
  ) {}
  buildFilesToRelocate(filesToRelocate: ExistingFile[], destination: ExistingDirectory): FileToRelocate[] {
    return filesToRelocate.map((file) => {
      return new FileToRelocate(file, this.buildDestinationPath(file, destination));
    });
  }

  private buildDestinationPath(file: ExistingFile, destination: ExistingDirectory): Path {
    const createdAt = file.getCreatedAt(this.fileSystem);
    const filePath = new Path(`${format(createdAt, this.format)}/${file.getName()}`);
    return destination.addPath(filePath);
  }
}
