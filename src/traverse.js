import fs from "fs";
import path from "path";

export function recursiveDirectoryTraversal(
  directoryPath,
  ignoredDirectories,
  ignoredFiles,
  callback,
) {
  // Checking if the current directory is ignored
  if (ignoredDirectories.includes(path.basename(directoryPath))) {
    return;
  }

  // Get a list of items in the current directory
  const items = fs.readdirSync(directoryPath);

  items.forEach((item) => {
    const itemPath = path.join(directoryPath, item);

    // Checking if the current element is a file
    if (fs.statSync(itemPath).isFile()) {
      // Checking if a file is ignored
      if (!ignoredFiles.includes(item)) {
        // Define a relative path relative to the current working directory
        const relativePath = path.relative(process.cwd(), itemPath);
        // Calling a callback function for a file with a relative path
        callback(relativePath);
      }
    } else if (fs.statSync(itemPath).isDirectory()) {
      recursiveDirectoryTraversal(
        itemPath,
        ignoredDirectories,
        ignoredFiles,
        callback,
      );
    }
  });
}

