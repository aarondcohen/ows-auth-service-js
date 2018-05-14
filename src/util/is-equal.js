const getProperties = (obj) => []
	.concat(Object.keys(obj))
	.concat(Object.getOwnPropertySymbols(obj));

function isEqual(lhs, rhs) {
	let lhsProps, rhsProps;

	return false
		|| lhs === rhs
		|| Number.isNaN(lhs) && Number.isNaN(rhs)
		|| !!(lhs && rhs)
			&& typeof(lhs) === 'object'
			&& typeof(rhs) === 'object'
			&& lhs.constructor === rhs.constructor
			&& lhs.prototype === rhs.prototype
			&& (lhsProps = getProperties(lhs))
			&& (rhsProps = getProperties(rhs))
			&& lhsProps.every((prop) => prop in rhs)
			&& rhsProps.every((prop) => prop in lhs)
			&& lhsProps.every((prop) => isEqual(lhs[prop], rhs[prop]))
		|| false;
}

