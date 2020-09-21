const request = require('supertest');
const { app } = require('./app');

describe('GET /snake/leaderboard', () => {
    it('returns an array of objects of scores', (done) => {
        request(app)
            .get('/snake/leaderboard')
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;
                
                expect(status).toBe(200);
                expect(Array.isArray(body)).toBe(true);
                done();
            });
    });
});

describe('POST /snake/leaderboard', () => {
    it('returns an array of objects of submitted score', (done) => {
        request(app)
            .post('/snake/leaderboard')
            .send({ username: 'AAA', score: 200 })
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;
                
                expect(status).toBe(201);
                expect(typeof(body)).toBe('object');
                expect(body.username).toBe('AAA');
                expect(body.score).toBe(200);
                done();
            });
    });
});

describe('GET /snake/leaderboard', () => {
    it('returns an array of objects of scores', (done) => {
        request(app)
            .get('/snake/leaderboard')
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response;
                
                expect(status).toBe(200);
                expect(Array.isArray(body)).toBe(true);
                body.forEach(score => {
                    expect(typeof score).toBe('object');
                    expect(typeof score.username).toBe('string');
                    expect(typeof score.score).toBe('number');
                });
                done();
            });
    });
});
