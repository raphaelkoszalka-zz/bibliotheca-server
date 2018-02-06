import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Basket } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, basket

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  basket = await Basket.create({ userId: user })
})

test('POST /basket 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.subtitle).toEqual('test')
  expect(body.selfLink).toEqual('test')
  expect(body.thumbnail).toEqual('test')
  expect(body.price).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /basket 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /basket 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].userId).toEqual('object')
})

test('GET /basket 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /basket/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${basket.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(basket.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /basket/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${basket.id}`)
  expect(status).toBe(401)
})

test('GET /basket/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /basket/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${basket.id}`)
    .send({ access_token: userSession, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(basket.id)
  expect(body.title).toEqual('test')
  expect(body.subtitle).toEqual('test')
  expect(body.selfLink).toEqual('test')
  expect(body.thumbnail).toEqual('test')
  expect(body.price).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /basket/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${basket.id}`)
    .send({ access_token: anotherSession, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
  expect(status).toBe(401)
})

test('PUT /basket/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${basket.id}`)
  expect(status).toBe(401)
})

test('PUT /basket/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
  expect(status).toBe(404)
})

test('DELETE /basket/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${basket.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /basket/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${basket.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /basket/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${basket.id}`)
  expect(status).toBe(401)
})

test('DELETE /basket/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
