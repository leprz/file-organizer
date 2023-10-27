import {ExistingFile, ExistingFileFileSystem} from "./existing-file";

const fakeFileSystem: ExistingFileFileSystem = {
    exists(): boolean {
        return true;
    },
    isDirectory(): boolean {
        return false;
    },
};

export class ExistingFileObjectMother {
    static path(path: string): ExistingFile {
        return ExistingFile.existingValid(path, fakeFileSystem);
    }
}
