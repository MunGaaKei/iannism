import { marked } from "../assets/marked.esm.js";
import "../components/article.js";
import { Request } from "../components/core/request.js";
import "../components/header.js";
import "../components/menu.js";
import "../components/photos.js";
import "../components/socials.js";
import "../components/viewer.js";
import { articles } from "./data.js";

export const routes = new Proxy(
	{
		page: "",
		path: "",
	},
	{
		set(tar, key, val) {
			switch (key) {
				case "page":
					toggle(tar[key], val);
					break;
				case "path":
					history.pushState(null, "", val);
					break;
				default:
					break;
			}
			return Reflect.set(tar, key, val);
		},
	}
);

document.addEventListener("DOMContentLoaded", function (e, d = document) {
	// 是否为 WINDOWS 系统
	if (/windows|win32/i.test(navigator.userAgent)) {
		d.documentElement.classList.add("os-windows");
	}

	routes.path = location.pathname;
	routes.page = location.pathname.slice(1).split("/")[0];

	d.addEventListener("click", (e) => {
		const tar = e.target;
		const { open } = tar.dataset;

		if (open) {
			routes.page = open.slice(1).split("/")[0];
			routes.path = open;
		}
	});
});

function toggle(from, to) {
	if (from) {
		const $from = document.getElementById(from);
		$from && $from.classList.remove("active");
	}

	if (!to) return;

	const $to = document.getElementById(to);
	$to && $to.classList.add("active");

	to === "article" && openArticle();
}

const request = new Request();

async function openArticle() {
	const header = document.getElementById("a-header");
	const content = document.getElementById("a-content");

	content.data.loading = true;

	const key = routes.path.split("/").at(-1);
	const article = articles.find((item) => item.name === decodeURI(key));

	if (!article) return;

	const { link, name, md } = article;

	header.dataset.title = name;

	const text = await request.send(link).then((res) => res.text());

	Object.assign(content.data, {
		loading: false,
		text: md
			? marked?.parse(text, { mangle: false, headerIds: false })
			: text,
	});
}
