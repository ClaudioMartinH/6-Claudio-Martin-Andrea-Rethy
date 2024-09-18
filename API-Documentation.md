# _Documentación para los Endpoints_ de la aplicación "Joc de Daus"

## Endpoints Authentication

### POST /authentication

- Descripción: Comprueba si el usuario existe y retorna un token
- Requiere Token: No
- Parámetros de Ruta:
  - playerName (string): Nombre del usuario a buscar.
  - Cuerpo:

    ```json
    {
      "playerName": "test-user"
    }
    ```
- Respuesta Exitosa:
  - Código: 200 OK
  - Cuerpo:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjY2NDgzNDEsImV4cCI6MTcyNjY1MTk0MX0.GaHPieNJJbtMnnnw1cmhgkSENfVGXICff1V3kpqQCHg",
      "playerName": "test-user",
      "id": 92
    }
    ```
- Errores posibles:
  - 500 Internal Server Error – Error en el servidor al obtener los usuarios.
  - 404 Resource Not Found – Usuario no encontrado
  - 400 Bad Request – Datos de entrada no válidos
  - 401 Unauthorized

### POST /guest

- Descripción: Crea un usuario anonimo y retorna un token
- Requiere Token: No
- Parámetros de la consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjY2NDgzNDEsImV4cCI6MTcyNjY1MTk0MX0.GaHPieNJJbtMnnnw1cmhgkSENfVGXICff1V3kpqQCHg",
      "playerName": "ANONIM_1726647752790",
      "id": 92
    }
    ```
- Errores posibles:

  - 500 Internal Server Error – Error en el servidor al obtener los usuarios.
  - 404 Resource Not Found – Usuario no encontrado
  - 400 Bad Request – Datos de entrada no válidos

## Endpoints Player

### GET /players

- Descripción: Obtiene todos los usuarios que no han sido eliminados.
- Requiere Token: Sí
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```json
[
  {
    "id": 88,
    "name": "Andrea",
    "register_date": "2024-09-09T16:15:40.905Z"
  },
  {
    "id": 89,
    "name": "Claudio",
    "register_date": "2024-09-09T16:15:40.966Z"
  },
  {
    "id": 90,
    "name": "johndoe",
    "register_date": "2024-09-12T14:47:45.719Z"
  }
]
```

- Errores posibles:
  - 500 Internal Server Error – Error en el servidor al obtener los usuarios.
  - 404 Resource not found – Usuarios no encontrados
  - 403 Forbidden - Token no valido

### GET /players/:id

- Descripción: Obtiene un usuario específico por su ID.
- Requiere Token: Sí
- Parámetros de Ruta:

  - playerId (number): ID del usuario a buscar.
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

    ```json
    {
        "id": 90,
        "name": "johndoe",
        "register_date": "2024-09-12T14:47:45.719Z"
      }
    ```
- Errores posibles:

  - 500 Internal Server Error – Error en el servidor al obtener los usuarios.
  - 404 Resource Not Found – Usuario no encontrado
  - 400 Bad Request – Datos de entrada no válidos
  - 403 Forbidden - Token no valido

### GET /players/name/:name

- Descripción: Obtiene un usuario específico por su ID.
- Requiere Token: Sí
- Parámetros de Ruta:

  - name (string): nombre del usuario a buscar.
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

    ```json
    {
    "id": 92,
    "name": "test-user",
    "register_date": "2024-09-12T17:33:08.326Z"
    }
    ```

    ```

    ```
- Errores posibles:

  - 500 Internal Server Error – Error en el servidor al obtener los usuarios.
  - 404 Resource Not Found – Usuario no encontrado
  - 400 Bad Request – Datos de entrada no válidos
  - 403 Forbidden - Token no valido

### POST /players

- Descripción: Crea un nuevo usuario.
- Requiere Token: No
- Parámetros del Cuerpo:

  ```json
  {
   "name": "User-1",
  }
  ```
- Respuesta Exitosa:

  - Código: 201 Created
  - Cuerpo:

    ```json
    {
      "id": 91,
      "name": "johndoe-2",
      "register_date": "2024-09-12T15:18:17.490Z"
    }
    ```
- Errores posibles:

  - 400 Bad Request – Datos de entrada no válidos
  - 500 Internal Server Error – Error en el servidor al crear el usuario.

### PUT /players/:id

- Descripción: Actualiza los detalles de un usuario específico.
- Requiere Token: Sí
- Parámetros de Ruta:

  - playerId (number): ID del usuario a actualizar.
- Parámetros del Cuerpo: Campos del usuario a actualizar, por ejemplo:

  ```MD
  {
    "name": "User-1-Updated",
  }
  ```
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

    ```MD
    {
      "id": 89,
      "name": "User-1-Updated",
      "register_date": "2024-09-09T16:15:40.966Z"
    }
    ```
- Errores posibles:

  - 404 Not Found – Usuario no encontrado.
  - 400 Bad Request – Datos de entrada no válidos
  - 500 Internal Server Error – Error en el servidor al actualizar el usuario
  - 403 Forbidden - Token no valido

## Endpoints Games

### GET /playerGames/:id

- Descripción: Obtiene las tiradas de un usuario específico por su ID.
- Requiere Token: Sí
- Parámetros de Ruta:

  - playerId (number): ID del usuario
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

    ```json
    [
      {
        "id": 27,
        "playerId": 1,
        "dice1Result": 5,
        "dice2Result": 1,
        "overallResult": "Loose"
      },
      {
        "id": 28,
        "playerId": 1,
        "dice1Result": 4,
        "dice2Result": 3,
        "overallResult": "Win"
      }
    ]
    ```
- Errores posibles:

  - 500 Internal Server Error – Error en el servidor al obtener las tiradas del usuario.
  - 404 Resource Not Found – Usuario no encontrado
  - 400 Bad Request – Datos de entrada no válidos
  - 403 Forbidden - Token no valido

### POST /playerGames/:id

- Descripción: Crea una nueva instancia de tirada del usuario.
- Requiere Token: Sí
- Parámetros de Ruta:

  - playerId (number): ID del usuario
- Parámetros del Cuerpo:

  ```json
  {
      "playerId" : 1,
      "dice1Result": 4,
      "dice2Result": 3,
      "overallResult": "Win"
  }
  ```
- Respuesta Exitosa:

  - Código: 201 Created
  - Cuerpo:

    ```json
    {
      "id": 28,
      "playerId": 1,
      "dice1Result": 4,
      "dice2Result": 3,
      "overallResult": "Win"
    }
    ```
- Errores posibles:

  - 400 Bad Request – Datos de entrada no válidos
  - 500 Internal Server Error – Error en el servidor al crear el usuario
  - 403 Forbidden - Token no valido

### DELETE /playerGames/:id

- Descripción: Marca a los juegos de un usuario como eliminado.
- Requiere Token: Sí
- Parámetros de Ruta:
  - playerId (string): ID del usuario
- Respuesta Exitosa:
  - Código: 200 OK
  - Cuerpo:

```json
{ "message": "Game deleted successfully" }
```

- Errores posibles:

  - 404 Not Found – Usuario no encontrado.
  - 400 Bad Request – Datos de entrada no válidos
  - 500 Internal Server Error – Error en el servidor al actualizar el usuario
  - 403 Forbidden - Token no valido

## Endpoints Rankings

### GET /ranking

- Descripción: Obtiene todos los rankings de los usuarios que no han sido eliminados.
- Requiere Token: Sí
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```json
[
  {
    "id": 75,
    "playerId": 89,
    "totalGames": 1,
    "totalWins": 0,
    "totalLost": 1,
    "winPercentage": 0
  },
  {
    "id": 74,
    "playerId": 88,
    "totalGames": 1,
    "totalWins": 1,
    "totalLost": 0,
    "winPercentage": 100
  }
]
```

- Errores posibles:
  - 500 Internal Server Error – Error en el servidor al obtener los rankings
  - 404 Resource not found – Rankings no encontrados
  - 403 Forbidden - Token no valido

### GET /loser

- Descripción: Obtiene los datos del peor ranking y el usuario relacionado.
- Requiere Token: Sí
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```json
{
  "id": 75,
  "playerId": 89,
  "totalGames": 1,
  "totalWins": 0,
  "totalLost": 1,
  "winPercentage": 0
}
```

- Errores posibles:
  - 500 Internal Server Error – Error en el servidor al obtener el ranking
  - 404 Resource not found – Ranking no encontrado
  - 403 Forbidden - Token no valido

### GET /winner

- Descripción: Obtiene los datos del mejor ranking y el usuario relacionado.
- Requiere Token: Sí
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```json
{
  "id": 74,
  "playerId": 88,
  "totalGames": 1,
  "totalWins": 1,
  "totalLost": 0,
  "winPercentage": 100
}
```

- Errores posibles:
  - 500 Internal Server Error – Error en el servidor al obtener el ranking
  - 404 Resource not found – Ranking no encontrado
  - 403 Forbidden - Token no valido
