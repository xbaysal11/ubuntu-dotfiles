new Promise((resolve, reject) => {
	resolve(Promise.resolve(10));
}).then((value) => {
	console.log(value);
});