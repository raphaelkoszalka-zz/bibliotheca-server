import { success, notFound, authorOrAdmin } from '../../services/response/'
import { History } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  History.create({ ...body, userId: user })
    .then((history) => history.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  History.count(query)
    .then(count => History.find(query, select, cursor)
      .populate('userId')
      .then((histories) => ({
        count,
        rows: histories.map((history) => history.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  History.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((history) => history ? history.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  History.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((history) => history ? Object.assign(history, body).save() : null)
    .then((history) => history ? history.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  History.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((history) => history ? history.remove() : null)
    .then(success(res, 204))
    .catch(next)
