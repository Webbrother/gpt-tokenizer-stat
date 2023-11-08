import fs from "fs";
import path from "path";

export function recursiveDirectoryTraversal(
  directoryPath,
  ignoredDirectories,
  ignoredFiles,
  callback,
) {
  // Проверка, является ли текущая директория игнорируемой
  if (ignoredDirectories.includes(path.basename(directoryPath))) {
    return;
  }

  // Получить список элементов в текущей директории
  const items = fs.readdirSync(directoryPath);

  items.forEach((item) => {
    const itemPath = path.join(directoryPath, item);

    // Проверка, является ли текущий элемент файлом
    if (fs.statSync(itemPath).isFile()) {
      // Проверка, является ли файл игнорируемым
      if (!ignoredFiles.includes(item)) {
        // Определить относительный путь относительно текущей рабочей директории
        const relativePath = path.relative(process.cwd(), itemPath);
        // Вызов колбек-функции для файла с относительным путем
        callback(relativePath);
      }
    } else if (fs.statSync(itemPath).isDirectory()) {
      // Рекурсивный вызов для директорий
      recursiveDirectoryTraversal(
        itemPath,
        ignoredDirectories,
        ignoredFiles,
        callback,
      );
    }
  });
}

// Пример использования функции
// const directoryPath = ".";
// const ignoredDirectories = ["ignoredDir1", "ignoredDir2"];
// const ignoredFiles = ["ignoredFile1.txt", "ignoredFile2.jpg"];
//
// recursiveDirectoryTraversal(
//   directoryPath,
//   ignoredDirectories,
//   ignoredFiles,
//   (filePath) => {
//     console.log(filePath); // Здесь можно выполнить нужные действия с каждым файлом
//   },
// );
