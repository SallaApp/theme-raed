/**
 * Check if the website opens from mobile or tablet devices.
 *
 * @param {number} screen the width of biggest screen to be checked
 * @returns {boolean} true if it is mobile or tablet else false
 */
export const isMobileOrTabletDevice = (screen = 1024) => {
	const screenWidth = window.innerWidth <= screen;
	const userAgentCheck =
		/Mobile|Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	const hasTouch =
		'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0;

	return userAgentCheck || (screenWidth && hasTouch);
};
