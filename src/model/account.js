const { BaseModel } = require('./base');

class Account extends BaseModel{
//	static safe_new(args) {
//		let instance = new this(args);
//		instance.validate();
//		return instance;
//	}

//	constructor(args = {}) {
//		this.key = args.key || Ulid.generate(now);
//		this.name = args.name;
//		this.credentials = args.credentials || [];
//		this.identities = args.identities || [];
//		this.users = args.users || [];
//		this.is_dirty = true;
//	}
	

	//activate - user
	//deactivate
	//enable - admin
	//disable

	isActive() {
		return this.user_activated && this.admin_activated;
	}

	activate(user) {
		const activation_level =
			user.key.equal(this.key) ? 'is_user_activated' :
			user instanceof Administrator ? 'is_admin_activated' :
				(() => { throw new InsufficientPermission(
					`User [${user.key}] attempted to activate account [${this.key}]`
				) })();

		this[activation_level] = true;
	}

	deactivate(user) {
		const activation_level =
			user.key.equal(this.key) ? 'is_user_activated' :
			user instanceof Administrator ? 'is_admin_activated' :
				(() => { throw new InsufficientPermission(
					`User [${user.key}] attempted to deactivate account [${this.key}]`
				) })();

		this[activation_level] = false;
	}
}
