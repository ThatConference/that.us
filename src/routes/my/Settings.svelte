<script>
  import { navigateTo, router } from 'yrv';

  import { User, Badge, CreditCard, Ticket } from '../../elements/svgs';
  import Nav from '../../components/nav/interiorNav/Top.svelte';
  import StackedLayout from '../../elements/layouts/StackedLayout.svelte';
  import { ActionHeader } from '../../elements';

  import Profile from './components/_Profile.svelte';
  import Badges from './components/_Badges.svelte';
  import OrderHistory from './components/_OrderHistory.svelte';
  import Tickets from './components/_Tickets.svelte';

  console.log('here?');

  let settingsComponent;

  const asideSelected = {
    item:
      'bg-thatBlue-100 bg-opacity-25 hover:bg-opacity-25 hover:bg-thatBlue-100 border-thatBlue-500 text-thatBlue-700 hover:text-thatBlue-700 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
    image:
      'text-thatBlue-500 group-hover:text-thatBlue-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6',
  };

  const asideDefault = {
    item:
      'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium',
    image:
      'text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6',
  };

  const isSelected = component => {
    let results = asideDefault;

    if (settingsComponent === component) {
      results = asideSelected;
    }

    return results;
  };

  $: switch ($router.params.aside) {
    case 'profile':
      settingsComponent = Profile;
      break;

    case 'badges':
      settingsComponent = Badges;
      break;

    case 'tickets':
      settingsComponent = Tickets;
      break;

    case 'order-history':
      settingsComponent = OrderHistory;
      break;

    default:
      // navigateTo('/my/settings/profile'); // todo not sure if we want to do this or not.
      settingsComponent = Profile;
      break;
  }
</script>

<StackedLayout>
  <div slot="header">
    <Nav />
    <ActionHeader title="Your Settings" />
  </div>

  <div slot="body">
    <main class="-mx-6 relative">
      <div
        class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        <aside class="py-6 lg:col-span-3">
          <div class="sticky top-4">
            <nav>
              <a
                href="/my/settings/profile"
                on:click|preventDefault="{() => {
                  navigateTo('/my/settings/profile');
                  settingsComponent = Profile;
                }}"
                class="{settingsComponent === Profile
                  ? asideSelected.item
                  : asideDefault.item}">
                <User
                  classes="{settingsComponent === Profile
                    ? asideSelected.image
                    : asideDefault.image}" />
                <span class="truncate"> Your Profile </span>
              </a>

              <a
                href="/my/settings/badges"
                on:click|preventDefault="{() => {
                  navigateTo('/my/settings/badges');
                  settingsComponent = Badges;
                }}"
                class="{settingsComponent === Badges
                  ? asideSelected.item
                  : asideDefault.item}">
                <Badge
                  classes="{settingsComponent === Badges
                    ? asideSelected.image
                    : asideDefault.image}" />
                <span class="truncate"> Merit Badges </span>
              </a>

              <a
                href="/my/settings/order-history"
                on:click|preventDefault="{() => {
                  navigateTo('/my/settings/order-history');
                  settingsComponent = OrderHistory;
                }}"
                class="{settingsComponent === OrderHistory
                  ? asideSelected.item
                  : asideDefault.item}">
                <CreditCard
                  classes="{settingsComponent === OrderHistory
                    ? asideSelected.image
                    : asideDefault.image}" />
                <span class="truncate"> Order History </span>
              </a>

              <a
                href="/my/settings/tickets"
                on:click|preventDefault="{() => {
                  navigateTo('/my/settings/tickets');
                  settingsComponent = Tickets;
                }}"
                class="{settingsComponent === Tickets
                  ? asideSelected.item
                  : asideDefault.item}">
                <Ticket
                  classes="{settingsComponent === Tickets
                    ? asideSelected.image
                    : asideDefault.image}" />
                <span class="truncate"> Event Tickets </span>
              </a>
            </nav>
          </div>
        </aside>

        <div class="divide-y divide-gray-200 lg:col-span-9 py-4 px-4">
          <svelte:component this="{settingsComponent}" />
        </div>
      </div>
    </main>
  </div>
</StackedLayout>
