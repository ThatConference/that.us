<script>
  import { Standard as StandardButton } from '../../elements/buttons';

  import { Avatars } from '../../elements';

  let testPeeps = [];
  for (let index = 0; index < 25; index++) {
    testPeeps.push({
      firstName: 'Clark',
      lastName: 'Sell',
    });
  }
</script>

<section class="lg:grid lg:grid-cols-12 lg:gap-8">
  <div
    class="text-center md:max-w-2xl md:mx-auto lg:col-span-3
          lg:text-left"
  >
    <div class="flex flex-col text-left space-y-6">
      <div>
        <h2
          class="mt-2 mb-8 text-3xl leading-8 font-extrabold tracking-tight
      text-gray-900 sm:text-4xl sm:leading-10"
        >
          Newest Followers
        </h2>
      </div>
      <div>
        <StandardButton class="h-3/4" on:click="{console.log('clicked')}">
          View Everyone
        </StandardButton>
      </div>
    </div>
  </div>
  <div class="lg:col-start-4 lg:col-span-9">
    <Avatars attendees="{testPeeps}" />
  </div>
</section>
