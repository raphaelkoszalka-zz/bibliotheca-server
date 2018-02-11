import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
import { generatePdf  } from './invoice.pdf'
import { success, notFound } from '../../services/response/'
export Invoice, { schema } from './model'

const router = new Router()
const { price, items, userName, userId } = schema.tree

/**
 * @api {post} /invoice Create invoice
 * @apiName CreateInvoice
 * @apiGroup Invoice
 * @apiParam html Invoice's html.
 * @apiParam price Invoice's price.
 * @apiParam items { title Invoice's items { title.
 * @apiParam price } Invoice's price }.
 * @apiParam userName Invoice's userName.
 * @apiParam userId Invoice's userId.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 */
router.post('/',
  body({ price, items, userName, userId }),
  create)

/**
 * @api {get} /invoice Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoice
 * @apiUse listParams
 * @apiSuccess {Object[]} invoices List of invoices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',  generatePdf )

/**
 * @api {get} /invoice/:id Retrieve invoice
 * @apiName RetrieveInvoice
 * @apiGroup Invoice
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /invoice/:id Update invoice
 * @apiName UpdateInvoice
 * @apiGroup Invoice
 * @apiParam html Invoice's html.
 * @apiParam price Invoice's price.
 * @apiParam items { title Invoice's items { title.
 * @apiParam price } Invoice's price }.
 * @apiParam userName Invoice's userName.
 * @apiParam userId Invoice's userId.
 * @apiSuccess {Object} invoice Invoice's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoice not found.
 */
router.put('/:id',
  body({ price, items, userName, userId }),
  update)

/**
 * @api {delete} /invoice/:id Delete invoice
 * @apiName DeleteInvoice
 * @apiGroup Invoice
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Invoice not found.
 */
router.delete('/:id',
  destroy)

export default router
