<script>
  import dayjs from 'dayjs';
  import { Link } from 'yrv';

  import { SocialLink } from '../social';
  import socials from './socials';

  import { thatLinks, supportLinks, companyLinks, legalLinks } from './links';
</script>

<footer
  class="bg-white border-t border-gray-200"
  aria-labelledby="footerHeading">
  <h2 id="footerHeading" class="sr-only">Footer</h2>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
      <div class="space-y-8 xl:col-span-1">
        <img
          class="h-12 w-auto"
          src="/images/THAT-Full-Wide.svg"
          alt="THAT Logo"
          loading="lazy" />

        <p class="text-gray-500 text-base">
          Geeks helping Geeks become more awesome every day.
        </p>

        <div class="flex space-x-2">
          {#each socials as s}
            <div class="h-6 w-6">
              <SocialLink href="{s.href}" network="{s.network}" />
            </div>
          {/each}
        </div>
      </div>

      <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3
              class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              THAT
            </h3>
            <ul class="mt-4 space-y-4">
              {#each thatLinks as thatLink}
                <li>
                  <Link
                    tabindex="-1"
                    href="{thatLink.href}"
                    class="text-base text-gray-500 hover:text-that-blue">
                    {thatLink.text}
                  </Link>
                </li>
              {/each}
            </ul>
          </div>
          <div class="mt-12 md:mt-0">
            <h3
              class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <ul class="mt-4 space-y-4">
              {#each supportLinks as supportLink}
                <li>
                  <Link
                    tabindex="-1"
                    href="{supportLink.href}"
                    class="text-base text-gray-500 hover:text-that-blue">
                    {supportLink.text}
                  </Link>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3
              class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Company
            </h3>
            <ul class="mt-4 space-y-4">
              {#each companyLinks as companyLink}
                <li>
                  <Link
                    tabindex="-1"
                    href="{companyLink.href}"
                    class="text-base text-gray-500 hover:text-that-blue">
                    {companyLink.text}
                  </Link>
                </li>
              {/each}
            </ul>
          </div>

          <div class="mt-12 md:mt-0">
            <h3
              class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>

            <ul class="mt-4 space-y-4">
              {#each legalLinks as leaglLink}
                <li>
                  <Link
                    tabindex="-1"
                    href="{leaglLink.href}"
                    class="text-base text-gray-500 hover:text-that-blue">
                    {leaglLink.text}
                  </Link>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-gray-200 pt-8">
      <p class="text-base text-gray-400 xl:text-center">
        &copy; {dayjs().format('YYYY')} THAT&reg; All rights reserved.
      </p>
    </div>
  </div>
</footer>
