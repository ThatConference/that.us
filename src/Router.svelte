<script>
  import { Router, Route } from 'yrv';

  import { isAuthenticated } from './utilities/security.js';

  let documentReferrer;
  function isLoggedIn() {
    documentReferrer = window.location.pathname;
    return $isAuthenticated;
  }

  // root
  import Home from './routes/home/Home.svelte';
  import Login from './routes/Login.svelte';
  import LoginSuccess from './routes/LoginSuccess.svelte';
  import Logout from './routes/Logout.svelte';
  import Partners from './routes/partners/Partners.svelte';
  import Partner from './routes/partners/Partner.svelte';
  import Members from './routes/members/Members.svelte';
  import Member from './routes/members/Member.svelte';
  import NotFound from './routes/NotFound.svelte';

  // support
  import FaqPage from './routes/support/FAQ.svelte';
  import NewUserWelcome from './routes/support/Welcome.svelte';
  import WhatIsAnActivity from './routes/support/WhatIsAnActivity.svelte';
  import JoiningAnActivity from './routes/support/JoiningAnActivity.svelte';
  import CreateAnActivity from './routes/support/CreateAnActivity.svelte';
  import StayingUpToDate from './routes/support/StayingUpToDate.svelte';
  import ChangeLog from './routes/releases/ChangeLog.svelte';
  import ChangeLogMissed from './routes/releases/Missed.svelte';

  // my
  import Settings from './routes/my/Settings.svelte';
  import MyFavorites from './routes/my/Favorites.svelte';
  import MySubmissions from './routes/my/Submissions.svelte';

  // Activities
  import Daily from './routes/activities/Daily.svelte';
  import Activity from './routes/activities/Activity.svelte';
  import Create from './routes/activities/Create.svelte';
  import EditActivity from './routes/activities/Edit.svelte';
  import EventActivities from './routes/activities/Event.svelte';

  // Communities
  import Community from './routes/communities/Community.svelte';
  import Communities from './routes/communities/Communities.svelte';

  // join
  import Live from './routes/join/Live.svelte';

  // orders
  import OrderSummary from './routes/orders/Summary.svelte';
  import OrderSuccess from './routes/orders/Success.svelte';
  import OrderCancelled from './routes/orders/Cancelled.svelte';

  // Landing pages
  import Pricing from './routes/membership/Pricing.svelte';

  import EventList from './routes/events/Events.svelte';
  import EventLanding from './routes/events/Event.svelte';
</script>

<!-- prettier-ignore -->

<Router>
  <Route exact component="{Home}" />
  <Route exact path="/login" component="{Login}" documentReferrer="{documentReferrer}" />
  <Route exact path="/login-success" component="{LoginSuccess}" />
  <Route exact path="/logout" component="{Logout}" />
  <Route exact path="/changelog" component="{ChangeLog}" />
  <Route exact path="/changelog-missed" component="{ChangeLogMissed}" />

  <Route exact path="/join/:activityId" component="{Live}" condition="{isLoggedIn}" redirect="/login" />
  <Route exact path="/membership/pricing" component="{Pricing}" />
  <Route exact path="/not-found" component="{NotFound}" />

  <Router path="/partners">
    <Route exact component="{Partners}" />
    <Route exact path="/:partner" component="{Partner}" />
  </Router>

  <Router path="/members">
    <Route exact component="{Members}" />
    <Route exact path="/:member" component="{Member}" />
  </Router>

  <Router path="/communities">
    <Route exact component="{Communities}" />
    <Route exact path="/:community" component="{Community}" />
  </Router>

  <Router path="/orders">
    <Route exact redirect="/orders/summary" />
    <Route exact path="/summary" component="{OrderSummary}" />
    <Route exact path="/success" component="{OrderSuccess}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/cancelled" component="{OrderCancelled}" condition="{isLoggedIn}" redirect="/login" />
  </Router>

  <Router path='/support'>
    <Route exact redirect="/support/welcome" />
    <Route exact path="/faq" component="{FaqPage}" />
    <Route exact path="/welcome" component="{NewUserWelcome}" />
    <Route exact path="/what-is-an-activity" component="{WhatIsAnActivity}" />
    <Route exact path="/joining-an-activity" component="{JoiningAnActivity}" />
    <Route exact path="/creating-an-activity" component="{CreateAnActivity}" />
    <Route exact path="/staying-up-to-date" component="{StayingUpToDate}" />
  </Router>

  <Router path='/activities'>
    <Route exact component="{Daily}" />
    <Route exact path="/:id" component="{Activity}" />
    <Route exact path="/:id/:name" component="{EventActivities}" />
    <Route exact path="/create" component="{Create}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/edit/:activityId" component="{EditActivity}" condition="{isLoggedIn}" redirect="/login" />
  </Router>

  <Router path="/events">
    <Route exact path="/" component="{EventList}" />
    <Route exact path="/:id/:name" component="{EventLanding}" />
  </Router>

  <Router path="/my">
    <Route exact redirect="/my/settings/profile" />
    <Route exact path="/settings" redirect="/my/settings/profile" />
    <Route exact path="/settings/:aside" component="{Settings}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/favorites" component="{MyFavorites}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/submissions" component="{MySubmissions}" condition="{isLoggedIn}" redirect="/login" />
  </Router>
  
  <Route fallback>
    <NotFound />
  </Route>
</Router>
