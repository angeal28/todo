describe('Task Create', () => {
    it('returns json', async () => {
        const res = await request(app).post('/todo/create').send({ name: 'Testing name' });
        expect(res.statusCode).toEqual(200);
    });
});

describe('Task Update', () => {
    it('returns json', async () => {
        const res = await request(app).post('/todo/update').send({ id: 2, isDone: true });
        expect(res.statusCode).toEqual(200);
    });
});

describe('Task Delete', () => {
    it('returns json', async () => {
        const res = await request(app).post('/todo/delete').send({ id: 16 });
        expect(res.statusCode).toEqual(200);
    });
});

describe('Task Fetch All', () => {
    it('returns json', async () => {
        const res = await request(app).get('/todo/fetchAll').send();
        expect(res.statusCode).toEqual(200);
    });
});

//Testing
const app = require('../app');
const request = require('supertest');