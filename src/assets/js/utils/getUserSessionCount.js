/**
 * Calculate the session count for the user.
 * @returns {number} the user session count
 */
export const getSessionCount = () => {
	const user = salla.storage.get('user');
	if (!user) return;
	let lastSessionValue = localStorage.getItem('last-session-value' + user.id);

	if (lastSessionValue === null) {
		updateUserSession(1);
	} else if (
		lastSessionValue &&
		sessionStorage.getItem('current-session' + user.id) === null
	) {
		lastSessionValue++;

		updateUserSession(lastSessionValue);
	}

	return parseInt(lastSessionValue);
};

export const updateUserSession = (storageValue) => {
	if (!user) return;
	const user = salla.storage.get('user');
	localStorage.setItem('last-session-value' + user.id, storageValue);
	sessionStorage.setItem('current-session' + user.id, storageValue);
};
