var request = require("request");

describe("Test getMessages", () => {
    it("should return 200 OK", (done) => {
        request.get("http://127.0.0.1:3000/messages", (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it("should return Length of Response", (done) => {
        request.get("http://127.0.0.1:3000/messages", (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe("Test postMessage", () => {
    it("should return 200 OK", (done) => {
        request.post("http://127.0.0.1:3000/messages", (err, res) => {
            console.log(res.body);
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
})

describe("Test getMessage from a User", () => {

    it("should return 200 OK", (done) => {
        request.get("http://127.0.0.1:3000/messages/smit", (err, res) => {
            console.log(res.body);
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it("should return message by User", (done) => {
        request.get("http://127.0.0.1:3000/messages/smit", (err, res) => {
            console.log(res.body);
            expect(JSON.parse(res.body)[0].name).toEqual("smit");
            done()
        })
    })
})