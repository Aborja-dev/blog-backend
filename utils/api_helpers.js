/* eslint-disable no-prototype-builtins */
const haveAllProperties = (_object, propertyList) => {
	const haveProperties = propertyList.every((key) =>
		_object.hasOwnProperty(key)
	)
	return haveProperties
}

module.exports = { haveAllProperties }