# DynoStream

DynoStream es una aplicación de streaming de vídeo que permite disfrutar de una gran variedad de contenidos multimedia en un solo lugar. Este repositorio contiene el código fuente de la aplicación, dividido en dos carpetas principales: `back` para el backend (Servidor) y `front` para el frontend (Cliente).

## Caracteristicas

- Acceso a una amplia biblioteca de películas, series y documentales.
- Interfaz intuitiva y fácil de usar.
- Categorización de contenidos para una mejor experiencia de navegación.
- Compatibilidad con múltiples dispositivos, incluidos ordenadores de sobremesa, tabletas y dispositivos móviles.

## Clonar y Correr Proyecto Localmente

Para clonar y ejecutar el proyecto localmente, siga estos pasos:

1. Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/joanromerodev/dynostream-app.git
```

2. Instala las dependencias del backend:

```bash
cd back
npm install
```

3. Inicia el servidor de desarrollo:

``bash
npm run dev

```

4. Abre otro terminal y navega hasta la carpeta **front**.

``bash
cd ../front
```

5. Actualiza la url local en la carpeta front. Ve y busca cada petición de axios y actualiza la url actual con para que puedas replicar **http://localhost:1818**

6. Inicia la aplicación Frontend

```bash
npm run dev
```

## **IMPORTANTE** Acceso de Usuarios

Hay 4 usuarios de prueba. Escribiré sus cuentas, contraseñas y ámbitos.

1. Usuario con todos los accesos - Plan Premium - (puede ver todas las categorías y películas):

**Correo electrónico:** jromero@dynostream.com
**Contraseña** 12345

2. Usuario con acceso limitado - Plan Estándar - (puede ver sólo algunas categorías y películas):

**Correo electrónico:** sking@dynostream.com
**Contraseña** sking123

3. Usuario con acceso limitado - Plan Básico - (puede ver sólo una categoría y algunas películas):

**Correo electrónico:** bgates@dynostream.com
**Contraseña** bgates123

4. 4. Usuario sin acceso - Plan Atrasado - (No puede acceder. Se desconecta automáticamente):

**Correo electrónico:** emusk@dynostream.com
**Contraseña** emusk123

Ya está todo listo. Ahora puede acceder a la aplicación localmente desde su navegador visitando **Para backend (Servidor): http://localhost:1818. Para el frontend (Cliente): http://localhost:5173**

## Acceso a la nube

Además de ejecutar la aplicación localmente, también puede acceder a la versión en la nube de DynoStream a través del siguiente enlace: [DynoStream](https://dynostream.joanromerodev.com/).

¡Disfrute de la experiencia de streaming con DynoStream!
