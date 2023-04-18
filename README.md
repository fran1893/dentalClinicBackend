# Dental Clinic API

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <!-- <li><a href="#deploy-🚀">Deploy</a></li> -->
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
  </ol>
</details>

## Objetivo
Este proyecto requería una API funcional conectada a una base de datos usando sequelize y MySQL de una clínica dental

## Sobre el proyecto
Este proyecto de backend es un sistema de gestión de citas y tratamiento para pacientes. Esta aplicación web permite a la clínica gestionar de manera eficiente y automatizada todos los procesos necesarios para atender a sus pacientes de forma efectiva.

Para su desarrollo, se ha utilizado Sequelize junto con Node.JS, una herramienta de mapeo objeto-relacional que permite trabajar con bases de datos relacionales de forma más sencilla y eficiente, MySQL, un sistema de gestión de bases de datos ampliamente utilizado en el mundo empresarial debido a su estabilidad y escalabilidad, y Docker, una plataforma que permite a los desarrolladores empaquetar una aplicación con todas sus dependencias y librerías, en un contenedor independiente, lo que facilita su implementación en diferentes ambientes y sistemas.

La aplicación cuenta con distintos endpoints para la gestión de pacientes, gestion de doctores, citas y tratamientos, permitiendo a la clínica llevar un seguimiento de todos los procesos y procedimientos necesarios para brindar un servicio de calidad a sus pacientes.    

<!-- ## Deploy 🚀
<div align="center">
    <a href="https://www.google.com"><strong>Url a producción </strong></a>🚀🚀🚀
</div> -->

## Stack
Tecnologías utilizadas:
<div align="center">
<a href="https://sequelize.org/">
    <img src= "https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=white"/>
</a>
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
 </div>


## Diagrama BD
!['imagen-db'](./media/DBdiagram.png)

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ``` $ Ejecutamos las migraciones ``` 
5. ``` $ Ejecutamos los seeders ``` 
6. ``` $ npm run dev ```

## Endpoints
<details>
<summary>Endpoints</summary>

- AUTH
    - REGISTER

            POST http://localhost:3000/auth/register
        body:
        ``` js
            {
                "nombre": "Lucas",
                "apellidos": "Hernandez",
                "email": "lucas@lucas.com",
                "password": "12345678"
            }
        ```

    - LOGIN

            POST http://localhost:3000/auth/login  
        body:
        ``` js
            {
                "email": "bolso@gmail.com",
                "password": "bolso"
            }
        ```
- USERS
    - GET USER PROFILE (USE TOKEN)

            GET http://localhost:3000/users/profile

    - UPDATE USER (USE TOKEN)

            PUT http://localhost:3000/users/profile/update  
        body:
        ``` js
        {
            "nombre": "Luis",
            "apellidos": "Salerno",
            "edad": 35,
            "email": "luis@gmail.com",
            "telefono": 618560718,
            "password": "gallina"
        }
        ```
    - CHECK APPOINTMENTS PATIENT (USE TOKEN)

            GET http://localhost:3000/users/appointments/checkall

    - CHECK APPOINTMENTS DOCTOR (USE TOKEN)

            GET http://localhost:3000/users/appointments/checkall/doctor  

    - SHOW ALL PATIENTS AS ADMIN (USE TOKEN)

            GET http://localhost:3000/users/profile/checkallpatients  

    - SHOW ALL DOCTORS AS ADMIN (USE TOKEN)

            GET http://localhost:3000/users/profile/checkalldoctors  

</details>

## Contribuciones
Las sugerencias y aportaciones son siempre bienvenidas.  

Puedes hacerlo de dos maneras:

1. Abriendo una issue
2. Crea un fork del repositorio
    - Crea una nueva rama  
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Haz un commit con tus cambios 
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Haz push a la rama 
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Abre una solicitud de Pull Request