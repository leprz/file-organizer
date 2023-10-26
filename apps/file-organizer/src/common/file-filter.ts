import {ExistingFile} from "./existing-file";

export abstract class FileFilter {
    abstract filterFiles(files: ExistingFile[]): ExistingFile[];

    static many(filters: FileFilter[], files: ExistingFile[]): ExistingFile[] {
        return filters.reduce<ExistingFile[]>((filteredFiles, filter) => {
            return [
                ...filteredFiles,
                ...filter.filterFiles(files)
            ];
        }, []);
    }
}
