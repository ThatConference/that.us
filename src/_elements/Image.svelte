<script>
  export let src;
  export let alt;

  let params = '?mask=ellipse&w=500&h=500&fit=crop';
</script>

<img src="{`${src}${params}`}" {alt} class="h-12 w-12 rounded-full" />
