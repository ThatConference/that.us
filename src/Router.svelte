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
  import Logout from './routes/Logout.svelte';
  import FAQ from './routes/support/FAQ.svelte';
  import Partners from './routes/partners/Partners.svelte';
  import Partner from './routes/partners/Partner.svelte';
  import Members from './routes/members/Members.svelte';
  import Member from './routes/members/Member.svelte';
  import NotFound from './routes/NotFound.svelte';

  // support
  import NewUserWelcome from './routes/support/Welcome.svelte';
  import WhatIsAnActivity from './routes/support/WhatIsAnActivity.svelte';
  import JoiningAnActivity from './routes/support/JoiningAnActivity.svelte';
  import CreateAnActivity from './routes/support/CreateAnActivity.svelte';
  import StayingUpToDate from './routes/support/StayingUpToDate.svelte';

  // my
  import MyFavorites from './routes/my/Favorites.svelte';
  import MySubmissions from './routes/my/Submissions.svelte';
  import Profile from './routes/my/Profile.svelte';
  import Badges from './routes/my/Badges.svelte';

  // Activities
  import Event from './routes/events/List.svelte';
  import List from './routes/activities/List.svelte';
  import Activity from './routes/activities/Activity.svelte';
  import Create from './routes/activities/Create.svelte';
  import EditActivity from './routes/activities/Edit.svelte';
  import SessionRedirect from './routes/SessionRedirect.svelte';

  // Communities
  import Community from './routes/communities/Community.svelte';
  import Communities from './routes/communities/Communities.svelte';

  import ChangeLog from './routes/releases/ChangeLog.svelte';
  import ChangeLogMissed from './routes/releases/Missed.svelte';

  // join
  import Live from './routes/join/Live.svelte';
</script>

<Router>
  <Route exact path="/" component="{Home}" />
  <Route
    exact
    path="/login"
    component="{Login}"
    documentReferrer="{documentReferrer}"
  />
  <Route exact path="/logout" component="{Logout}" />
  <Route exact path="/changelog" component="{ChangeLog}" />
  <Route exact path="/changelog-missed" component="{ChangeLogMissed}" />

  <Route exact path="/partners" component="{Partners}" />
  <Route exact path="/partners/:partner" component="{Partner}" />

  <Route exact path="/members" component="{Members}" />
  <Route exact path="/members/:member" component="{Member}" />

  <Route exact path="/communities" component="{Communities}" />
  <Route exact path="/communities/:community" component="{Community}" />

  <Route exact path="/activities" component="{List}" />
  <Route path="/sessions" component="{SessionRedirect}" />

  <Route exact path="/support/faq" component="{FAQ}" />
  <Route exact path="/support/welcome" component="{NewUserWelcome}" />
  <Route
    exact
    path="/support/what-is-an-activity"
    component="{WhatIsAnActivity}"
  />
  <Route
    exact
    path="/support/joining-an-activity"
    component="{JoiningAnActivity}"
  />
  <Route
    exact
    path="/support/creating-an-activity"
    component="{CreateAnActivity}"
  />
  <Route
    exact
    path="/support/staying-up-to-date"
    component="{StayingUpToDate}"
  />

  <Route
    exact
    path="/activities/create"
    component="{Create}"
    condition="{isLoggedIn}"
    redirect="/login"
  />

  <Route
    exact
    path="/activities/edit/:activityId"
    component="{EditActivity}"
    condition="{isLoggedIn}"
    redirect="/login"
  />

  <Route exact path="/activities/:activityId" component="{Activity}" />
  <Route exact path="/events/:eventName" component="{Event}" />

  <Route
    exact
    path="/join/:activityId"
    component="{Live}"
    condition="{isLoggedIn}"
    redirect="/login"
  />

  <Route
    exact
    path="/my/favorites"
    component="{MyFavorites}"
    condition="{isLoggedIn}"
    redirect="/login"
  />

  <Route
    exact
    path="/my/submissions"
    component="{MySubmissions}"
    condition="{isLoggedIn}"
    redirect="/login"
  />

  <Route
    exact
    path="/my/profile"
    component="{Profile}"
    condition="{isLoggedIn}"
    redirect="/login"
  />

  <Route
    exact
    path="/my/badges"
    component="{Badges}"
    condition="{isLoggedIn}"
    redirect="/login"
  />

  <Route exact path="/not-found" component="{NotFound}" />

  <Route fallback>
    <NotFound />
  </Route>
</Router>
