import {FileExtensionFilter} from "./file-extension-filter";
import {ExistingFile} from "../common/existing-file";
import {ExistingFileObjectMother} from "../common/existing-file.spec";

describe('File extension filter', () => {
    it('should filter files by extension', () => {
        const sut = new FileExtensionFilter(['png', 'jpeg']);
        const files: ExistingFile[] = [
            ExistingFileObjectMother.path('file1.png'),
            ExistingFileObjectMother.path('file1.jpeg'),
            ExistingFileObjectMother.path('file1.gif'),
        ];

        const result = sut.filterFiles(files);
        expect(result.length).toBe(2);
        expect(result[0].path.asString()).toBe('file1.png');
        expect(result[1].path.asString()).toBe('file1.jpeg');
    });
});
