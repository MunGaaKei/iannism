import { make } from "./core/ire.js";

make({
	name: "i-socials",
	template() {
		return `
        <a href="mailto:502975759@qq.com" class="icon link">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 20 20"
            >
                <g fill="none">
                    <path
                        d="M10.306 8.697c.197.197.436.328.689.392a2.565 2.565 0 0 0-.229 1.38L10 10.92L2.015 6.223A2.5 2.5 0 0 1 4.5 4h8.375l-2.571 2.575a1.5 1.5 0 0 0 .002 2.122zm.776 2.747a2.561 2.561 0 0 0 4.038.549L18 9.123V14.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5V7.373l7.747 4.558a.5.5 0 0 0 .507 0l.828-.487zm4.144-6.968a1.625 1.625 0 0 1 2.298 2.298l-.01.01l-3.858 3.844l-.01.01a.56.56 0 1 1-.78-.804l3.487-3.48a.5.5 0 1 0-.707-.708l-3.5 3.493a1.56 1.56 0 0 0 2.194 2.218l.012-.01l3.879-3.865a2.625 2.625 0 1 0-3.712-3.713L10.95 7.342a.5.5 0 0 0 .707.707l3.568-3.573z"
                        fill="currentColor"
                    ></path>
                </g>
            </svg>
        </a>
        <a
            href="https://github.com/MunGaaKei"
            class="icon link"
            target="_blank"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 480 512"
            >
                <path
                    d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1s10.9-55.1 36.7-55.1s36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95c-37.9 76.6-142.1 74.8-216.7 74.8c-75.8 0-186.2 2.7-225.6-74.8c-14.6-29-20.2-63.1-20.2-95c0-41.9 13.9-81.5 41.5-113.6c-5.2-15.8-7.7-32.4-7.7-48.8c0-21.5 4.9-32.3 14.6-51.8c45.3 0 74.3 9 108.8 36c29-6.9 58.8-10 88.7-10c27 0 54.2 2.9 80.4 9.2c34-26.7 63-35.2 107.8-35.2c9.8 19.5 14.6 30.3 14.6 51.8c0 16.4-2.6 32.7-7.7 48.2c27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6c-18.9 0-37 3.4-56 6c-14.9 2.3-29.8 3.2-45.1 3.2c-15.2 0-30.1-.9-45.1-3.2c-18.7-2.6-37-6-56-6c-46.8 0-73.5 38.7-73.5 82.6c0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1s36.7-34.2 36.7-55.1s-10.9-55.1-36.7-55.1z"
                    fill="currentColor"
                ></path>
            </svg>
        </a>
        `;
	},
});
