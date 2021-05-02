# Informe de la Práctica 9 de la asignatura de Desarrollo de Sistemas Infórmaticas
## Datos
  * **Nombre:** Bruno Lorenzo
  * **Apellidos:** Arroyo Pedraza
  * **Gmail:** alu0101123677@ull.edu.es
  * **Univeridad:** Universidad de La Laguna
  * **Asignatura:** Desarrollo de Sistemas Informáticos
  * **Práctica:** Práctica 9 Sistema de ficheros y creación de procesos en Node.js
 
 [![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101123677/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101123677?branch=main) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101123677&metric=alert_status)](https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101123677) [![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101123677/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101123677/actions/workflows/tests.yml)

## Desarrollo

### 1. Introducción

Informe de la novena práctica de la asignatura de **Desarrollo de Sistemas Informáticos**. En la práctica propuesta se ha realizado 4 ejercicios en typescript en los cuales trabajaremos con sistemas de ficheros y creación de procesos en Node.js

**Importante:**  Utilizar el comando `npm install` para instalar las dependencias de desarrollo que utiliza el proyecto cuando se descargue de GitHub. 

### 2. Objetivos

El objetivo principal es familiarizarse **API de callbacks** y la **API asíncrona** por Node.js, para esto tendremos que realizar 4 ejercicios.

### 3. Desarrollo

#### 3.1 Tareas previas

Para el desarrollo de la práctica cómo tal primero hay que hacer unas preparaciones previas, hay que aceptar la asignación de la práctica 9 y preparar el entorno del proyecto, para esto es necesario package.json y tsconfig.json, así cómo crear la estructura de directorios. Además de seguir las pautas para implementar la generación de documentación por **typedoc**, los test unitarios realizandos con **mocha** y **chai**, el cubrimiento de código mediante **instabul** y **coveralls** y por último la implementación de **GitHub Actions** que llevará a cabo los test unitarios, el cubrimiento del código y la utilización del **Sonar Cloud** para comprobar la calidad y seguridad del código fuente.

Por otro lado leer y familiarizarse con la **API de callbacks** para interactuar con el istema de ficheros y la **API asíncrona** para crear procesos. 

#### 3.2 Desarrollo

##### 3.2.1 Ejercicio 1
En el ejercicio 1 tenemos el siguiente código de ejemplo el cúal era necesario analizar y realizar la traza de ejecución del mismo además de que es lo que se muestra por consola, utilizando como fichero de texto el helloworld.txt que se encuentra en data_base:

**Código**
```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
**Traza**

 * Inicializacion

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 |  |  | 
 
 * Step 1. Se introduce el main del programa en la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 main |  |  | 

 * Step 2. Se introduce el access en la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 access |  |  |
 main |  |  | 

 * Step 3. Se pasa el access al registro de eventos.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 main | access |  | 

 * Step 4. El main sale de la pila de llamadas, el access sale del registro de eventos y en la cola de manejadores entra el callback de access

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
  |  | callback de access | 

 * Step 5. El callback sale de la cola de manejadores y es añadido a la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access |  |  | 

 * Step 6. Empezamos a ejecutar el callback de access

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 console.log(`Starting to watch file ${filename}`) |  |  | 
 callback de access |  |  | 

 * Step 7. Se ejecuta console.log(`Starting to watch file ${filename}`) y se muestra en la salida

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access |  |  | Starting to watch file data_base/helloworld.txt

 * Step 8. Se introduce la función watch(process.argv[2]) en la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 watch(process.argv[2]) |  |  | 
 callback de access |  |  | 

 * Step 9. Se ejecuta la función watch(process.argv[2]) y sale de la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access |  |  | 

 * Step 10. Se introduce la función watcher.on('change') en la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 watcher.on('change') |  |  | 
 callback de access |  |  |

 * Step 11. Se pasa el watcher.on('change') al registro de eventos

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de access | watcher.on('change') |  |

 * Step 12. Se queda esperando e introduce console.log(`File ${filename} is no longer watched`) en la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 console.log(`File ${filename} is no longer watched`) | watcher.on('change') |  |  
 callback de access | watcher.on('change') |  |  

 * Step 13. Se ejecuta console.log(`File ${filename} is no longer watched`) y se muestra en la salida

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
  | watcher.on('change') |  | File data_base/helloworld.txt is no longer watched 

 * Step 14. El callback de watcher.on('change) se pasa a la cola de manejadores.

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 | watcher.on('change') | callback de watcher.on('change') |  

 * Step 15. El callback de watcher.on('change) pasa a la pila de llamadas

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 callback de watcher.on('change') | watcher.on('change') |  | 

 * Step 16. Se ejecuta el callback de watcher.on('change') y se añade a la pila de llamada console.log(`File ${filename} has been modified somehow`)

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
 console.log(`File ${filename} has been modified somehow`) |  |  | 
 callback de watcher.on('change') | watcher.on('change') |  | 

  * Step 17. Se ejecuta el  console.log(`File ${filename} has been modified somehow`) y se muestra por la salida y el callback sale de la pila 

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
  | watcher.on('change') |  | File data_base/helloworld has been modified somehow

Ahora se repetirian los 4 últimos pasos hasta que el proceso termine.

**¿Qué hace la función access?**

La función access de Node.js es un método utilizado para probar los permisos de un archivo o directorio determinado. Los permisos que se van a comprobar pueden ser especificados como un parámetro usando las constantes de acceso a archivos.

**¿Para qué sirve el objeto constants?**

El objeto constants es utilizado para las operaciones del sistema de archivos, débido a que contiene las constantes más utilizadas para este tipo de operaciones.

##### [3.2.2 Ejercicio 2](src/ejercicio2.ts)

Para el ejercicio 2 creamos un **yarg** para utilizar el comando info que proporcionar información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. A su vez creamos las funciones **pipe** y **noPipe** para realizar el ejercicio de las dos máneras de que se nos piden.

El comando **info** se construye pasando por línea de cómando, la **ruta del archivo** siendo un string y los siguientes atributos siendo booleanos son **pipe**, **character**, **word** o **line**, para de esta mánera indicar que método queremos usar y sobre que queremos proporcionar información. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método correspondiente según el estado de **pipe**.

El método **pipe** recibe como atributo la **ruta del archivo** y los booleanos **character**, **word** y **line**. Comprobamos al inicio la ruta del archivo para así comprobar si el archivo existe o no. Si el archivo existe realizamos un if para cada booleano, en caso de ser true realizamos dos métodos **spawn**, uno realizando un echo y el otro un **wc** pasandole la opción correspondiente para caracteres, palabras y lineas y utilizando el método **pipe** para mostrar el **echo** y los resultados del **wc**.

El método **noPipe** recibe como atributo la **ruta del archivo** y los booleanos **character**, **word** y **line**. Comprobamos al inicio la ruta del archivo para así comprobar si el archivo existe o no. Si el archivo existe realizamos el método **spawn** para ejcutar el comando **wc**, luego creamos la varaible **wcOutput** que va a utilizarse para ir almacenando el contenido de la salida estándar generada por el comando wc. A continuación el callback obtenido mediante el método **on** nos permite mostrar por consola las diferentes estadisticas obtenidas a partir de la ejecución del comando **wc** y antes de mostrar por pantalla cáda estadistica realizamos un if de cada booleano para saber si mostrar o no la estadistica correspondiente.

Para ejecutar el programa se tienen las siguientes opciones:

node dist/ejercicio2.js info --path='ruta del archivo' --pipe=true --character=true --word=true --line=true

las opciones que están a true pueden ponerse a false.

##### 3.2.3 [Ejercicio 3](src/ejercicio3.ts)

Para el ejercicio 3 creamos un **yarg** para utilizar el comando **watch** que observa el directorio de un usuario esperando un cambio, que puede ser añadir, eliminar o modificar un fichero. A su vez creamos la función **watch**.

El comando **watch** se construye pasando por línea de cómando, el **usuario** y la **ruta del directorio** siendo un string. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método **watch**.

El método **watch** recibe como atributo la **ruta del directorio**. Comprobamos al inicio la ruta del directorio para así comprobar si el directorio existe o no. Si el directorio existe realizamos el método **fs.readdir()** para así saber cuantos archivos hay en su interior y dentro del callback de esta función realizamos el **fs.watch()**, combinado con un contador gracias a que **evenType** nos devuelve los string "rename" o "change" y  realizando otro **readdir()** para saber cuantos archivos hay en el momento podemos comparar los estados inicial y el estado nuevo, y así distinguir si se ha creado o eliminado un archivo así cómo si se ha modificado alguno para notificarlo con un mediante un **console.log()**.

Para ejecutar el programa se tienen la siguiente opcion:

node dist/ejercicio3.js watch --user='usuario' --path='ruta del archivo'

**¿Cómo haría para mostrar, no solo el nombre, sino también el contenido del fichero, en el caso de que haya sido creado o modificado?**

Cuando haya sido creado o modificado, además del **console.log()** que se ejecuta a continuación podemos implementar la función **fs.readFile()** y en el callback de esta función hacer un **console.log()** del data del fichero

**¿Cómo haría para que no solo se observase el directorio de un único usuario sino todos los directorios correspondientes a los diferentes usuarios de la aplicación**

Para observar los directorios correspondientes de cada usuario podriamos incluir que nuestro **fs.watch()** estuviera la opción **recursive**, de esta manera si observamos un directorio que tiene como subdirectorios los de cada usuario estos también estarán siendo observados.

##### 3.2.4 [Ejercicio 4](src/ejercicio4.ts)

Para el ejercicio 4 creamos varios **yarg** para utilizar el comando **check**, **mkdir**, **ls**, **cat**, **rm** y **mv** que realizan distintan funciones sobre manejo de ficheros y directorios. A su vez creamos las funciones **check**, **mkdir**, **ls**, **cat**, **rm** y **mv**.

El comando **check** se utiliza para que dada una ruta concreta, muestra si es un directorio o un fichero, se construye pasando por línea de cómando, la **ruta** siendo un string. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método **check**.

El comando **mkdir** se utiliza para crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro, se construye pasando por línea de cómando, la **ruta** siendo un string. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método **mkdir**.

El comando **ls** se utiliza para que listar los ficheros dentro de un directorio, se construye pasando por línea de cómando, la **ruta** siendo un string. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método **ls**.

El comando **cat** se utiliza para que muestra el contenido de un fichero, se construye pasando por línea de cómando, la **ruta** siendo un string. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método **cat**.

El comando **rm** se utiliza para que borra ficheros y directorios, se construye pasando por línea de cómando, la **ruta** siendo un string. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método **rm**.

El comando **mv** se utiliza para que mueve y copia ficheros y/o directorios de una ruta a otra, se construye pasando por línea de cómando, la **ruta de origen** y la **ruta de destino** siendo un string. En el handler comprobamos que los datos han sido introducidos correctamente y llamamos al método **mv**.

El método **check** recibe como atributo la **ruta**. Comprobamos al inicio la ruta existe para así comprobar si existe o no. Si existe realizamos el método **fs.readdir()** y comprobamos el error, si el error es true se trata de un fichero y si es false se tratará de un directorio, siendo en cada caso realizamos un **console.log()** para mostrar por consola cual es el resultado.

El método **mkdir** recibe como atributo la **ruta**. Comprobamos al inicio la ruta existe para así comprobar si existe o no. Si no existe realizamos el método **spawn()** para ejecutar el comando **mkdir**.

El método **ls** recibe como atributo la **ruta**. Comprobamos al inicio la ruta existe para así comprobar si existe o no. Si existe realizamos el método **spawn()** para ejecutar el comando **ls**.

El método **cat** recibe como atributo la **ruta**. Comprobamos al inicio la ruta existe para así comprobar si existe o no. Si existe realizamos el método **spawn()** para ejecutar el comando **cat**.

El método **rm** recibe como atributo la **ruta**. Comprobamos al inicio la ruta existe para así comprobar si existe o no. Si existe realizamos el método **spawn()** para ejecutar el comando **rm**.

El método **mv** recibe como atributo la **ruta de origen** y la **ruta de destino**. Comprobamos al inicio la ruta de origen así cómo ruta de destino para así comprobar si existe o no. Si existen realizamos el método **spawn()** para ejecutar el comando **mv**.

### 4. Conclusiones

En conclusión está práctica con diversos ejercicios, algunos más sencillos que otros tienen un punto más téorico, cómo el ejercicio 1, pero que sirven bastante para profundizar en la utilización de la API de callbacks la asíncrona así cómo en el seguimiento de ejecución de un proceso.

### 5. Bibliografía

[Guión de la práctica 9](https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/)

[Introducción a Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-intro.html)

[Introducción al sistema de ficheros en Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-filesystem.html)

[Yarg](https://www.npmjs.com/package/yargs)

[API de callbacks](https://nodejs.org/dist/latest/docs/api/fs.html#fs_callback_api)

[API asíncrona](https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_asynchronous_process_creation)




