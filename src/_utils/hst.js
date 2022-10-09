import { dev, browser } from '$app/environment';

export function trackEvent(name, properties = {}) {
	if (!dev && browser) {
		let _hsq = (window._hsq = window._hsq || []);
		_hsq.push([
			'trackCustomBehavioralEvent',
			{
				name,
				properties
			}
		]);
	}
}
