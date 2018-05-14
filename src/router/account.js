'use strict';

const Router = require('koa-router');
const { UlidMonotonic } = require('id128/ulid-monotonic');
const { AccountAccessor } = require('accessor/account');

const router = new Router;

//const key = auth_token.key;
//ctx.state.user = await fetch_account(key)

async function extract_account(key, ctx, next) {
	ctx.state.account = (key === 'current')
		? ctx.state.user
		: await fetch_account(key);

	return await next();
}

async function extract_identity_type(key, ctx, next) {
	ctx.state.identity_type = key;
	return await next();
}

async function extract_credential_type(key, ctx, next) {
	ctx.state.credential_type = key;
	return await next();
}

function fake(ctx) {
	ctx.body = [
		ctx.request.method,
		ctx.request.url,
		UlidMonotonic.generate().toCanonical(),
		JSON.stringify(ctx.state),
	].join(' ');
}

async function fetch_account(key) {
	return { key };
	return await AccountAccessor.load(key);
}

async function create_account(ctx) {
	const account = new Account();
	await AccountAccessor.save(acount);
	ctx.status = 201;
	ctx.body = {
		account_key: account.key.toCanonical(),
		account_link: ctx.router.url(
			'/account/:account_key',
			account.key.toCanonical()
		),
	};
}

function create() {}
function retrieve() {}
function list() {}

async function deactivate(ctx) {
	const { account, user } = ctx.state;
	account.deactivate(user);
	await AccountAccessor.save(account);
}

async function reactivate(ctx) {
	const { account, user } = ctx.state;
	account.activate(user);
	await AccountAccessor.save(account);
}

async function insertIdentity(ctx) {}
async function fetchIdentity(ctx) {}
async function purgeIdentity(ctx) {}

router
	.param('account_key', extract_account)
	.param('credential_type', extract_credential_type)
	.param('identity_type', extract_identity_type)
	.get('/account', fake)
	.post('/account', fake)
	.get('/account/:account_key', fake)
	.post('/account/:account_key/reactivate', account_controller.reactivate)
	.post('/account/:account_key/deactivate', account_controller.deactivate)
	.put('/account/:account_key/credential/:credential_type', fake)
	.del('/account/:account_key/identity/:identity_type', fake);
	.get('/account/:account_key/identity/:identity_type', fake)
	.put('/account/:account_key/identity/:identity_type', fake);

exports.routes = routAccountController.reactivateer.routes.bind(router);
