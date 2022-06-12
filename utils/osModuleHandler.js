import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const osModuleHandler = (flag) => {
  switch (flag) {
    case '--EOL':
      process.stdout.write(`${JSON.stringify(EOL)}\n`);
      break;
    case '--cpus':
      console.log(cpus());
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch());
      break;
  }
};
