#!/usr/bin/env node

import fs from "fs";
// import path from "path";
import { encode } from "gpt-tokenizer";
import { program } from "commander";

import { recursiveDirectoryTraversal } from "./traverse.js";

program
  .version("1.0.0")
  .option("-i, --ignore-dirs [dirs...]", "Список игнорируемых директорий", [])
  .option("-f, --ignore-files [files...]", "Список игнорируемых файлов", [])
  .parse(process.argv);

const options = program.opts();
const { ignoreDirs, ignoreFiles } = options;

// function countTokensInDirectory(directory) {
//   const tokenCounts = {};
//
//   const items = fs.readdirSync(directory);
//
//   for (const item of items) {
//     const itemPath = path.join(directory, item);
//
//     if (ignoreDirs.includes(item) || ignoreFiles.includes(item)) {
//       continue;
//     }
//
//     if (fs.statSync(itemPath).isDirectory()) {
//       const subTokenCounts = countTokensInDirectory(itemPath);
//       Object.assign(tokenCounts, subTokenCounts);
//     } else {
//       const fileContent = fs.readFileSync(itemPath, "utf8");
//       const tokens = encode(fileContent);
//       tokenCounts[item] = tokens.length;
//     }
//   }
//
//   return tokenCounts;
// }

const currentDirectory = process.cwd();
// const tokenCounts = countTokensInDirectory(currentDirectory);

const result = [];

recursiveDirectoryTraversal(
  currentDirectory,
  ignoreDirs,
  ignoreFiles,
  (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const tokens = encode(fileContent);

    result.push({ path: filePath, tokens: tokens.length });
    // console.log(filePath, tokens.length); // Здесь можно выполнить нужные действия с каждым файлом
  },
);

console.table(result);
// console.table([
//   { dir: 'dir', tokens: 12 },
//   { dir: 'dir2', tokens: 123 },
// ]);
// console.log(`Total tokens: ${totalTokenCount}`);
