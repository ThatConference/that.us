<script>
  import metaTagsStore from '../store/metaTags';
  import { Standard as StandardLink } from '../elements/links';

  metaTagsStore.set({
    title: 'Accout Verification- THAT',
    description: 'Your account is unverified.',
    openGraph: {
      type: 'website',
      url: `https://that.us/verify-account`,
    },
  });
</script>

<div
  class="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
  <div class="max-w-max mx-auto">
    <main class="sm:flex">
      <div>
        <img
          class="h-28"
          src="/images/characters/Preston@2x.png"
          alt="Confused Preston" />
      </div>

      <div class="sm:ml-6">
        <div class="sm:border-l sm:border-gray-200 sm:pl-6">
          <div class="flex">
            <div>
              <h1
                class="text-4xl font-extrabold text-thatBlue-800 tracking-tight sm:text-5xl">
                THAT Account Unverified
              </h1>
              <p class="mt-1 text-base text-gray-500">
                You account is current unverified. To continue please check your
                email and finish verification.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-10 flex sm:border-l sm:border-transparent sm:pl-6">
          <StandardLink class="h-3/4" href="/">Head back to camp</StandardLink>
        </div>
      </div>
    </main>
  </div>
</div>
