function heredoc(doc_fn) {
	const doc = doc_fn.toString();
	const [_, delimiter] = /\/\*\s*<<(\w+)/.exec(doc) || [];

	if (delimiter === void(null)) {
		throw 'Malformatted heredoc: missing `<<DOC_DELIMITER`';
	}

	return doc.split(new RegExp(delimiter))[1];
}

function normalizeSpace(str) {
	return str.replace(/\s+/g, ' ');
}

function sqldoc(doc) {
	return normalizeSpace(heredoc(doc)).trim();
}

module.exports = {
	heredoc,
	normalizeSpace,
	sqldoc,
};
