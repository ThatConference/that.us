<script>
  import { Router, router, Route, navigateTo } from 'yrv';

  import config from './config';
  import { isAuthenticated, user } from './utilities/security.js';

  let documentReferrer;
  const { eventId } = config;

  function isLoggedIn() {
    documentReferrer = `${$router.path}${window.location.search}`;

    if (!$user.email_verified) {
      navigateTo('/verify-account');
    }

    return $isAuthenticated;
  }

  // root
  import Home from './routes/home/Home.svelte';
  import Login from './routes/Login.svelte';
  import Signup from './routes/Signup.svelte';
  import LoginSuccess from './routes/LoginSuccess.svelte';
  import Logout from './routes/Logout.svelte';
  import NotFound from './routes/NotFound.svelte';
  import VerifyAccount from './routes/VerifyAccount.svelte';

  // Members
  import Members from './routes/members/Members.svelte';
  import Member from './routes/members/Member.svelte';

  // partners
  import Partners from './routes/partners/Partners.svelte';
  import Partner from './routes/partners/Partner.svelte';
  import Job from './routes/partners/Job.svelte';
  import PastPartners from './routes/partners/PastPartners.svelte';
  import PartnerLeads from './routes/partners/Leads.svelte';

  // support
  import FaqPage from './routes/support/FAQ.svelte';
  import NewUserWelcome from './routes/support/Welcome.svelte';
  import WhatIsAnActivity from './routes/support/WhatIsAnActivity.svelte';
  import JoiningAnActivity from './routes/support/JoiningAnActivity.svelte';
  import CreateAnActivity from './routes/support/CreateAnActivity.svelte';
  import StayingUpToDate from './routes/support/StayingUpToDate.svelte';
  import ChangeLog from './routes/releases/ChangeLog.svelte';
  import ChangeLogMissed from './routes/releases/Missed.svelte';
  import CovidPolicies from './routes/support/Covid.svelte';
  import Travel from './routes/support/Travel.svelte';

  // my
  import Settings from './routes/my/Settings.svelte';
  import MyFavorites from './routes/my/Favorites.svelte';
  import MySubmissions from './routes/my/Submissions.svelte';
  import Profiles from './routes/my/Profiles.svelte';
  import Network from './routes/my/Network.svelte';

  // Activities
  import Daily from './routes/activities/Daily.svelte';
  import Activity from './routes/activities/Activity.svelte';
  import Create from './routes/activities/Create.svelte';
  import PostCreate from './routes/activities/PostCreate.svelte';
  import EditActivity from './routes/activities/Edit.svelte';
  import EventActivities from './routes/activities/Event.svelte';
  import CallForCounselors from './routes/activities/CallForCounselors.svelte';

  // Communities
  import Community from './routes/communities/Community.svelte';
  import Communities from './routes/communities/Communities.svelte';

  // join
  import Live from './routes/join/Live.svelte';
  import JoinAccessDenied from './routes/join/AccessDenied.svelte';

  // orders
  import OrderSummary from './routes/orders/Summary.svelte';
  import OrderSuccess from './routes/orders/Success.svelte';
  import ThatSuccess from './routes/orders/ThatSuccess.svelte';
  import OrderCanceled from './routes/orders/Canceled.svelte';

  // Landing pages
  import Pricing from './routes/membership/Pricing.svelte';

  // events
  import EventPartners from './routes/partners/EventPartners.svelte';
  import EventList from './routes/events/Events.svelte';
  import EventLanding from './routes/events/Event.svelte';
  import Tickets from './routes/events/Tickets.svelte';

  // event
  import Checkin from './routes/event/Checkin.svelte';

  // speakers
  import SpeakersAccept from './routes/speakers/Accept.svelte';

  // Promotions
  import Promo from './routes/promo/Promo.svelte';
</script>

<!-- prettier-ignore -->

<Router>
  <Route exact component="{Home}" />
  <Route exact path="/login" component="{Login}" documentReferrer="{documentReferrer}" />
  <Route exact path="/signup" component="{Signup}" documentReferrer="{documentReferrer}" />
  <Route exact path="/login-success" component="{LoginSuccess}" />
  <Route exact path="/logout" component="{Logout}" />
  <Route exact path="/changelog" component="{ChangeLog}" />
  <Route exact path="/changelog-missed" component="{ChangeLogMissed}" />

  <Route exact path="/membership/pricing" component="{Pricing}" />
  <Route path="/speakers/accept"  component="{SpeakersAccept}" condition="{isLoggedIn}" redirect="/login" />
  
  <Route exact path="/not-found" component="{NotFound}" />
  <Route exact path="/verify-account" component="{VerifyAccount}" />
  
  <Router path="/join">
    <Route exact path="/access-denied/:activityId" component="{JoinAccessDenied}" />
    <Route exact path="/:activityId" component="{Live}" condition="{isLoggedIn}" redirect="/login" />
  </Router>
  
  <Router path="/partners">
    <Route exact component="{Partners}" />
    <Route exact path="/:partner" component="{Partner}" />
    <Route exact path="/:partner/jobs/:job" component="{Job}" />
    <Route exact path="/past" component="{PastPartners}" />
    <Route exact path="/leads" redirect="/partners/leads/7wiuRWI7EZjcdF4e9MDz" />
    <Route exact path="/leads/:eventId" component="{PartnerLeads}" condition="{isLoggedIn}" redirect="/login"/>
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
    <Route exact path="/success" component="{OrderSuccess}" />
    <Route exact path="/that-success" component="{ThatSuccess}" condition="{isLoggedIn}" redirect="/login"/>
    <Route exact path="/canceled" component="{OrderCanceled}" />
  </Router>

  <Router path='/support'>
    <Route exact redirect="/support/welcome" />
    <Route exact path="/faq" component="{FaqPage}" />
    <Route exact path="/welcome" component="{NewUserWelcome}" />
    <Route exact path="/what-is-an-activity" component="{WhatIsAnActivity}" />
    <Route exact path="/joining-an-activity" component="{JoiningAnActivity}" />
    <Route exact path="/creating-an-activity" component="{CreateAnActivity}" />
    <Route exact path="/staying-up-to-date" component="{StayingUpToDate}" />
    <Route exact path="/covid-policies" component="{CovidPolicies}" />
    <Route exact path="/travel" component="{Travel}" />
  </Router>

  <Router path="/events">
    <Route exact path="/" component="{EventList}" />
    <Route exact path="/:id/:name" component="{EventLanding}" />
    <Route exact path="/:id/:name/tickets" component="{Tickets}" />
    <Route exact path="/:id/:name/partners" component="{EventPartners}" />
  </Router>
  
  <Router path="/event">
    <Route exact path="/" component="{NotFound}" />
    <Route exact path="/:eventName/:year/checkin" component="{Checkin}" condition="{isLoggedIn}" redirect="/login" />
    
  </Router>
  
  <Router path='/activities'>
    <Route exact component="{Daily}" />
    <Route exact path="/:id" component="{Activity}" />
    <Route exact path="/:id/:name" component="{EventActivities}" />
    <Route exact path="/create" redirect="{`/activities/create#/event/${eventId}`}" />
    <Route exact path="/create#/event/:eventId" component="{Create}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/post-create#/event/:eventId" component="{PostCreate}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/call-for-counselors" redirect="/activities/call-for-counselors/wi/2021" />
    <Route exact path="/call-for-counselors/:state/:year" component="{CallForCounselors}" />
    <Route path="/edit/*activityId" component="{EditActivity}" condition="{isLoggedIn}" redirect="/login"/>  
  </Router>
  
  <Router path="/my">
    <Route exact redirect="/my/settings/badges" />
    <Route exact path="/settings" redirect="/my/settings/badges" />
    
    <Route exact path="/settings/:aside" component="{Settings}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/settings/profile" redirect="/my/profiles/primary" />
    
    <Route exact path="/profiles" redirect="/my/profiles/primary" />
    <Route exact path="/profiles/:aside" component="{Profiles}" condition="{isLoggedIn}" redirect="/login" />

    <Route exact path="/network" redirect="/my/network/sponsors" />
    <Route exact path="/network/:aside" component="{Network}" condition="{isLoggedIn}" redirect="/login" />
    
    <Route exact path="/favorites" component="{MyFavorites}" condition="{isLoggedIn}" redirect="/login" />
    <Route exact path="/submissions" component="{MySubmissions}" condition="{isLoggedIn}" redirect="/login" />
  </Router>
  
  <Router path="/promo">
    <Route exact path="/" component="{Promo}" />
    <Route exact path="/10years" redirect="/promo/claim?eventId=7wiuRWI7EZjcdF4e9MDz" />
    <Route path="/claim" component="{Promo}" />
  </Router>

  <!-- Badge Redirects -->
  <Route exact path="/camp" redirect="/activities/wi/2021" />
  <Route exact path="/family" redirect="/activities/wi/2021?track=family" />
  
  <Route fallback>
    <NotFound />
  </Route>
</Router>
