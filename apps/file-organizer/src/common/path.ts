export class Path {
  private readonly path: string;
  constructor(path: string) {
    this.assertPathIsValid(path);
    path = this.removeTrailingSlash(path);
    path = this.replaceBackslashWithSlash(path);
    this.path = path.trim();
  }

  private replaceBackslashWithSlash(path: string): string {
    return path.replace("\\", '/');
  }

  private removeTrailingSlash(path: string): string {
    return path.trimEnd().replace(/\/+$/, '');
  }

  private assertPathIsValid(path: string): void {
    if (!path) {
      throw new Error('Path cannot be empty');
    }

    if (path.includes('..')) {
      throw new Error('Path cannot contain ..');
    }

    if (path.includes('//')) {
      throw new Error('Path cannot contain //');
    }

    if (path.includes('\\\\')) {
      throw new Error('Path cannot contain \\\\');
    }

    if (path.includes('*')) {
      throw new Error('Path cannot contain *');
    }

    if (path.includes('?')) {
      throw new Error('Path cannot contain ?');
    }

    if (path.includes('"')) {
      throw new Error('Path cannot contain "');
    }

    if (path.includes('<')) {
      throw new Error('Path cannot contain <');
    }

    if (path.includes('>')) {
      throw new Error('Path cannot contain >');
    }

    if (path.includes('|')) {
      throw new Error('Path cannot contain |');
    }

    if (path.includes('\n')) {
      throw new Error('Path cannot contain new lines');
    }

    if (path.includes('\r')) {
      throw new Error('Path cannot contain carriage returns');
    }

    if (path.includes('\t')) {
      throw new Error('Path cannot contain tabs');
    }

    if (path.includes('\0')) {
      throw new Error('Path cannot contain null characters');
    }

    if (path.includes('\b')) {
      throw new Error('Path cannot contain backspace characters');
    }

    if (path.includes('\f')) {
      throw new Error('Path cannot contain form feed characters');
    }

    if (path.includes('\v')) {
      throw new Error('Path cannot contain vertical tab characters');
    }

    if (path.includes('\u2028')) {
      throw new Error('Path cannot contain line separator characters');
    }

    if (path.includes('\u2029')) {
      throw new Error('Path cannot contain paragraph separator characters');
    }
  }

  public asString(): string {
    return this.path;
  }

  public addPath(path: Path): Path {
    return new Path(this.path.concat('/', path.asString()));
  }

  getDirName(): Path {
    if (this.isFile()) {
      return new Path(this.path.split('/').slice(0, -1).join('/'));
    } else {
      return this;
    }
  }

  isFile(): boolean {
    return this.path.includes('.');
  }
}
