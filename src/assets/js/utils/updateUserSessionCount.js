const updateUserSessionCount = (storageValue) => {
	const user = salla.storage.get('user');
	if (!user) return;
	localStorage.setItem('last-session-value' + user.id, storageValue);
	sessionStorage.setItem('current-session' + user.id, storageValue);
};

export default updateUserSessionCount;
