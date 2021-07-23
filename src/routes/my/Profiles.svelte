<script>
  import { navigateTo, router } from 'yrv';

  import { User, Badge } from '../../elements/svgs';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader } from '../../elements';

  import Profile from './components/profiles/_Profile.svelte';
  import SharedProfile from './components/profiles/_SharedProfile.svelte';

  $: profileComponent = Profile;

  const asideSelected = {
    item: 'bg-thatBlue-100 bg-opacity-25 hover:bg-opacity-25 hover:bg-thatBlue-100 border-thatBlue-500 text-thatBlue-700 hover:text-thatBlue-700 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
    image:
      'text-thatBlue-500 group-hover:text-thatBlue-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6',
  };

  const asideDefault = {
    item: 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
    image:
      'text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6',
  };

  const isSelected = component => {
    let results = asideDefault;

    if (profileComponent === component) {
      results = asideSelected;
    }

    return results;
  };

  $: switch ($router.params.aside) {
    case 'primary':
      profileComponent = Profile;
      break;

    case 'shared':
      profileComponent = SharedProfile;
      break;

    default:
      profileComponent = Profile;
      break;
  }
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Your Profiles" />
  </div>

  <div slot="body">
    <main class="-mx-6 relative">
      <div
        class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        <aside class="py-6 lg:col-span-3">
          <div class="sticky top-4">
            <nav>
              <a
                href="/my/profiles/primary"
                on:click|preventDefault="{() => {
                  navigateTo('/my/profiles/primary');
                  profileComponent = Profile;
                }}"
                class="{profileComponent === Profile
                  ? asideSelected.item
                  : asideDefault.item}">
                <User
                  classes="{profileComponent === Profile
                    ? asideSelected.image
                    : asideDefault.image}" />
                <span class="truncate"> Your Profile </span>
              </a>

              <a
                href="/my/profiles/shared"
                on:click|preventDefault="{() => {
                  navigateTo('/my/profiles/shared');
                  profileComponent = SharedProfile;
                }}"
                class="{profileComponent === SharedProfile
                  ? asideSelected.item
                  : asideDefault.item}">
                <Badge
                  classes="{profileComponent === SharedProfile
                    ? asideSelected.image
                    : asideDefault.image}" />
                <span class="truncate">Shared Profile </span>
              </a>
            </nav>
          </div>
        </aside>

        <div class="divide-y divide-gray-200 lg:col-span-9 py-4 px-4">
          <svelte:component this="{profileComponent}" />
        </div>
      </div>
    </main>
  </div>
</StackedLayout>
