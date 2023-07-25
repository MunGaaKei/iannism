export const routes = new Proxy(
	{
		path: location.pathname,
		param: {},
	},
	{
		set(tar, key, val) {
			console.log(tar, key);
			return Reflect.set(tar, key, val);
		},
	}
);
