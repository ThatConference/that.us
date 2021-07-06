<script>
  export let speakers = [];

  import { Link } from 'yrv';
  import Icon from 'svelte-awesome';
  import { facebook, youtubePlay, twitch } from 'svelte-awesome/icons';
  import PanelSpeakerCard from './PanelSpeakerCard.svelte';

  let displayedSpeakers = speakers.filter(s => s);
</script>

<div>
  <div class="bg-white pb-12 lg:pb-20">
    <div class="relative z-0">
      <div class="absolute inset-0 h-5/6 bg-thatBlue-800 lg:h-2/3"></div>
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative lg:grid lg:grid-cols-7">
          <div
            class="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0
            lg:col-start-2 lg:col-end-7 lg:row-start-1 lg:row-end-4">
            <div class="relative z-10 rounded-lg shadow-xl">
              <div class="pointer-events-none absolute inset-0 rounded-lg">
              </div>
              <div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
                <ul class="flex justify-around">
                  {#each displayedSpeakers as speaker (speaker.id)}
                    <li>
                      <PanelSpeakerCard speaker="{speaker}" />
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
