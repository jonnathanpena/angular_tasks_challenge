# Angular Tasks Challenge
___

El reto contempla las siguientes tecnologías:

- `Angular 17`: Se usó la plantilla proporcionada por Atom para este desarrollo, específicamente la de Angular 17.
- `Typescript`: Tanto para backend como para frontend se usó Typescript.
- `Material-UI`: Para los aspectos visuales se usó Material-UI de Angular, permitiendo hacer el desarrollo más estandarizado y rápido.
- `Node + Express`: Se usó para servir la API Rest full del backend.
- `Firebase functions`: Como framework para el despliegue de la aplicación backend se utilizó firebase functions.
- `Firebase firestore`: Tecnología para almacenar la información, en este caso de los usuarios y las tareas.
- `jest`: Para los test en backend.
- `Firebase hosting`: Fue el lugar donde se alojó la aplicación frontend.

## 1. Diseño

**Frontend**
En cuanto al frontend se utilizó Angular 17 porque era uno de los requisitos solicitados para la prueba, en cuanto a la arquitectura encontramos:
- `Patrón facade`
Muy implementado para las consultas a la API desde el frontend, haciendo mucho más legible el código.
- `Patrón Atomic Design`
Se implementó en los componentes, para que sean reutilizables, que comprende:
  - Átomos: Componentes básicos como botones, headers, ...
  - Moléculas: Combinación de átomos para crear otros componentes (como el ejemplo de los forms).
  - Organismos: Combinación de moléculas para crear vístas o módulos.
  - Templates: Se construyó solo uno que contiene dos children, que en tal caso son login y las tasks.
- `Patrón state managment`
En este proyecto se puso en manifiesto con el login, donde se almacena un estado de "isLoggedIn" para saber si el usuario está logeado o no.
- `Patrón observer`
Propio de Angular para subscribirse a la respuesta de un endpoint, adicional se le agregaron pipes para poder desuscribire una vez reciba la primera consulta, así se previenen "memory leaks".
- `Patrón interceptor`
Se usó en dos partes, en la respuesta del login/crear usuario, para manejar el "loggedIn" y en el HTTP para poner el bearer token en el header siempre que esté logeado el usuario.
- `Patrón interface`
Es bueno a las respuestas, clases, modelos y demás ponerle la interface para hacer comprensivo el código.
- `Singleton`
El mejor ejemplo es el del SCSS poniendo los estilos en lugares donde tengan una sola responsabilidad, evitando que se propagen estilos por toda la aplicación.

**Backend**
En cuanto a backend, se usó express y la siguiente arquitectura general:
- `MVC Pattern`
Se crearon los modelos, las vistas y los controladores de las endpoints para tener orden en codigficación.
- `Singleton Pattern`
Sobre todo en la conexión a la base de datos, esto permite que solo una entidad se encargue de eso.
- `Repository Pattern`
Los DAO hacen que se tenga acceso a cada colección de la base de datos a través de una instancia, haciendo más escalable la aplicación-
- `Middleware Pattern`
Se usaron para los casos de validación de inputs (email users) y autenticación (endpoints que por su naturaleza deben ser usadas solo por usuarios loggeados).
- `Factory Patterb`
Se creó el servicio de JWT como un proveedor estilo factory.


## 2. ¿Qué se hizo?

Una web app que consta de dos páginas o pantallas principales, login y tareas. El comportamiento según lo solicitado es el siguiente:
- Siempre vas a login como página por default.
- Pones el email asociado a la plataforma o el que quieras que se cree. Luego de darle click al botón entrar suele aparecer dos opciones:
  - Si el usuario está previamente creado pasa a la pantalla de tasks con un token de autenticacion y se cambia el estado de loggedIn por true.
  - Si el usuario no está registrado con ese correo, le sale un modal consultando si desea crear una cuenta con ese email, si acepta crea el usuario y pasa el step antes mecionado, caso contrario se cierra el modal y el usuario sigue quedando en la pantalla de login.
- Dentro de la pantalla de tareas, se pueden crear, ver y modificar tareas en un Kanban que permite visualizar en ónde se encuentra cada tarea, las acciones de las cards de tareas en el Kanban tienen las siguientes funcionalidades:
  - Borrar la task.
  - Modificar su estado (por menu o drag and drop).
  - Modificar los datos de la tarea.
- La plataforma tiene un header con un botón de logout solo si fuera el caso.

## 3. ¿Cómo levantar la aplicación en local?

**Frontend**
Para frontend se debe clorar el repositorio, luego ir a la carpeta de `frontend` para luego hacer `npm install` y luego `ng serve -o` la terminal indicará que está levantada la plataforma en un puerto específio. No se requieren variables de entorno.

**Backend**
Para el backend tenemos que clorar el repositorio, luego dirigirnos a la carpeta `backend` correr el comando `npm installl` al igual que irse a la carpeta `backend/functions`, de nuevo `npm install`; en este caso corresponde desplegarlo localmente con firebase, para ello debemos:
1. Crear el archivo `.env` en `backend/functions`.
2. Poner los valores referentes (en el correo paso estas variables porque son datos sensibles).
3. Ir a la carpeta `backend/functions`.
4. Correr el script `npm install`.
5. Correr el script `npm run build`.
6. Correr el script `npm run deploy` (se necesita para que el backend coja los valores del `.env`).
7. Correr el script `npm run serve` para que pueda levantarse en local la aplicación (saldrá en la terminal en que URL se puede acceder al backend).

