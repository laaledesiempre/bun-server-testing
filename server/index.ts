// console.log("Hello via Bun!"); --> default message on init

import { Database } from 'bun:sqlite'

const db = new Database(":memory:");  // Creates a on memory database that ends with process

const PORT = 3000

db.query(`CREATE TABLE IF NOT EXISTS testing(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL);`
).run() // run method is necesary, without this it doesnt excecute without run/get/all

// Server declaration

const server = Bun.serve({ // Bun in uppercase
  port: PORT,

  // Server routing tree

  async fetch(req) {

    const url = new URL(req.url) // URL parser

    // This way you can see request method
    console.log("new request, Request method is :" + req.method)

    // You can route with nested if statements
    // GET
    if (req.method == "GET") {

      if (url.pathname == "/api/perros") { // Endpoints declaration 
        const database = db.prepare(`select * from testing`).all() // Gets database content
        const parsedData = JSON.stringify(database) // turn into json
        return new Response(parsedData) // and return a Response object
      }
    }
    // POST 
    else if (req.method == "POST") {

      if (url.pathname == "/api/perros") {
        const { name } = await req.json()
        db.query(`insert into testing (name) values ( $name )`).run({ $name: name }) // This is something strange, i feel strange with this syntax but, not bad. 
        return new Response(`Inserted ${name} on table`)
      }
    }
    // 404
    else {
      return new Response(`404 ${url.pathname} not found on server`, { status: 404 }) // This looks really fine on browser
    }
  }
}
)

// Default server message
console.log(`Server Runing on port ${PORT}`)
