/**
 * The `locations` API module that provides functionality to create, read, update and delete location.
 *
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import koa from 'koa';
import router from 'koa-joi-router';
import validator from './lib/validator';
import * as locationDAO from './lib/dao';

const app = koa();
const api = router();

const routes = [
    {
        method: 'GET',
        path: '/:id',
        validate: validator.findByID,
        handler: function *() {
            this.body = yield locationDAO.findByID(this.params.id);
        }
    },
    {
        method: 'GET',
        path: '/',
        validate : validator.find,
        handler: function *() {
            this.body = yield locationDAO.find();
        }
    },
    {
        method: 'POST',
        path: '/',
        validate: validator.insert,
        handler: function *() {
            this.body = yield locationDAO.insert(this.request.body);
            this.status = 201;
        }
    },
    {
        method: 'PUT',
        path: '/:id',
        validate: validator.update,
        handler: function *() {
            this.body = yield locationDAO.update(this.params.id, this.request.body);
        }
    },
    {
        method: 'DELETE',
        path: '/:id',
        validate: validator.remove,
        handler: function *() {
            yield locationDAO.remove(this.params.id);
            this.status = 204;
        }
    }
];

api.prefix('/api/locations');
api.route(routes);
app.use(api.middleware());

export default app;
