<script>
  import { Form, Input } from 'sveltejs-forms'; //https://github.com/mdauner/sveltejs-forms
  import { tagEvent } from '../../utilities/gtag';
  import { Waiting } from '../../elements';

  let submitted = false;

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    tagEvent('newsletter_signup', 'user', values.email);
    setSubmitting(true);

    const data = new FormData();
    const info = Object.keys(values);
    info.forEach(i => data.append(i, values[i]));

    fetch('https://thatconference.activehosted.com/proc.php', {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    })
      .then(r => {
        setSubmitting(false);
        submitted = true;
      })
      .catch(error => console.error('Request failed', error));
  }
</script>

<section class="bg-thatBlue-700 py-12 lg:py-16">
  <div
    class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex
      lg:items-center"
  >
    <div class="lg:w-0 lg:flex-1">
      <h2
        class="text-3xl leading-9 font-extrabold tracking-tight text-white
          sm:text-4xl sm:leading-10"
        id="newsletter-headline"
      >
        Stay in the know
      </h2>
      {#if !submitted}
        <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
          Another list? We know you're busy enough just trying to get your own
          product shipped. We also don't want to become more noise for you. We
          don't email much, honestly we're busy too, but when we do it's to make
          sure you stay in the know.
        </p>
      {:else}
        <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
          Thank you for signing up. Welcome to THAT family.
        </p>
        <p class="mt-3 text-sm leading-5 text-gray-300">
          Please check your inbox to confirm your subscription.
        </p>
      {/if}
    </div>
    <div class="mt-8 lg:mt-0 lg:ml-8">
      {#if !submitted}
        <Form
          on:submit="{handleSubmit}"
          aria-labelledby="newsletter-headline"
          validateOnBlur="{false}"
          validateOnChange="{false}"
          let:isSubmitting
        >
          {#if !isSubmitting}
            <div class="sm:flex">
              <Input type="hidden" name="u" value="16" />
              <Input type="hidden" name="f" value="16" />
              <Input type="hidden" name="s" />
              <Input type="hidden" name="c" value="0" />
              <Input type="hidden" name="m" value="0" />
              <Input type="hidden" name="act" value="sub" />
              <Input type="hidden" name="v" value="2" />
              <Input
                name="email"
                aria-label="Email address"
                type="email"
                required
                class="appearance-none w-full px-5 py-3 border
                  border-transparent text-base leading-6 rounded-md
                  text-gray-900 bg-white placeholder-gray-500 focus:outline-none
                  focus:placeholder-gray-400 transition duration-150 ease-in-out
                  sm:max-w-xs"
                placeholder="Enter your email"
              />
              <div
                class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
              >
                <button
                  type="submit"
                  class="w-full flex items-center justify-center px-5 py-3
                    text-base leading-6 font-medium rounded-md shadow
                    bg-thatBlue-100 border border-transparent text-thatBlue-500
                    hover:bg-thatBlue-500 hover:text-white focus:bg-thatBlue-500
                    focus:text-white focus:outline-none
                    focus:ring-thatBlue-500 focus:border-thatBlue-800
                    transition duration-150 ease-in-out"
                >
                  Add me
                </button>
              </div>
            </div>
          {:else}
            <div class="flex flex-grow justify-center">
              <Waiting />
            </div>
          {/if}
        </Form>
        <p class="mt-3 text-sm leading-5 text-gray-300">
          We care about the protection of your data. Read our
          <a
            href="https://www.thatconference.com/privacy-policy"
            class="text-white
              font-medium underline"
          >
            Privacy Policy.
          </a>
        </p>
      {/if}
    </div>
  </div>
</section>
