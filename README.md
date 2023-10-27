# File Organizer ✨

## Description
This is a simple file organizer application that allows you to organize files into folders. 

It requires a **Node.js** environment to run.

## Use cases
- Organize photos and videos based on file creation date `2023/12/christmas-tree.jpeg`

## Usage

```shell
node file-organizer.js move -s ./source -d ./destination
```

## Options
```
Usage: file-organizer.js <command> [options]

Commands:
  file-organizer.js move  Move files from source to destination
  file-organizer.js copy  Copy files from source to destination

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  file-organizer.js <command> -s ./source   Organize files
  -d ./destination
 
```

### Copy
```
file-organizer.js copy

Copy files from source to destination

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -s, --source       Source directory                        [string] [required]
  -d, --destination  Destination directory                   [string] [required]
  -f, --format       Output directory structure e.g. yyyy/mm/dd
                                                   [string] [default: "yyyy/mm"]
```

### Move
```
file-organizer.js move

Move files from source to destination

Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -s, --source       Source directory                        [string] [required]
  -d, --destination  Destination directory                   [string] [required]
  -f, --format       Output directory structure e.g. yyyy/mm/dd
                                                   [string] [default: "yyyy/mm"]
```

## Build
```shell
nx run file-organizer:build:production
```
