const db = require('../../data/dbConfig')

module.exports = {
    insert,
    update,
    remove,
    get,
}

function get() {
  return db('cars')
}

async function insert(cars) {
  const [id] = await db("cars")
    .insert(cars)
  return db("cars")
    .where({id})
    .first()  
}

async function update(id, changes) {
  return db("cars").update(changes)
    .where({id})
}

function remove(id) {
  return db("cars").where(id).del()
}