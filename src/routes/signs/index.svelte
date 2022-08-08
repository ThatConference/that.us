<script>
	const sponsorImages = [
		'https://storage.googleapis.com/that-bucket/partnerlogos/CUNA-Mutual-Group.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/CUNA-Mutual-Group.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/Core-BTS.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/Core-BTS.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/unspecified.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/unspecified.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/Progress.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/NVISIA.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/ionic.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/grapecity.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/symplr.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/google-cloud.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/Trek.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/Algorand.svg',
		'https://storage.googleapis.com/that-bucket/partnerlogos/Twilio.svg'
	];

	let currentImage = sponsorImages[0];
	let counter = 0;

	setInterval(() => {
		currentImage = sponsorImages[counter];
		counter++;

		if (counter === sponsorImages.length) counter = 0;
	}, 3000);
</script>

<div class="bg-[url('/images/sign-background.png')] bg-cover bg-center">
	<div class="min-w-screen flex min-h-screen flex-col items-center justify-center">
		<img class="h-10/12 -mt-32 w-10/12" src={currentImage} alt="" />
	</div>
</div>
