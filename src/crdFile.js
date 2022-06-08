import { readFile, writeFile, unlink } from 'node:fs/promises';

export const crdFile = async (currentPath, fileName, command) => {
  try {
    if (command === 'cat') {
      const fileContent = await readFile(`${currentPath}/${fileName}`);
      console.log(fileContent.toString());
    }
    if (command === 'add') {
      await writeFile(`${currentPath}/${fileName}`, '');
    }
    if (command === 'rm') {
      await unlink(`${currentPath}/${fileName}`);
    }
  } catch (err) {
    console.error(err);
  }
};
