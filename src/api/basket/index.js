import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Basket, { schema } from './model'

const router = new Router()
const { title, subtitle, selfLink, thumbnail, price, googleId, queryId } = schema.tree

/**
 * @api {post} /basket Create basket
 * @apiName CreateBasket
 * @apiGroup Basket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Basket's title.
 * @apiParam subtitle Basket's subtitle.
 * @apiParam selfLink Basket's selfLink.
 * @apiParam thumbnail Basket's thumbnail.
 * @apiParam price Basket's price.
 * @apiSuccess {Object} basket Basket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Basket not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, subtitle, selfLink, thumbnail, price, googleId, queryId }),
  create)

/**
 * @api {get} /basket Retrieve baskets
 * @apiName RetrieveBaskets
 * @apiGroup Basket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of baskets.
 * @apiSuccess {Object[]} rows List of baskets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /basket/:id Retrieve basket
 * @apiName RetrieveBasket
 * @apiGroup Basket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} basket Basket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Basket not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /basket/:id Update basket
 * @apiName UpdateBasket
 * @apiGroup Basket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Basket's title.
 * @apiParam subtitle Basket's subtitle.
 * @apiParam selfLink Basket's selfLink.
 * @apiParam thumbnail Basket's thumbnail.
 * @apiParam price Basket's price.
 * @apiSuccess {Object} basket Basket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Basket not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, subtitle, selfLink, thumbnail, price, googleId, queryId }),
  update)

/**
 * @api {delete} /basket/:id Delete basket
 * @apiName DeleteBasket
 * @apiGroup Basket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Basket not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
