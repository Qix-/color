
function maxfn(max: number) {
	return (value: number) => {
		return Math.max(0, Math.min(max, value));
	};
}

function assertArray(value: unknown) {
	return Array.isArray(value) ? value : [value];
}

function zeroArray(array: unknown[], length = array.length) {
	for (let i = 0; i < length; i++) {
		if (typeof array[i] !== 'number') {
			array[i] = 0;
		}
	}

	return array;
}

function roundTo(number: number, places: number) {
	return Number(number.toFixed(places));
}

function roundToPlace(places: number) {
	return (value: number)=>  {
		return roundTo(value, places);
	};
}


export { maxfn, assertArray, zeroArray, roundToPlace };
