/* eslint-disable no-prototype-builtins */
const haveAllProperties = (_object, propertyList) => {
	const haveProperties = propertyList.every((key) =>
		_object.hasOwnProperty(key)
	)
	return haveProperties
}

const getId  = ()=>{

}

module.exports = { haveAllProperties, getId }