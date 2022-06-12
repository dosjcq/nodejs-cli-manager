import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { basename, extname } from 'node:path';

export const compressFile = (pathToFile, pathToDestination, command) => {
  if (command === 'compress') {
    if (extname(basename(pathToDestination)) === '.br') {
      const gzip = createBrotliCompress();

      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(pathToDestination);

      gzip.on('error', () => {
        console.log('Operation Failed');
      });

      readStream.on('error', () => {
        console.log('Operation Failed');
      });

      writeStream.on('error', () => {
        console.log('Operation Failed');
      });

      readStream.pipe(gzip).pipe(writeStream);
    } else {
      throw 'Invalid input';
    }
  } else {
    if (extname(basename(pathToDestination)) !== '') {
      const unzip = createBrotliDecompress();

      const readStream = createReadStream(pathToFile);
      const writeStream = createWriteStream(pathToDestination);

      unzip.on('error', () => {
        console.log('Operation Failed');
      });

      readStream.on('error', () => {
        console.log('Operation Failed');
      });

      writeStream.on('error', () => {
        console.log('Operation Failed');
      });

      readStream.pipe(unzip).pipe(writeStream);
    } else {
      throw 'Invalid input';
    }
  }
};
