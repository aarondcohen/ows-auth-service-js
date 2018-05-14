isEqualconst { Ulid } = require('id128');

//const TrackUpdates = {
//	set(self, property, value) {
//		const is_update = !isEqual(Reflect.get(self, property), value);
//		if (is_update) {
//			Reflect.set(self, _is_dirty, true);
//			Reflect.set(self, 'updated', new Date);
//			Reflect.setProperty(self, property, value);
//		}
//		return true;
//	}
//}

class BaseModel {
	constructor({ key, created } = {}) {
		this.key = key || Ulid.generate();
		this.created = created || new Date();
	}

	get created() { return this.created }
	get key() { return this.key }
}

module.exports = { BaseModel };
