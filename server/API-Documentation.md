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
    "id": "1",
    "name": "User-1",
    "register_date": "1725827223933"
  },
  {
    "id": "2",
    "name": "User-2",
    "register_date": "1725827223934"
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
      "id": "1",
      "name": "User-1
      "register_date": "1725827223933"
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
      "id": "1",
      "name": "User-1
      "register_date": "1725827223933"
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
      "id": "1",
      "name": "User-1-Updated",
      "register_date": "1725827223933"
    },
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
    {
      {
        "dice1Result": 3,
        "dice2Result": 2,
        "overallResult": "Loss"
      },
      {
        "dice1Result": 4,
        "dice2Result": 3,
        "overallResult": "Win"
      }
    }
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
      "dice1Result": 4,
      "dice2Result": 3,
      "overallResult": "Win"
    }
    ```

- Errores posibles:

  - 400 Bad Request – Datos de entrada no válidos
  - 500 Internal Server Error – Error en el servidor al crear el usuario.

### DELETE /playerGames/:id

- Descripción: Marca a un usuario como eliminado.
- Requiere Token: No
- Parámetros de Ruta:
  - playerId (string): ID del usuario a eliminar.
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
    "playerId": 1,
    "totalGames": 10,
    "totalWins": 2,
    "totalLost": 8,
    "winPercentage": 20.0
  },
  {
    "playerId": 2,
    "totalGames": 10,
    "totalWins": 8,
    "totalLost": 2,
    "winPercentage": 80.0
  },
  {
    "playerId": 3,
    "totalGames": 10,
    "totalWins": 5,
    "totalLost": 5,
    "winPercentage": 50.0
  },
  {
    "playerId": 4,
    "totalGames": 10,
    "totalWins": 4,
    "totalLost": 6,
    "winPercentage": 40.0
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
  "playerId": 1,
  "totalGames": 10,
  "totalWins": 2,
  "totalLost": 8,
  "winPercentage": 20.0
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
  "playerId": 2,
  "totalGames": 10,
  "totalWins": 8,
  "totalLost": 2,
  "winPercentage": 80.0
}
```

- Errores posibles:
  - 500 Internal Server Error – Error en el servidor al obtener el ranking.
  - 404 Resource not found – Ranking no encontrado.
