# Cotonijo API

Projektuppgift Fördjupad Frontend-utveckling

## Bakgrund

Det här är ena delen av projektuppgiften för Fördjupad Frontend-utveckling.  
Uppgiften går ut på att skapa en klientapplikation som låter en användare recensera saker (med full CRUD-funktionalitet naturligtvis). Applikationen ska konsumera ett externt API.

Jag har valt att göra en applikation som konsumerar ett API som listar olika länder med diverse fakta, där användare kan recensera sina resmål. Det API jag skapade hanterar användarna och recensionerna.

## Om API:et

Det är skapat i Fastify mot en MySQL-databas. Nedan följer en lista av verktyg som använts i processen:

-   Fastify
-   @fastify/cors
-   @fastify/cookie: för att sätta httpOnly cookies från backend
-   Prisma och @prisma/client: ORM
-   ajv-errors: för anpassade felmeddelanden i Options
-   bcrypt: hashning av lösenord
-   jsonwebtoken
-   dotenv
-   nodemon: för utvecklingsserver

Installera projektet med `npm install` och fyll i en .env-fil med samma fält som finns i .env-sample.

För att snabbt generera en jwt secret key kan man köra `require("crypto").randomBytes(32).toString("hex");` rakt i sin node JS-miljö.

### Bra att veta

Recensionerna hänvisar länder i form av ccn3-koderna från det externa API:et. Varje ccn3-kod hänvisar till ett specifikt land. Koderna är alltid 3-siffriga.

Användare kan endast uppdatera eller radera recensioner de själva har skapat.

## Endpoints

| Metod  | Endpoint               | Beskrivning                                   | Kräver autentisering |
| ------ | ---------------------- | --------------------------------------------- | -------------------- |
| GET    |  /                     | Välkomstroute                                 | Nej                  |
| GET    | /users                 | Hämta alla användare                          | Nej                  |
| GET    | /users/:id             | Hämta enskild användare med ID                | Nej                  |
| POST   | /signup                | Skapa en ny användare                         | Nej                  |
| POST   | /login                 | Logga in befintlig användare                  | Nej                  |
| POST   | /logout                | Logga ut befintlig användare                  | Nej                  |
| PUT    | /users/:id             | Uppdatera användare                           | Ja                   |
| DELETE | /users/:id             | Radera en användare                           | Ja                   |
| GET    | /reviews               | Hämtar alla recensioner                       | Nej                  |
| GET    | /users/:id/reviews     | Hämtar alla recensioner av specifik användare | Nej                  |
|  GET   | /reviews/country/:ccn3 | Hämtar alla recensioner av land               | Nej                  |
| GET    | /reviews/:id           | Hämtar enskild recension med ID               | Nej                  |
| POST   | /reviews               | Skapa ny recension                            |  Ja                  |
|  PUT   | /reviews/:id           | Uppdatera recension                           | Ja                   |
| DELETE | /reviews/:id           | Radera recension                              | Ja                   |

### Exempel

Ett exempelsvar från /reviews/:id kan se ut såhär:

```
{
    "id": 6,
    "content": "Fantastiskt land med vacker natur!",
    "rating": 5,
    "ccn3": "048",
    "posted": "2024-03-11T00:00:00.000Z",
    "author": {
      "id": 7,
      "fullName": "Saga Einarsdotter Kikajon",
      "username": "sagaeinkik"
    }
}
```
