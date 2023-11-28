/**
 * Check if the website opens from mobile or tablet devices only (android/ios).
 *
 * @param {number} screen the width of biggest screen to be checked
 * @returns {boolean} true if it is mobile or tablet else false
 */
const isMobileOrTabletDevice = (screen = 1024) => {
	const screenWidth = window.innerWidth <= screen;
	const userAgentCheck =
		/Macintosh|Android|iPhone|iPad|iPod/i.test(
			navigator.userAgent
		);
	const hasTouch =
		'ontouchstart' in window ||
		'ontouchend' in document ||
		navigator.maxTouchPoints > 0;

	return userAgentCheck && screenWidth && hasTouch;
};

export default isMobileOrTabletDevice;
