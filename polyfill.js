// `color-string` calls Object.hasOwn while it is being evaluated, and Safari
// before 15.4 does not implement it. This module must be imported before
// `color-string` so the call has something to resolve.
/* eslint-disable prefer-object-has-own */
Object.hasOwn ||= function (target, property) {
	return Object.prototype.hasOwnProperty.call(target, property);
};
/* eslint-enable prefer-object-has-own */
