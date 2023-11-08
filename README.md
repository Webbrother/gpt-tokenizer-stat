# gpt-tokenizer-stat

CLI to see GPT tokens stats by files.

### Getting started

- `npm i -g tokenstat`
- `cd /to/your/dir`
- `tokenstat`

### Options

- `-i` `--ignore-dirs` - List of ignored directories
- `-f` `--ignore-files` - List of ignored files

### Example

- `tokenstat -i node_modules .idea .git -f package-lock.json`
