const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");
const supertest = require("supertest")

const Tesla = { name: "Tesla" };
const Mustang = { name: "Mustang" };
beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db("cars").truncate();
});
afterAll(async () => {
    await db.destroy();
});

describe("server", () => {
    describe("[POST] /cars", () => {
        it("responds with new cars db", async () => {
            let res = await request(server).post("/cars").send(Tesla);
            expect(res.statusCode).toBe(201)
            expect(res.body).toMatchObject({ id: 1, ...Tesla });
            res = await request(server).post("/cars").send(Mustang);
            expect(res.body).toMatchObject({ id: 2, ...Mustang });
        });
    });
    describe("[DELETE] /cars", () => {
        it("deletes cars", async () => {
            let res = await request(server).post("/cars").send(Tesla);
            expect(res.body).toMatchObject({ id: 1, ...Tesla });
            const newRes = await supertest(server).delete("/chars/1")
            expect(newRes.statusCode).toBe(201)
        });
    });
});