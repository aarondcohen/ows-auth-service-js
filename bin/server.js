'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const AccountRouter = require('../src/router/account.js');
const SessionRouter = require('../src/router/session.js');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const app = new Koa;
const router = new Router;

// Build documentation
router
	.get('/', function(ctx) {
		ctx.body = [
			router.routes(),
			AccountRouter.routes(),
			SessionRouter.routes(),
		]
			.map((obj) => obj.router.stack)
			.reduce((acc, arr) => (acc.concat(arr)), [])
			.map((layer) => layer.url({
				account_key: '_account_key',
				credential_type: '_credential_type',
				identity_type: '_identity_type',
				session_key: '_session_key',
			}));
	});

// response
app.use(router.routes());
app.use(AccountRouter.routes());
app.use(SessionRouter.routes());

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
