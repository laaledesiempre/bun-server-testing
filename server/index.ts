// console.log("Hello via Bun!"); --> default message on init

import {Database} from 'bun:sqlite'

const db = new Database(":memory:");

db.query(`create table testing (
    id interger primary key not null,
    name text not null);`
)

serve= Bun.serve({ // Bun in uppercase
    port: 3000,
    fetch(req) {

        const url = new URL(req.url)

// GET
        if (url.method == "GET") {
            if (url.pathname == "/api/perros") {
                const database = db.query(`select * from testing`)
                return new Response(JSON.parse(database))
            }
        }
// POST 
        else if (url.method == "POST") {
            if (url.pathname == "/api/perros") {
                const {name} = req.body
                db.query(`insert into testing (name) values (?)`,[name])
                return new Response(`Inserted ${name} on table`)
            }
        }
// 404
        else {
            return new Response(`404 ${url.pathname} not found on server`, {status: 404})
        }

    }
}
)