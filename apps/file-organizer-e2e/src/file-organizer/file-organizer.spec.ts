import {execSync} from 'child_process';
import {join} from 'path';
import * as fs from 'fs';

describe('File organizer', () => {
  beforeAll(() => {
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist');
    }
  });
  const cliPath = join(process.cwd(), '../../dist/apps/file-organizer/file-organizer.js move');

  it('should move files', () => {
    const output = execSync(`node ${cliPath} --source=./fixtures --destination=./dist`).toString();

    expect(output).toMatch('Moving files from ./source to ./destination');
  });

  it('should validate non existing directory', () => {
    expect(()=> {
      execSync(`node ${cliPath} --source=./non-existing --destination=./dist`).toString();
    }).toThrow();
  });

  it('should validate required parameters', () => {

  });
});
