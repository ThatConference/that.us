<script>
	export let data;

	const { levels } = data;

	const pioneer = levels['PIONEER'] ?? [];
	const explorer = levels['EXPLORER'] ?? [];
	let pioneerCounter = 0;
	let explorerCounter = 0;
	let counter = 0;
	let currentImage;
	let interval = 6000;

	currentImage = pioneer[pioneerCounter]?.companyLogo;
	counter += 1;

	(function loop() {
		setTimeout(() => {
			if (counter % 2 === 0) {
				currentImage = pioneer[pioneerCounter]?.companyLogo;
				pioneerCounter += 1;
				if (pioneerCounter === pioneer.length) {
					pioneerCounter = 0;
				}
				interval = 6000;
			} else {
				currentImage = explorer[explorerCounter]?.companyLogo;
				explorerCounter += 1;
				if (explorerCounter === explorer.length) {
					explorerCounter = 0;
				}
				interval = 3000;
			}
			counter += 1;
			loop();
		}, interval);
	})();
</script>

<div class="bg-[url('/images/tv-background.png')] bg-cover bg-center">
	<div class="flex min-h-screen min-w-min flex-col items-center justify-center">
		<img class="-mt-32 h-3/4 w-3/4" src={currentImage} alt="logo" />
	</div>
</div>
