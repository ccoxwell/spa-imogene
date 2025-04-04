const dbFile = './data/spa.db';
const sqlite3 = require('sqlite3').verbose()
const dbWrapper = require('sqlite')
let db;

dbWrapper.open({
    filename: dbFile,
    driver: sqlite3.Database
}).then(async function(dBase) {
    db = dBase;
    try {
        await db.run("CREATE TABLE IF NOT EXISTS Guests (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, status TEXT)")
    } catch (dbError) {
        console.error(dbError);
    }
})

module.exports = {
    getGuests: async function() {
        try {
            let guests = await db.all("SELECT * from Guests")
            return guests
        } catch(dbError) {
            console.error(dbError)
        }
    },
    addGuest: async function (name) {
        try {
            return await db.run(
                "INSERT INTO Guests (name, status) VALUES ( ? , 'present')", name
              );
        } catch(dbError) {
            console.error(dbError)
        }
    },
    removeGuest: async function(id) {
        try {
            return await db.run(
                "DELETE FROM Guests WHERE id = ?", id
            )
        } catch(dbError) {
            console.error(dbError);
        }
    }
}