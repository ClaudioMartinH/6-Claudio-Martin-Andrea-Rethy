# _Documentación para los Endpoints_ de la aplicación "Joc de Daus"

## Endpoints Player

### GET /players

- Descripción: Obtiene todos los usuarios que no han sido eliminados.
- Requiere Token: No
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```MD
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

### GET /players/:id

- Descripción: Obtiene un usuario específico por su ID.
- Requiere Token: No
- Parámetros de Ruta:

  - playerId (number): ID del usuario a buscar.
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

    ```MD
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

### POST /players

- Descripción: Crea un nuevo usuario.
- Requiere Token: No
- Parámetros del Cuerpo:

  ```MD
  {
   "name": "User-1",
  }
  ```
- Respuesta Exitosa:

  - Código: 201 Created
  - Cuerpo:

    ```MD
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
- Requiere Token: No
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
  - 500 Internal Server Error – Error en el servidor al actualizar el usuario.

## Endpoints Games

### GET /playerGames/:id

- Descripción: Obtiene las tiradas de un usuario específico por su ID.
- Requiere Token: No
- Parámetros de Ruta:

  - playerId (number): ID del usuario
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

    ```MD
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

### POST /playerGames/:id

- Descripción: Crea una nueva instancia de tirada del usuario.
- Requiere Token: No
- Parámetros de Ruta:

  - playerId (number): ID del usuario
- Parámetros del Cuerpo:

  ```MD
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

    ```MD
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
  - 500 Internal Server Error – Error en el servidor al crear el usuario.

### DELETE /playerGames/:id

- Descripción: Marca a los juegos de un usuario como eliminado.
- Requiere Token: No
- Parámetros de Ruta:
  - playerId (string): ID del usuario
- Respuesta Exitosa:
  - Código: 200 OK
  - Cuerpo:

```MD
{ "message": "Game deleted successfully" }
```

- Errores posibles:

  - 404 Not Found – Usuario no encontrado.
  - 400 Bad Request – Datos de entrada no válidos
  - 500 Internal Server Error – Error en el servidor al actualizar el usuario.

## Endpoints Rankings

### GET /ranking

- Descripción: Obtiene todos los rankings de los usuarios que no han sido eliminados.
- Requiere Token: No
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```MD
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
  - 500 Internal Server Error – Error en el servidor al obtener los rankings.
  - 404 Resource not found – Rankings no encontrados

### GET /loser

- Descripción: Obtiene los datos del peor ranking y el usuario relacionado.
- Requiere Token: No
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```MD
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
  - 500 Internal Server Error – Error en el servidor al obtener el ranking.
  - 404 Resource not found – Ranking no encontrado.

### GET /winner

- Descripción: Obtiene los datos del mejor ranking y el usuario relacionado.
- Requiere Token: No
- Parámetros de Consulta:

  - Ninguno
- Respuesta Exitosa:

  - Código: 200 OK
  - Cuerpo:

```MD
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
  - 500 Internal Server Error – Error en el servidor al obtener el ranking.
  - 404 Resource not found – Ranking no encontrado.
