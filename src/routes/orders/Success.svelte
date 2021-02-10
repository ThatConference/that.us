<script>
  import { onMount, getContext } from 'svelte';

  import Layout from './components/_Layout.svelte';
  import { LinkButton } from '../../elements';

  const { send } = getContext('cart');

  onMount(() => {
    send('CLEAR_CART');
  });
</script>

<Layout>
  <div class="space-y-12">
    <div class="text-base max-w-prose mx-auto lg:max-w-none">
      <h2
        class="text-base text-thatOrange-400 font-semibold tracking-wide uppercase"
      >
        Payment Recieved
      </h2>
      <p
        class="mt-6 text-4xl sm:text-5xl sm:tracking-tight lg:text-6xl leading-8 font-extrabold tracking-tight text-gray-900"
      >
        Thank You
      </p>
    </div>

    <div class="relative">
      <div class="prose text-lg text-gray-500 mx-auto lg:max-w-none">
        <p>
          Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
          urna sed consectetur neque tristique pellentesque. Blandit amet, sed
          aenean erat arcu morbi. Cursus faucibus nunc nisl netus morbi vel
          porttitor vitae ut. Amet vitae fames senectus vitae.
        </p>

        <p>
          Sollicitudin tristique eros erat odio sed vitae, consequat turpis
          elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra
          donec ut volutpat donec laoreet quam urna.
        </p>
        <ul>
          <li>Quis elit egestas venenatis mattis dignissim.</li>
          <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
          <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
        </ul>
        <p>
          Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel
          ultricies. Vulputate aliquet velit faucibus semper. Pellentesque in
          venenatis vestibulum consectetur nibh id. In id ut tempus egestas.
          Enim sit aliquam nec, a. Morbi enim fermentum lacus in. Viverra.
        </p>
        <h3>We’re here to help</h3>
        <p>
          Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur
          pretium in volutpat, diam. Montes, magna cursus nulla feugiat
          dignissim id lobortis amet. Laoreet sem est phasellus eu proin massa,
          lectus. Diam rutrum posuere donec ultricies non morbi. Mi a platea
          auctor mi.
        </p>
      </div>
      <div class="mt-12 flex justify-end space-x-5">
        <LinkButton
          href="/my/settings/order-history"
          text="View Your Order History"
        />

        <LinkButton
          href="/my/settings/order-history"
          text="View Your Order History"
        />
      </div>
    </div>
  </div>
</Layout>
