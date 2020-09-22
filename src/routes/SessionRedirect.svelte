<script>
  import { navigateTo } from 'yrv';

  let currentPath = window.location.pathname.replace('sessions', 'activities');
  navigateTo(`${currentPath}${window.location.search}`);
</script>
