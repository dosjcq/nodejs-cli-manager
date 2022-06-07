import { readdir } from 'fs/promises';

export const listFiles = async (pathName) => {
  try {
    const files = await readdir(pathName);
    for (const file of files) console.log(file);
  } catch (err) {
    console.error(err);
  }
};
