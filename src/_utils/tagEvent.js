import { dev, browser } from '$app/environment';

// function hstTrackEvent(name, properties = {}) {
// 	let _hsq = (window._hsq = window._hsq || []);
// 	_hsq.push([
// 		'trackCustomBehavioralEvent',
// 		{
// 			name,
// 			properties
// 		}
// 	]);
// }

function gtagTrackEvent(event, category, label) {
	window.gtag('event', event, {
		event_category: category,
		event_label: label
	});
}

export function tagEvent(event, category, label) {
	if (!dev && browser) {
		gtagTrackEvent(event, category, label);
	}
}

export function tagException(message, isFatal = true) {
	if (!dev && browser) {
		window.gtag('event', 'exception', {
			description: message,
			fatal: isFatal
		});
	}
}
