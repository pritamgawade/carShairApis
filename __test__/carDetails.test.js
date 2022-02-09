const app = require('../src/app');
const request = require("supertest");

const server = app.listen();

afterAll(() => server.close());

describe("Car details API", () => {
    test("Should return all makes", (done) => {
        request(app)
            .get('/getAll')
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Should return all models for provided make and year", (done) => {
        request(app)
            .get('/getAllModels/make/Honda/modelyear/2002')
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Should return vehical details for given valid VIN", (done) => {
        request(app)
            .get('/getDetails/3VWRF29M1XM114004')
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
    });

    test("Should return status code 404 for invalid VIN", (done) => {
        request(app)
            .get('/getDetails/aaaaa')
            .then((response) => {
                expect(response.status).toBe(404);
                done();
            });
    });
});