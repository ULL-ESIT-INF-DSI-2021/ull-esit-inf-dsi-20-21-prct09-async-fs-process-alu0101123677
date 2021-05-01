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

Por otro lado leer y familiarizarse con la API de callbacks para interactuar con el istema de ficheros y la API asíncrona oara crear procesos. 

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

pila de llamadas | registro de eventos | cola de manejadores | salida
-----------------|---------------------|---------------------|-------
Contenido de la primera | contenido de la segunda | contenido de la tercera | contenido de la cuarta


**Traza**



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




