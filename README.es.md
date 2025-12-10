# Lista de Contactos en React — Multiusuario con CRUD de Contactos

Este proyecto es una aplicación de **gestión de contactos por usuario** desarrollada con **React**, donde puedes seleccionar un usuario existente o crear uno nuevo automáticamente, y luego añadir, editar, eliminar o visualizar contactos asociados a ese usuario.

---

## Detalles importantes

- Toda la aplicación se renderiza dinámicamente mediante **componentes de React**.
- Se utiliza **`useState`** y un **reducer global** (`useGlobalReducer`) para gestionar:
  - Usuario activo.
  - Lista de contactos del usuario.
  - Mensajes de estado y errores.
  - Datos temporales para edición de contactos.
- La aplicación se conecta con una **API REST** que crea automáticamente una nueva agenda si el usuario ingresado no existe.
- El diseño utiliza **CSS personalizado**, con estilo oscuro y bordes en color salmón.

---

## Funcionalidades principales

### 1. Seleccionar o crear usuario
- Al iniciar, se solicita el **nombre del usuario**.
- Si el nombre **existe**, se carga su agenda de contactos.
- Si el nombre **no existe**, se crea automáticamente una nueva agenda para ese usuario.
- Se muestran mensajes temporales confirmando si el usuario fue creado o si no se ingresó ningún nombre.

### 2. Añadir contactos
- El usuario puede completar un formulario con:
  - Nombre
  - Teléfono
  - Dirección
  - Email
- Al añadir un contacto:
  - Se agrega a la agenda del usuario activo.
  - El formulario se limpia automáticamente.
  - Si algún campo está vacío, se muestra un mensaje temporal de error.

### 3. Editar contactos
- Cada contacto incluye un botón **"Editar"** que carga sus datos en el formulario.
- Al enviar la edición:
  - Se actualiza el contacto en la lista.
  - Se muestra un mensaje de confirmación temporal.

### 4. Eliminar contactos individuales
- Cada contacto tiene un botón **"Borrar"**.
- Al borrar un contacto:
  - Se elimina de la lista del usuario activo.
  - Aparece un mensaje temporal confirmando la eliminación.

### 5. Ver detalles de un contacto
- Al hacer clic en un contacto se abre un **panel de detalles**:
  - Imagen aleatoria asociada al ID del contacto.
  - Información completa: nombre, email, teléfono y dirección.
  - Botones para **editar** o **borrar** desde el panel.

### 6. Mensajes de estado
- Aparecen mensajes temporales al crear usuario, añadir, editar o borrar contactos.
- Ejemplos:
  - `noUser` → usuario no ingresado.
  - `notFound` → usuario no encontrado (se crea automáticamente).
  - `contactCreated`, `contactUpdated`, `contactDeleted` → acciones sobre contactos.
- Los mensajes desaparecen automáticamente tras unos segundos.

---

## Cómo usar la aplicación

1. Ingresa tu **nombre de usuario**:
   - Si existe, carga su agenda.
   - Si no existe, se crea automáticamente.
2. Visualiza la lista de contactos de ese usuario.
3. Añade un contacto completando el formulario y pulsando **Enviar**.
4. Edita un contacto usando el botón **Editar**.
5. Borra un contacto con el botón **Borrar**.
6. Haz clic en un contacto para ver sus **detalles completos**.

---

## Posibles mejoras 

- Añadir búsqueda y filtros dentro de la agenda.
- Añadir paginación para evitar muchos contactos en pantalla.
- Posibilidad de subir fotos personalizadas para cada contacto.
- Añadir annimaciones.