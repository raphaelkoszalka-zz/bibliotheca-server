import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { History } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, history

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  history = await History.create({ userId: user })
})

test('POST /history 201 (user)', async () => {
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

test('POST /history 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /history 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].userId).toEqual('object')
})

test('GET /history 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /history/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${history.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(history.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /history/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${history.id}`)
  expect(status).toBe(401)
})

test('GET /history/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /history/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${history.id}`)
    .send({ access_token: userSession, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(history.id)
  expect(body.title).toEqual('test')
  expect(body.subtitle).toEqual('test')
  expect(body.selfLink).toEqual('test')
  expect(body.thumbnail).toEqual('test')
  expect(body.price).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /history/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${history.id}`)
    .send({ access_token: anotherSession, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
  expect(status).toBe(401)
})

test('PUT /history/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${history.id}`)
  expect(status).toBe(401)
})

test('PUT /history/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', subtitle: 'test', selfLink: 'test', thumbnail: 'test', price: 'test' })
  expect(status).toBe(404)
})

test('DELETE /history/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${history.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /history/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${history.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /history/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${history.id}`)
  expect(status).toBe(401)
})

test('DELETE /history/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
