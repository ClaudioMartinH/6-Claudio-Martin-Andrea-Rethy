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

* Descripción: Obtiene las tiradas de un usuario específico por su ID.
* Requiere Token: No
* Parámetros de Ruta:
  * playerId (number): ID del usuario
* Respuesta Exitosa:
  * Código: 200 OK
  * Cuerpo:

    ```
    {}
    ```
* Errores posibles:
  * 500 Internal Server Error – Error en el servidor al obtener las tiradas del usuario.
  * 404 Resource Not Found – Usuario no encontrado
  * 400 Bad Request – Datos de entrada no válidos

### POST /playerGames/:id

* Descripción: Crea una nueva instancia de tirada del usuario.
* Requiere Token: No
* Parámetros de Ruta:

  * playerId (number): ID del usuario
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

### DELETE /playerGames/:id

* Descripción: Marca a un usuario como eliminado.
* Requiere Token: No
* Parámetros de Ruta:
  * playerId (string): ID del usuario a eliminar.
* Respuesta Exitosa:
  * Código: 200 OK
  * Cuerpo:

```
{ "message": "Game deleted successfully" }
```

* Errores posibles:

  * 404 Not Found – Usuario no encontrado.
  * 400 Bad Request – Datos de entrada no válidos
  * 500 Internal Server Error – Error en el servidor al actualizar el usuario.

## Endpoints Rankings

### GET /ranking

* Descripción: Obtiene todos los rankings de los usuarios que no han sido eliminados.
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
  * 500 Internal Server Error – Error en el servidor al obtener los rankings.
  * 404 Resource not found – Rankings no encontrados

### GET /loser

* Descripción: Obtiene los datos del peor ranking y el usuario relacionado.
* Requiere Token: No
* Parámetros de Consulta:
  - Ninguno

- Respuesta Exitosa:
  - Código: 200 OK
  - Cuerpo:

```
{}
```

* Errores posibles:
  * 500 Internal Server Error – Error en el servidor al obtener el ranking.
  * 404 Resource not found – Ranking no encontrado.

### GET /winner

* Descripción: Obtiene los datos del mejor ranking y el usuario relacionado.
* Requiere Token: No
* Parámetros de Consulta:
  - Ninguno

- Respuesta Exitosa:
  - Código: 200 OK
  - Cuerpo:

```
{}
```

* Errores posibles:
  * 500 Internal Server Error – Error en el servidor al obtener el ranking.
  * 404 Resource not found – Ranking no encontrado.
