import {ExistingFile} from "../common/existing-file";
import {FileFilter} from "../common/file-filter";

export class FileExtensionFilter implements FileFilter {
    constructor(private readonly fileExtensions: string[]) {
    }

    filterFiles(files: ExistingFile[]): ExistingFile[] {
        return this.fileExtensions.reduce<ExistingFile[]>(
            (acc, extension) => {
                return [...acc, ...ExistingFile.filterByExtension(files, extension)];
            },
            []
        );
    }
}
