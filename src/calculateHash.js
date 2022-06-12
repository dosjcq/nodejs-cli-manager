import { readFile } from 'node:fs/promises';
import { createHash } from 'crypto';

export const calculateHash = async (pathToFile) => {
  const fileBuffer = await readFile(pathToFile, (err) => {
    if (err) throw 'Operation failed';
  });

  const hex = createHash('sha256').update(fileBuffer).digest('hex');
  console.log(hex);
};
