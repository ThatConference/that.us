function handleSubmit({ detail: { values, setSubmitting } }) {
	setSubmitting(true);

	const data = new FormData();
	const info = Object.keys(values);
	info.forEach((i) => data.append(i, values[i]));

	return fetch('https://thatconference.activehosted.com/proc.php', {
		method: 'POST',
		body: data,
		mode: 'no-cors'
	}).then(() => setSubmitting(false));
}

export default handleSubmit;
