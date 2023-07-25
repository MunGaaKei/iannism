const IO = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		const { target } = entry;

		if (!entry.isIntersecting) return;

		const { src } = target.dataset;
		target.setAttribute("src", src);
		target.removeAttribute("data-src");
	});
});

export const lazyload = (container) => {
	if (!container) return;

	const imgs = Array.from(container.querySelectorAll("img[data-src]"));

	imgs.map((img) => {
		img.onload = () => {
			img.classList.remove("lazyload");
			IO.unobserve(img);
		};
		IO.observe(img);
	});
};
