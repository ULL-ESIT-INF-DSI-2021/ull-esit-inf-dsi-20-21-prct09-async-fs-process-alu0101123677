import * as yargs from 'yargs';
/*import * as fs from 'fs';*/


function pipe() {

}

function noPipe() {

}

yargs.command({
  command: 'pipe',
  describe: 'Proporciona informacion sobre el número de líneas, palabras o caracteres que contiene un fichero de texto',
  builder: {
    path: {
      describe: 'Ruta del archivo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      pipe();
    }
  },
});

yargs.command({
  command: 'nopipe',
  describe: 'Proporciona informacion sobre el número de líneas, palabras o caracteres que contiene un fichero de texto',
  builder: {
    path: {
      describe: 'Ruta del archivo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      noPipe();
    }
  },
});

yargs.parse();