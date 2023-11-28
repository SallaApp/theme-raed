import updateUserSessionCount from "./updateUserSessionCount";
/**
 * Calculate the session count for the user.
 * @returns {number} the user session count
 */
const getSessionCount = () => {
	const user = salla.storage.get('user');
	if (!user) return;
	let lastSessionValue = localStorage.getItem('last-session-value' + user.id);

	if (lastSessionValue === null) {
		updateUserSessionCount(1);
	} else if (
		lastSessionValue &&
		sessionStorage.getItem('current-session' + user.id) === null
	) {
		lastSessionValue++;

		updateUserSessionCount(lastSessionValue);
	}

	return parseInt(lastSessionValue);
};

export default getSessionCount;
