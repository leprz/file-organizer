import {Path} from "./path";

describe('path value object', () => {
  const validPaths = [
    ['/this/is/valid/path', '/this/is/valid/path'],
    ['/this-is/valid', '/this-is/valid'],
    ['/this-is/valid/', '/this-is/valid'],
    ['./this-is/valid', './this-is/valid'],
    ['this is valid/path', 'this is valid/path'],
    ['thisIsValid.path', 'thisIsValid.path'],
    ['\\this\\is-valid', '/this/is-valid'],
    ['C:\\this\\is-valid', '/this/is-valid'],
  ];

  const invalidPaths = [
    ['../this-is-not-valid', 'Path cannot contain ..'],
    ['/*/this-is-not-valid', 'Path cannot contain *'],
    ['//this-is-not-valid', 'Path cannot contain //'],
    ['/this-is////not-valid', 'Path cannot contain //'],
    ['/this-is\\\\not-valid', 'Path cannot contain \\\\'],
  ];

  test.each(validPaths)(
    "given path %p expects to be %p",
    (given, expected) => {
      const path = new Path(given);
      expect(path.asString()).toStrictEqual(expected);
    }
  )

  test.each(invalidPaths)(
    "given path %p expects to be invalid",
    (given, error) => {
      expect(() => {
        new Path(given);
      }).toThrowError(error)
    }
  )
});
