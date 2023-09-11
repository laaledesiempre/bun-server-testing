// console.log("Hello via Bun!"); --> default message on init

import { Database } from 'bun:sqlite'

const db = new Database(":memory:");

const PORT = 3000

db.query(`create table testing (
    id interger primary key not null,
    name text not null);`
)

// Server declaration

const server = Bun.serve({ // Bun in uppercase
  port: PORT,

  // Server routing tree

  fetch(req) {

    const url = new URL(req.url) // URL parser
    console.log("request get is a " + req.method)
    // GET
    if (req.method == "GET") {
      if (url.pathname == "/api/perros") {
        const database = db.query(`select * from testing`)
        console.log("get made")
        return new Response(JSON.parse(database))
      }
    }
    // POST 
    else if (req.method == "POST") {
      if (url.pathname == "/api/perros") {
        const { name } = req.body
        db.query(`insert into testing (name) values (?)`, [name])
        console.log("post made")
        return new Response(`Inserted ${name} on table`)
      }
    }
    // 404
    else {
      return new Response(`404 ${url.pathname} not found on server`, { status: 404 })
    }
  }
}
)

// Default server message
console.log(`Server Runing on port ${PORT}`)
