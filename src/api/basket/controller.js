import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Basket } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Basket.create({ ...body, userId: user })
    .then((basket) => basket.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Basket.count(query)
    .then(count => Basket.find(query, select, cursor)
      .populate('userId')
      .then((baskets) => ({
        count,
        rows: baskets.map((basket) => basket.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Basket.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((basket) => basket ? basket.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Basket.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((basket) => basket ? Object.assign(basket, body).save() : null)
    .then((basket) => basket ? basket.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Basket.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((basket) => basket ? basket.remove() : null)
    .then(success(res, 204))
    .catch(next)
