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

**Importante:**  Utilizar el comando `npm install` para instalar las dependencias de desarrollo que utiliza el proyecto cuando se descargue de GitHub. 

### 2. Objetivos

El objetivo principal es familiarizarse API de callbacks y la API asíncrona por Node.js, para esto tendremos que realizar 4 ejercicios.

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

##### 3.2.2 Ejercicio 2

##### 3.2.3 Ejercicio 3

##### 3.2.4 Ejercicio 4


### 4. Conclusiones


### 5. Bibliografía

[Guión de la práctica 9](https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/)

[Introducción a Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-intro.html)

[Introducción al sistema de ficheros en Node.js](https://ull-esit-inf-dsi-2021.github.io/nodejs-theory/nodejs-filesystem.html)

[Yarg](https://www.npmjs.com/package/yargs)




