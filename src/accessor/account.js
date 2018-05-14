'use strict';

const StringUtil = require('util/string');

const promisify = (fn) => new Promise(
	(resolve, reject) => fn(resolve).catch(reject)
);
const transaction = promisify(write_handle.transaction);

async function transaction() {
  return new Promise(function(resolve, reject) {
    knex.transaction(function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }
}

const load_account_sql = StringUtil.sqldoc(() => { /*<<SQL
	with latest_activation as (
		select distinct on (account_id) *
		from activation
		order by activation_id desc
	)
	select
		a.key,
		a.created,
		latest_activation.is_admin_activated
		latest_activation.is_user_activated
	from account a
	join latest_activation using (account_id)
	where a.key=:key
	limit 1
SQL*/});

const save_account_sql = StringUtil.sqldoc(() => { /*<<SQL
	with
		args (key, created) as (
			values (:key, :created)
		),
		inserts as (
			inset into account
				(key, created)
			select * from args
			on conflict (key) do nothing
			returning account_id
		)
	select account_id
	from inserts
	union
	select account_id
	from accounts
	where key in (select key from args)
SQL*/});

const save_activation_sql = StringUtil.sqldoc(() => { /*<<SQL
	
SQL*/})


class AccountAccessor {
	async load(account_key) {
		const [data] = await read_handle.raw(load_account_sql, {
			key: account_key.toRaw(),
		}).then(FunctionUtil.identity);

		return new Account({
			...data,
			key: account_key,
		});
	}

	async save(account) {
		await write_handle.transaction((trx) => {
			write_handle.raw(save_account_sql, {
				key: account.key.toRaw(),
				created: account.created,
			})
			.transacting(trx)
			.then(([account_id]) => {
				write_handle.raw(save_activation_sql, {
					account_id,
					is_admin_updated: account.is_admin_updated,
					is_user_updated: account.is_user_updated,
				})
			})
		}).return();
	}
}

module.exports = { AccountAccessor };
