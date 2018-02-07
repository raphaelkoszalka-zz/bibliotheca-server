import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export History, { schema } from './model'

const router = new Router()
const { title, subtitle, selfLink, thumbnail, price } = schema.tree

/**
 * @api {post} /history Create history
 * @apiName CreateHistory
 * @apiGroup History
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title History's title.
 * @apiParam subtitle History's subtitle.
 * @apiParam selfLink History's selfLink.
 * @apiParam thumbnail History's thumbnail.
 * @apiParam price History's price.
 * @apiSuccess {Object} history History's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 History not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, subtitle, selfLink, thumbnail, price }),
  create)

/**
 * @api {get} /history Retrieve histories
 * @apiName RetrieveHistories
 * @apiGroup History
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of histories.
 * @apiSuccess {Object[]} rows List of histories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /history/:id Retrieve history
 * @apiName RetrieveHistory
 * @apiGroup History
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} history History's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 History not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /history/:id Update history
 * @apiName UpdateHistory
 * @apiGroup History
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title History's title.
 * @apiParam subtitle History's subtitle.
 * @apiParam selfLink History's selfLink.
 * @apiParam thumbnail History's thumbnail.
 * @apiParam price History's price.
 * @apiSuccess {Object} history History's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 History not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, subtitle, selfLink, thumbnail, price }),
  update)

/**
 * @api {delete} /history/:id Delete history
 * @apiName DeleteHistory
 * @apiGroup History
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 History not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
