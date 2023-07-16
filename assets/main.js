import "../components/header.js";
import "../components/menu.js";

document.addEventListener("DOMContentLoaded", function (e, d = document) {
	// 是否为 WINDOWS 系统
	if (/windows|win32/i.test(navigator.userAgent)) {
		d.documentElement.classList.add("os-windows");
	}

	redirect(location.pathname.slice(1));

	d.addEventListener("click", (e) => {
		const tar = e.target;

		tar.dataset.open && open(tar.dataset.open);
		tar.dataset.close && close(tar.dataset.close);
	});

	function open(name) {
		const tar = d.getElementById(name);
		tar && tar.classList.add("active");
		history.pushState(null, "", `/${name}`);
	}

	function close(name) {
		const tar = d.getElementById(name);
		tar && tar.classList.remove("active");
		history.go(-1);
	}

	function redirect(path) {
		path.length > 1 && open(path);
	}
});
