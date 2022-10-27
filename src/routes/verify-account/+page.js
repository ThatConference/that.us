import { invalidateAll } from '$app/navigation';

export async function load() {
	invalidateAll();

	return {};
}
