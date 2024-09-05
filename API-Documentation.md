# *Documentación para los Endpoints* de la aplicación "Joc de Daus"

## Endpoints Player

### GET /players

* Descripción: Obtiene todos los usuarios que no han sido eliminados.
* Requiere Token: No
* Parámetros de Consulta:
  - Ninguno

- Respuesta Exitosa:
  - Código: 200 OK
  - Cuerpo:

```
[
  {
  
  },
  {

  },
]
```

* Errores posibles:
  * 500 Internal Server Error – Error en el servidor al obtener los usuarios.
  * 404 Resource not found – Usuarios no encontrados

### GET /players/:id

* Descripción: Obtiene un usuario específico por su ID.
* Requiere Token: No
* Parámetros de Ruta:

  * playerId (number): ID del usuario a buscar.
* Respuesta Exitosa:

  * Código: 200 OK
  * Cuerpo:

    ```
    {}
    ```
* Errores posibles:

  * 500 Internal Server Error – Error en el servidor al obtener los usuarios.
  * 404 Resource Not Found – Usuario no encontrado
  * 400 Bad Request – Datos de entrada no válidos

### POST /players

* Descripción: Crea un nuevo usuario.
* Requiere Token: No
* Parámetros del Cuerpo:

  ```
  {}
  ```
* Respuesta Exitosa:

  * Código: 201 Created
  * Cuerpo:

    ```
    {}
    ```
* Errores posibles:

  * 400 Bad Request – Datos de entrada no válidos
  * 500 Internal Server Error – Error en el servidor al crear el usuario.

### PUT /players/:id

* Descripción: Actualiza los detalles de un usuario específico.
* Requiere Token: No
* Parámetros de Ruta:

  * playerId (number): ID del usuario a actualizar.
* Parámetros del Cuerpo: Campos del usuario a actualizar, por ejemplo:

  ```
  {}
  ```
* Respuesta Exitosa:

  * Código: 200 OK
  * Cuerpo:

    ```
    {}
    ```
* Errores posibles:

  * 404 Not Found – Usuario no encontrado.
  * 400 Bad Request – Datos de entrada no válidos
  * 500 Internal Server Error – Error en el servidor al actualizar el usuario.

## Endpoints Games

### GET /playerGames/:id

### POST /playerGames/:id

### DELETE /playerGames/:id

## Endpoints Rankings

### GET /ranking

### GET /loser

### GET /winner
