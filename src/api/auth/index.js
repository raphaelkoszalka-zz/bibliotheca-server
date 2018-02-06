import { Router } from 'express'
import { login } from './controller'
import { facebook, github, google } from '../../services/passport'

const router = new Router()

/**
 * @api {post} /auth/facebook Authenticate with Facebook
 * @apiName AuthenticateFacebook
 * @apiGroup Auth
 * @apiParam {String} access_token Facebook user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/facebook',
  facebook(),
  login)

/**
 * @api {post} /auth/github Authenticate with Github
 * @apiName AuthenticateGithub
 * @apiGroup Auth
 * @apiParam {String} access_token Github user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/github',
  github(),
  login)

/**
 * @api {post} /auth/google Authenticate with Google
 * @apiName AuthenticateGoogle
 * @apiGroup Auth
 * @apiParam {String} access_token Google user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/google',
  google(),
  login)

export default router

