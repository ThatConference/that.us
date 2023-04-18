<script>
	export let data;

	import Notification from './components/Notification.svelte';
	import notificationMutationsApi from '$dataSources/api.that.tech/me/notifications/mutations';

	const { updateNotificationPreferences } = notificationMutationsApi();
	let { notificationPreferences } = data;
	let { meetThatCamper } = notificationPreferences;

	async function handleChecked(preference) {
		return updateNotificationPreferences(preference);
	}
</script>

<div>
	<div>
		<p class="text-gray-500">
			Stay up-to-date and informed with our personalized notification settings. Here you can
			customize and manage the notifications you receive from all things THAT. Choose the specific
			events you want to be notified about.
		</p>
		<p class="pt-4 text-gray-500">
			We respect your privacy and won't send notifications without your consent.
		</p>
	</div>

	<Notification
		title="Profile and System Notifcations"
		description="Our profile and system notifications are designed to keep you in the loop without overwhelming you with unnecessary information. You will only receive these notifications for critical updates, or issues that require your attention. 
		
		These notifications include user profile changes, session updates, and ticket purchases. 
		
		If you have any concerns or questions about our website system notifications, please do not hesitate to contact us. This setting is enabled and cannot be turned off."
		frequency="As triggered by your website actions and cannot be disabled."
		disabled={true}
		checked={true} />

	<Notification
		title="Meet THAT Camper"
		description="Say hello to Meet THAT Camper - your weekly chance to connect with a fellow geek before THAT Conference. Every Monday at 9 am central, we'll introduce you to another attendee headed to the event.
		
		Forge new connections, expand your network, and make a friend as you learn about each other's interests, backgrounds, and goals.
		
		With Meet THAT Camper, you'll start building relationships long before you arrive at THAT Conference. It's the perfect way to get excited and prepare for a week of learning, sharing, and fun.
		
		Don't miss out on this unique opportunity to connect with your fellow geeks. Enable today and get ready to Meet THAT Camper!"
		frequency="Weekly from the time you purchased a ticket until the start of the event. Sent every Monday at 9am central"
		checked={meetThatCamper}
		on:toggled={({ detail }) => handleChecked({ meetThatCamper: detail })} />
</div>
