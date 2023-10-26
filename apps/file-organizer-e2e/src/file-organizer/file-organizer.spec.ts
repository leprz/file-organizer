import {execSync} from 'child_process';
import {join} from 'path';
import * as fs from 'fs';

describe('File organizer', () => {
  const distPath = './dist';
  beforeAll(() => {
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath);
    }
  });
  const cliPath = join(process.cwd(), '../../dist/apps/file-organizer/file-organizer.js copy');

  it('should copy files', () => {
    execSync(`node ${cliPath} --source=fixtures --destination=dist`).toString();
    expect(fs.existsSync('./dist/2023/6/7/1.png')).toBeTruthy();
    expect(fs.existsSync('./dist/2023/6/7/2.png')).toBeTruthy();
  });

  it('should validate non existing directory', () => {
    expect(()=> {
      execSync(`node ${cliPath} --source=./non-existing --destination=./dist`).toString();
    }).toThrow();
  });

  it('should validate required parameters', () => {
    expect(()=> {
      execSync(`node ${cliPath} --source=./fixtures`).toString();
    }).toThrow();
  });

  afterAll(() => {
    fs.rmSync(distPath, {recursive: true, force: true});
  });
});
