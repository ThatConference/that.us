<script>
  export let title;
  export let shortDescription;
  export let id;
  export let startTime;
  export let durationInMinutes;
  export let slug;

  import Icon from 'svelte-awesome';
  import { calendarCheckO } from 'svelte-awesome/icons';

  import ical from '../../../utilities/ical.js';

  function createICal() {
    return ical(title).create({
      title,
      shortDescription,
      id,
      startTime,
      durationInMinutes,
    });
  }
</script>

<a
  href="{createICal()}"
  download="{`${slug}@that.us.ics`}"
  class="inline-flex items-center justify-center py-2 px-4"
>
  <Icon data="{calendarCheckO}" class="-ml-1 mr-2 h-4 w-4" />
  <span>Add To Calendar</span>
</a>
