/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
export function csvGenerator(totalData, actualHeaderKey, headerToShow, fileName) {
	const data = totalData || null;
	if (data == null || !data.length) {
		return null;
	}
	const columnDelimiter = ',';
	const lineDelimiter = '\n';
	const keys = headerToShow;
	let result = '';
	result += keys.join(columnDelimiter);
	result += lineDelimiter;
	data.forEach((item) => {
		let ctr = 0;
		actualHeaderKey.forEach((key) => {
			if (ctr > 0) result += columnDelimiter;
			if (Array.isArray(item[key])) {
				const arrayItem = item[key] && item[key].length > 0 ? `"${item[key].join(',')}"` : '-';
				result += arrayItem;
			} else if (typeof item[key] === 'string') {
				const strItem = item[key] ? `"${item[key]}"` : '-';
				result += strItem ? strItem.replace(/\s{2,}/g, ' ') : strItem;
			} else {
				const strItem = `${item[key]}`;
				result += strItem ? strItem.replace(/,/g, '') : strItem;
			}

			ctr++;
		});
		result += lineDelimiter;
	});

	if (result == null) return;

	const blob = new Blob([result]);
	if (navigator.msSaveBlob) {
		// IE 10+
		navigator.msSaveBlob(blob, exportedFilenmae);
	} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
		const hiddenElement = window.document.createElement('a');
		hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(result)}`;
		hiddenElement.target = '_blank';
		hiddenElement.download = fileName;
		hiddenElement.click();
	} else {
		const link = document.createElement('a');
		if (link.download !== undefined) {
			// Browsers that support HTML5 download attribute
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute('download', fileName);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}
