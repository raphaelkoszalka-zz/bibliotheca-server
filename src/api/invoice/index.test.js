import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Invoice } from '.'

const app = () => express(apiRoot, routes)

let invoice

beforeEach(async () => {
  invoice = await Invoice.create({})
})

// @todo: rewrite POST test
test('POST /invoice 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ html: 'test', price: 'test', items { title: 'test', price }: 'test', userName: 'test', userId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.html).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.items { title).toEqual('test')
  expect(body.price }).toEqual('test')
  expect(body.userName).toEqual('test')
  expect(body.userId).toEqual('test')
})

test('GET /invoice 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /invoice/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
})

test('GET /invoice/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /invoice/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${invoice.id}`)
    .send({ html: 'test', price: 'test', items { title: 'test', price }: 'test', userName: 'test', userId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoice.id)
  expect(body.html).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.items { title).toEqual('test')
  expect(body.price }).toEqual('test')
  expect(body.userName).toEqual('test')
  expect(body.userId).toEqual('test')
})

test('PUT /invoice/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ html: 'test', price: 'test', items { title: 'test', price }: 'test', userName: 'test', userId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /invoice/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoice.id}`)
  expect(status).toBe(204)
})

test('DELETE /invoice/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
