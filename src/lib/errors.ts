export const validateUsername = (
	username: string,
	isRequired = true,
	name = 'Name',
	length = 64
) => {
	const errors = [];
	if (isRequired && !username) {
		errors.push(`${name} is required`);
	} else if (username) {
		if (!/^[a-zA-Z-' _0-9]+$/.test(username)) {
			errors.push('Only letters, numbers, hyphens, underscores, and apostrophes are allowed.');
		}
		if (username.length > length) {
			errors.push(`${name} must not exceed ${length} characters`);
		}
	}
	return errors;
};

export const validateEmail = (email: string, isRequired = true) => {
	const errors = [];
	if (isRequired && !email) {
		errors.push('Email is required');
	} else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
		errors.push('Invalid email format');
	}
	return errors;
};

export const validatePassword = (password: string, isRequired = true) => {
	const errors = [];
	if (isRequired && !password) {
		errors.push('Password is required');
	} else if (password) {
		if (password.length < 8) {
			errors.push('Password must be at least 8 characters long');
		}
		if (password.length > 64) {
			errors.push('Password must not exceed 64 characters');
		}
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
			errors.push(
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			);
		}
	}
	return errors;
};
