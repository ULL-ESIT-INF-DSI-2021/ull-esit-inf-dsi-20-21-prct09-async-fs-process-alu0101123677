import * as yargs from 'yargs';
import * as fs from 'fs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

yargs.command({
  command: 'check',
  describe: 'Dada una ruta concreta, mostrar si es un directorio o un fichero',
  builder: {
    path: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      check(argv.path);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.command({
  command: 'mkdir',
  describe: 'Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro',
  builder: {
    path: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      mkdir(argv.path);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.command({
  command: 'ls',
  describe: 'Listar los ficheros dentro de un directorio',
  builder: {
    path: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      ls(argv.path);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.command({
  command: 'cat',
  describe: 'Mostrar el contenido de un fichero',
  builder: {
    path: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      cat(argv.path);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.command({
  command: 'rm',
  describe: 'Borrar ficheros y directorios',
  builder: {
    path: {
      describe: 'ruta',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string') {
      rm(argv.path);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.command({
  command: 'mv',
  describe: 'Mover y copiar ficheros y/o directorios de una ruta a otra',
  builder: {
    origin: {
      describe: 'ruta origen',
      demandOption: true,
      type: 'string',
    },
    destiny: {
      describe: 'ruta destino',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.origin === 'string' && typeof argv.destiny === 'string') {
      mv(argv.origin, argv.destiny);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.parse();

function check(path: string) {
  if (fs.existsSync(path)) {
    fs.readdir(path, (err, files) => {
      if (err)
        console.log(`${path} es un fichero`);
      else
        console.log(`${path} es un directorio`);
        files
    });
  }
  else
    console.log(chalk.red("ERROR: La ruta no existe"))
}

function mkdir(path: string) {
  if (fs.existsSync(path))
    console.log(chalk.red("ERROR: El directorio existe"))
  else 
    spawn('mkdir', [path]);
}

function ls(path: string) {
  if (fs.existsSync(path))
    spawn('ls', [path]).stdout.pipe(process.stdout);
  else 
    console.log(chalk.red("ERROR: La ruta no existe"))
}

function cat(path: string) {
  if (fs.existsSync(path))
    spawn('cat', [path]).stdout.pipe(process.stdout);
  else 
    console.log(chalk.red("ERROR: La ruta no existe"))
}

function rm(path: string) {
  if (fs.existsSync(path))
    spawn('rm', ['-r', path]);
  else 
    console.log(chalk.red("ERROR: La ruta no existe"))
}

function mv(origin: string, destiny: string) {
  if (fs.existsSync(origin))
    if (fs.existsSync(destiny))
      spawn('mv', [origin, destiny]);
    else
      console.log(chalk.red("ERROR: La ruta destino no existe"));
  else 
    console.log(chalk.red("ERROR: La ruta origen no existe"));
}