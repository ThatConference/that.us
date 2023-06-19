<script>
	import { onMount } from 'svelte';

	function handleOnFormReady() {
		// form html is the sent in
		console.log('onFormReady Called');
	}

	onMount(() => {
		// eslint-disable-next-line no-undef
		hbspt.forms.create({
			// required
			region: 'na1',
			portalId: '22769624',
			formId: '7e7b1e14-711c-4b42-98aa-5eff05cb9786',
			target: '#newsletterForm',
			// optional
			onFormReady: handleOnFormReady,
			cssClass: 'inline-flex space-x-4 text-gray-500',
			errorMessageClass: 'text-red-600 text-sm italic',
			submitButtonClass:
				'rounded-md border-2 border-thatBlue-500 bg-white px-4 py-2 text-base font-medium leading-6 text-thatBlue-500 shadow transition duration-150 ease-in-out hover:bg-thatBlue-500 hover:text-white focus:border-thatBlue-800 focus:bg-thatBlue-500 focus:text-white focus:outline-none focus:ring-thatBlue-500',
			submitText: 'Join',
			redirectUrl: '/my/notification-preferences/'
		});
	});
</script>

<div id="newsletterForm" />
