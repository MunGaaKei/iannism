import { make } from "./core/ire.js";

make({
	name: "i-viewer",
	data: {
		src: "",
	},
	style: `            
    .i-viewer-img {
        position: relative;
        margin: auto;
    }
    `,
	template() {
		const { src } = this.data;

		return `
            <img src="${src}" class="i-viewer-img">
        `;
	},
	mounted() {
		const self = this;
		const draggable = true;
		const dragStart = [0, 0];

		document.addEventListener("click", function (e) {
			const tar = e.target;

			if (tar.tagName !== "IMG" || self.contains(tar)) return;

			self.classList.add("active");
			self.data.src = tar.src;
		});

		this.addEventListener("click", function () {
			this.classList.remove("active");
		});
	},
});
