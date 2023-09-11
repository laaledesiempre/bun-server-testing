// console.log("Hello via Bun!"); --> default message on init

import { Database } from 'bun:sqlite'

const db = new Database(":memory:");

const PORT = 3000

db.query(`CREATE TABLE IF NOT EXISTS testing(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL);`
).get()

// Server declaration

const server = Bun.serve({ // Bun in uppercase
  port: PORT,

  // Server routing tree

  async fetch(req) {

    const url = new URL(req.url) // URL parser
    console.log("request get is a " + req.method)
    // GET
    if (req.method == "GET") {
      if (url.pathname == "/api/perros") {
        const database = db.prepare(`select * from testing`).all()
        console.log("get made")
        console.log(database)
        //return new Response(JSON.parse(database))
      }
    }
    // POST 
    else if (req.method == "POST") {
      if (url.pathname == "/api/perros") {
        const { name } = await req.json()
        console.log(name)
        db.query(`insert into testing (name) values ( $name )`).get({$name: name})
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
