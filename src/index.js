#!/usr/bin/env node
import fs from "fs";
import { encode } from "gpt-tokenizer";
import { program } from "commander";
import "console.table";

import { recursiveDirectoryTraversal } from "./traverse.js";

program
  .version("1.0.0")
  .option("-i, --ignore-dirs [dirs...]", "List of ignored directories", [])
  .option("-f, --ignore-files [files...]", "List of ignored files", [])
  .parse(process.argv);

const options = program.opts();
const { ignoreDirs, ignoreFiles } = options;

const currentDirectory = process.cwd();

const result = [];
let total = 0;

recursiveDirectoryTraversal(
  currentDirectory,
  ignoreDirs,
  ignoreFiles,
  (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const tokens = encode(fileContent);

    result.push({ path: filePath, tokens: tokens.length });
    total += tokens.length;
  },
);

console.table(result);
console.log("Total:", total);
