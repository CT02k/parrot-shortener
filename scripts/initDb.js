const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const db = open({
  filename: "./db.sqlite",
  driver: sqlite3.Database,
}).then((db) => {
  db.exec(`
      CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        short TEXT UNIQUE,
        url TEXT
    )
  `);
});