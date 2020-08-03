<script>
  import { SocialLink } from './social';
  import { Link } from 'yrv';

  const socials = [
    {
      href: 'https://github.com/thatconference',
      network: 'GITHUB',
    },
    {
      href: 'https://twitter.com/thatconference',
      network: 'TWITTER',
    },
    {
      href: 'https://facebook.com/thatconference',
      network: 'FACEBOOK',
    },
    {
      href: 'https://instagram.com/thatconference',
      network: 'INSTAGRAM',
    },
    {
      href: 'https://linkedin.com/company/that-conference',
      network: 'LINKEDIN',
    },
    {
      href: 'https://youtube.com/c/thatconference',
      network: 'YOUTUBE',
    },
    {
      href: 'https://thatconference.live',
      network: 'TWITCH',
    },
    {
      href: 'https://thatconference.com',
      network: 'WEBSITE',
    },
  ];

  const textLinks = [
    {
      text: 'Schedule',
      href: '/sessions',
    },
    {
      text: 'Members',
      href: '/members',
    },
    {
      text: 'Partners',
      href: '/partners',
    },
    {
      text: 'FAQ',
      href: '/faq',
    },
    {
      text: 'Help',
      href: '/help',
    },
    {
      text: 'Blog',
      href: 'https://thatconference.com/blog',
    },
    {
      text: 'THAT Conference',
      href: 'https://thatconference.com',
    },
  ];
  const legalLinks = [
    {
      text: 'Code of Conduct',
      href: 'https://www.thatconference.com/code-of-conduct',
    },
    {
      text: 'Commitment to Diversity',
      href: 'https://www.thatconference.com/commitment-to-diversity',
    },
    {
      text: 'Anti-Harassment Policy',
      href: 'https://www.thatconference.com/anti-harassment-policy',
    },
  ];

  const moreLegalLinks = [
    {
      text: 'Privacy',
      href: 'https://www.thatconference.com/privacy-policy',
    },
    {
      text: 'Terms of Use',
      href: 'https://www.thatconference.com/terms-of-use',
    },
    {
      text: 'Copyright Policy',
      href: 'https://www.thatconference.com/copyright',
    },
  ];
</script>

<footer class="bg-gray-100">
  <div
    class="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"
  >
    <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
      {#each textLinks as tl}
        <div class="px-5 py-2">
          <Link
            href="{tl.href}"
            class="text-base leading-6 text-gray-500 hover:text-gray-900"
          >
            {tl.text}
          </Link>
        </div>
      {/each}
    </nav>

    <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
      {#each legalLinks as ll}
        <div class="px-5 py-2">
          <Link
            href="{ll.href}"
            class="text-base leading-6 text-gray-500 hover:text-gray-900"
          >
            {ll.text}
          </Link>
        </div>
      {/each}
    </nav>

    <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
      {#each moreLegalLinks as mll}
        <div class="px-5 py-2">
          <Link
            href="{mll.href}"
            class="text-base leading-6 text-gray-500 hover:text-gray-900"
          >
            {mll.text}
          </Link>
        </div>
      {/each}
    </nav>

    <div class="mt-8 flex justify-center">
      {#each socials as s}
        <div class="h-10 w-10">
          <SocialLink href="{s.href}" network="{s.network}" />
        </div>
      {/each}
    </div>
    <div class="mt-8">
      <p class="text-center text-base leading-6 text-gray-400">
        &copy; 2020 THAT. All rights reserved.
      </p>
    </div>
  </div>
</footer>
