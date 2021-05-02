import * as yargs from 'yargs';
import * as fs from 'fs';
import * as chalk from 'chalk'

/**
 * Comando que observa el directorio de un usuario esperando un cambio
 * 
 * Se pasan por parametro en terminal, el usuario del directorio y la ruta del directorio
 */
yargs.command({
  command: 'watch',
  describe: 'Observa el directorio de un usuario esperando un cambio',
  builder: {
    user: {
      describe: 'usuario',
      demandOption: true,
      type: 'string',
    },
    path: {
      describe: 'Ruta del archivo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.path === 'string') {
        watch(argv.path);
    }
    else
      console.log(chalk.red("ERROR: Introducción de datos erronea"))
  },
});

yargs.parse();

/**
 * Método que se utiliza para observar y notificar si hay cambios en un directorio
 * @param path string con la ruta del directorio a observar
 */
function watch(path: string){
  if (fs.existsSync(path)) {
    let count = 0
    fs.readdir(path, (err, stateOne) => {
      if (err) 
        console.log(chalk.red("ERROR: no se ha podido leer el contenido del directorio"));
      else {
        fs.watch(path, (evenType, filename) => {
          count += 1;
          if (count % 2 == 1) {
            if (evenType == "rename"){
              fs.readdir(path, (err, stateTwo) => {
                if (err) 
                  console.log(chalk.red("ERROR: no se ha podido leer el contenido del directorio"));
                else {
                  if(stateOne.length < stateTwo.length) {
                    console.log(`Se ha creado el archivo ${filename}`);
                    stateOne = stateTwo;
                  }
                  else {
                    console.log(`Se ha eliminado el archivo ${filename}`);
                    stateOne = stateTwo;
                  }
                }
              });
              count += 1;
            }
            if (evenType == "change")
              console.log(`Se ha modificado el archivo ${filename}`)
          }
        });
      }
    });
  }
  else
    console.log(chalk.red("ERROR: El directorio del usuario no existe"))
}