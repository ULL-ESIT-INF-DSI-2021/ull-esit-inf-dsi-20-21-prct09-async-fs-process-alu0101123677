import * as yargs from 'yargs';
import * as fs from 'fs';
import {spawn} from 'child_process';
import * as chalk from 'chalk'

yargs.command({
  command: 'info',
  describe: 'Proporciona informacion sobre el número de líneas, palabras o caracteres que contiene un fichero de texto',
  builder: {
    path: {
      describe: 'Ruta del archivo',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Opcion para el pipe',
      demandOption: true,
      type: 'boolean',
    },
    character: {
      describe: 'Opcion para caracteres',
      demandOption: true,
      type: 'boolean',
    },
    word: {
      describe: 'Opcion para palabras',
      demandOption: true,
      type: 'boolean',
    },
    line: {
      describe: 'Opcion para lineas',
      demandOption: true,
      type: 'boolean',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && typeof argv.pipe === 'boolean' && typeof argv.character === 'boolean' && 
        typeof argv.word === 'boolean' && typeof argv.line === 'boolean') {
      if (argv.pipe)
        pipe(argv.path, argv.character, argv.word, argv.line);
      else
        noPipe(argv.path, argv.character, argv.word, argv.line);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.parse();

function pipe(path: string, character: boolean, word: boolean, line: boolean) {
  if (fs.existsSync(path)) {
    if (character) {
      let out = spawn('echo', ['Caracteres: '])
      out.stdout.pipe(process.stdout);
      let wc = spawn('wc', ['-m', path]);
      wc.stdout.pipe(process.stdout);
    }
    if (word) {
      let out = spawn('echo', ['Palabras: '])
      out.stdout.pipe(process.stdout);
      let wc = spawn('wc', ['-w', path]);
      wc.stdout.pipe(process.stdout);
    }
    if (line) {
      let out = spawn('echo', ['Lineas: '])
      out.stdout.pipe(process.stdout);
      let wc = spawn('wc', ['-l', path]);
      wc.stdout.pipe(process.stdout);
    }
  }
  else
    console.log(chalk.red("ERROR: El archivo no existe"))
}

function noPipe(path: string, character: boolean, word: boolean, line: boolean) {
  if (fs.existsSync(path)) {
    let wc = spawn('wc', [path]);

    let wcOutput = '';
    wc.stdout.on('data', (piece) => wcOutput += piece);

    wc.on('close', () => {
      const wcOutputAsArray = wcOutput.split(/\s+/);
      if (character)
        console.log(`File helloworld.txt has ${wcOutputAsArray[3]} chatacters`);
      if (word)
        console.log(`File helloworld.txt has ${wcOutputAsArray[2]} words`);
      if (line)
        console.log(`File helloworld.txt has ${wcOutputAsArray[1]} line`);    
    });
  }
  else
    console.log(chalk.red("ERROR: El archivo no existe"))
}