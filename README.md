# THAT.US

[![GitHub issues open](https://img.shields.io/github/issues/thatconference/that.us.svg)](https://github.com/thatconference/that.us/issues) [![release](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/thatconference/that.us/issues) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-49-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Get started

THAT.us is a SvelteKit application. It uses Tailwind for styling, and makes GraphQL calls against our Api, <https://api.that.tech/view>.

### local dependencies

- nodejs v18.x
- npm v8.0.0

### project dependencies

We use nodenv to manage our node versions, it's configed in this repo.

Install the project dependencies...

```bash
  npm i
```

## Building and running in development

### env configuration

You will find the env settings in .env.sample. The current settings in the .env.sample will allow you to do development on pages which do not require authentication. If you're interested in working on those pages in the project you will need some additional values. Email us at <hello@that.us>.

### running

```bash
  npm run dev
```

Navigate to [localhost:5173](http://localhost:5173). You should see your app running. Edit a component file in `src`, save it. It's setup with HMR and Tailwind's JIT. You should see your changes as soon as you make them.

## Building and running in production mode

```bash
  npm run local:build
  npm run preview
```

Mind you the build servers will run the following:

```bash
  npm run build
```

The only difference is how we're managing env settings.

## Commiting

We now follow the commitlint conventional spec.

<https://www.npmjs.com/package/@commitlint/config-conventional>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://unspecified.io"><img src="https://avatars1.githubusercontent.com/u/772569?v=4?s=100" width="100px;" alt="Clark Sell"/><br /><sub><b>Clark Sell</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=csell5" title="Code">💻</a> <a href="#content-csell5" title="Content">🖋</a> <a href="#design-csell5" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.brettski.com"><img src="https://avatars3.githubusercontent.com/u/473633?v=4?s=100" width="100px;" alt="Brett Slaski"/><br /><sub><b>Brett Slaski</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=brettski" title="Code">💻</a> <a href="#infra-brettski" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-brettski" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://saragibby.com"><img src="https://avatars1.githubusercontent.com/u/82035?v=4?s=100" width="100px;" alt="Sara Gibbons"/><br /><sub><b>Sara Gibbons</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/pulls?q=is%3Apr+reviewed-by%3Asaragibby" title="Reviewed Pull Requests">👀</a> <a href="#userTesting-saragibby" title="User Testing">📓</a> <a href="https://github.com/ThatConference/that.us/commits?author=saragibby" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://leanpub.com/os-support"><img src="https://avatars3.githubusercontent.com/u/240650?v=4?s=100" width="100px;" alt="Andrew Hooker"/><br /><sub><b>Andrew Hooker</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3AGeekOnCoffee" title="Bug reports">🐛</a> <a href="#userTesting-GeekOnCoffee" title="User Testing">📓</a> <a href="https://github.com/ThatConference/that.us/pulls?q=is%3Apr+reviewed-by%3AGeekOnCoffee" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ThatConference/that.us/commits?author=GeekOnCoffee" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gemolle"><img src="https://avatars0.githubusercontent.com/u/60487024?v=4?s=100" width="100px;" alt="Erin Gemoll"/><br /><sub><b>Erin Gemoll</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Agemolle" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TheTopher"><img src="https://avatars1.githubusercontent.com/u/6912293?v=4?s=100" width="100px;" alt="TheTopher"/><br /><sub><b>TheTopher</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3ATheTopher" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mcookWI"><img src="https://avatars0.githubusercontent.com/u/5367626?v=4?s=100" width="100px;" alt="Mike"/><br /><sub><b>Mike</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3AmcookWI" title="Bug reports">🐛</a> <a href="#userTesting-mcookWI" title="User Testing">📓</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MFazio23"><img src="https://avatars0.githubusercontent.com/u/782519?v=4?s=100" width="100px;" alt="Michael Fazio"/><br /><sub><b>Michael Fazio</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=MFazio23" title="Code">💻</a> <a href="https://github.com/ThatConference/that.us/issues?q=author%3AMFazio23" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PrairieGrl"><img src="https://avatars1.githubusercontent.com/u/66928505?v=4?s=100" width="100px;" alt="PrairieGrl"/><br /><sub><b>PrairieGrl</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3APrairieGrl" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rolandolopez"><img src="https://avatars3.githubusercontent.com/u/1054389?v=4?s=100" width="100px;" alt="Rolando Lopez"/><br /><sub><b>Rolando Lopez</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Arolandolopez" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.jeana.dev"><img src="https://avatars2.githubusercontent.com/u/194128?v=4?s=100" width="100px;" alt="Jeana"/><br /><sub><b>Jeana</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Atsidel" title="Bug reports">🐛</a> <a href="https://github.com/ThatConference/that.us/commits?author=tsidel" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lukeplamann"><img src="https://avatars3.githubusercontent.com/u/9270720?v=4?s=100" width="100px;" alt="lukeplamann"/><br /><sub><b>lukeplamann</b></sub></a><br /><a href="#ideas-lukeplamann" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://youtube.com/eddiejaoude?sub_confirmation=1"><img src="https://avatars3.githubusercontent.com/u/624760?v=4?s=100" width="100px;" alt="Eddie Jaoude"/><br /><sub><b>Eddie Jaoude</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=eddiejaoude" title="Code">💻</a> <a href="https://github.com/ThatConference/that.us/issues?q=author%3Aeddiejaoude" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.microsoft.com"><img src="https://avatars0.githubusercontent.com/u/7679720?v=4?s=100" width="100px;" alt="David Pine"/><br /><sub><b>David Pine</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=IEvangelist" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://kamranicus.com/"><img src="https://avatars1.githubusercontent.com/u/563819?v=4?s=100" width="100px;" alt="Kamran Ayub"/><br /><sub><b>Kamran Ayub</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Akamranayub" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kenssamson"><img src="https://avatars3.githubusercontent.com/u/9221745?v=4?s=100" width="100px;" alt="Ken Samson"/><br /><sub><b>Ken Samson</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Akenssamson" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ps2goat"><img src="https://avatars0.githubusercontent.com/u/5384732?v=4?s=100" width="100px;" alt="asdfasdfasdfasdf asd"/><br /><sub><b>asdfasdfasdfasdf asd</b></sub></a><br /><a href="#ideas-ps2goat" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zo0o0ot"><img src="https://avatars3.githubusercontent.com/u/876146?v=4?s=100" width="100px;" alt="Ross Larson"/><br /><sub><b>Ross Larson</b></sub></a><br /><a href="#ideas-zo0o0ot" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://lgbtq.dev"><img src="https://avatars0.githubusercontent.com/u/2401816?v=4?s=100" width="100px;" alt="Caden Sumner"/><br /><sub><b>Caden Sumner</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=Ghosts" title="Code">💻</a> <a href="https://github.com/ThatConference/that.us/issues?q=author%3AGhosts" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/asharonbaltazar"><img src="https://avatars3.githubusercontent.com/u/58940073?v=4?s=100" width="100px;" alt="asharonbaltazar"/><br /><sub><b>asharonbaltazar</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=asharonbaltazar" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/teyd"><img src="https://avatars2.githubusercontent.com/u/48223730?v=4?s=100" width="100px;" alt="teyd"/><br /><sub><b>teyd</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Ateyd" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.girlwritescode.com/"><img src="https://avatars0.githubusercontent.com/u/514037?v=4?s=100" width="100px;" alt="Sharon Cichelli"/><br /><sub><b>Sharon Cichelli</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=scichelli" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DrewKjell"><img src="https://avatars0.githubusercontent.com/u/24257136?v=4?s=100" width="100px;" alt="DrewKjell"/><br /><sub><b>DrewKjell</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3ADrewKjell" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://agapito.dev"><img src="https://avatars0.githubusercontent.com/u/51180770?v=4?s=100" width="100px;" alt="Thales Agapito"/><br /><sub><b>Thales Agapito</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=thalesagapito" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ReazerDev"><img src="https://avatars1.githubusercontent.com/u/36013882?v=4?s=100" width="100px;" alt="ReazerDev"/><br /><sub><b>ReazerDev</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=ReazerDev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Yassine-Latreche"><img src="https://avatars1.githubusercontent.com/u/59394690?v=4?s=100" width="100px;" alt="Yassine Latreche"/><br /><sub><b>Yassine Latreche</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=Yassine-Latreche" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kehnj"><img src="https://avatars1.githubusercontent.com/u/17574909?v=4?s=100" width="100px;" alt="Ken Johnson"/><br /><sub><b>Ken Johnson</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Akehnj" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.coreyhaines.com"><img src="https://avatars0.githubusercontent.com/u/3962?v=4?s=100" width="100px;" alt="Corey Haines"/><br /><sub><b>Corey Haines</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Acoreyhaines" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.mischka.me"><img src="https://avatars1.githubusercontent.com/u/3939997?v=4?s=100" width="100px;" alt="Jacob Mischka"/><br /><sub><b>Jacob Mischka</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=jacobmischka" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.rachael-andrew.dev/"><img src="https://avatars3.githubusercontent.com/u/6334799?v=4?s=100" width="100px;" alt="Rachael Andrew"/><br /><sub><b>Rachael Andrew</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=r-andrew-dev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sojan80"><img src="https://avatars1.githubusercontent.com/u/13117568?v=4?s=100" width="100px;" alt="Jeff Allen"/><br /><sub><b>Jeff Allen</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Asojan80" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://saltydogllc.com"><img src="https://avatars1.githubusercontent.com/u/8174668?v=4?s=100" width="100px;" alt="Eric Selje"/><br /><sub><b>Eric Selje</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Aeselje" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.mattmillican.com"><img src="https://avatars0.githubusercontent.com/u/810260?v=4?s=100" width="100px;" alt="Matt Millican"/><br /><sub><b>Matt Millican</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Ammillican" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://michaelwales.com/"><img src="https://avatars.githubusercontent.com/u/37906?v=4?s=100" width="100px;" alt="Michael Wales"/><br /><sub><b>Michael Wales</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=walesmd" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ategen3rt"><img src="https://avatars.githubusercontent.com/u/36305171?v=4?s=100" width="100px;" alt="Adam J Tegen"/><br /><sub><b>Adam J Tegen</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=ategen3rt" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/joshpierce"><img src="https://avatars.githubusercontent.com/u/8643537?v=4?s=100" width="100px;" alt="Joshua Pierce"/><br /><sub><b>Joshua Pierce</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=joshpierce" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/blitzmann"><img src="https://avatars.githubusercontent.com/u/3904767?v=4?s=100" width="100px;" alt="Ryan Holmes"/><br /><sub><b>Ryan Holmes</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Ablitzmann" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/RunDLL32-Steve"><img src="https://avatars.githubusercontent.com/u/40435775?v=4?s=100" width="100px;" alt="Steven Millard"/><br /><sub><b>Steven Millard</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=RunDLL32-Steve" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SQrL143"><img src="https://avatars.githubusercontent.com/u/26024995?v=4?s=100" width="100px;" alt="SQrL143"/><br /><sub><b>SQrL143</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=SQrL143" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jknaak"><img src="https://avatars.githubusercontent.com/u/25443142?v=4?s=100" width="100px;" alt="Jessica Knaak"/><br /><sub><b>Jessica Knaak</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Ajknaak" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zachesposito"><img src="https://avatars.githubusercontent.com/u/1486613?v=4?s=100" width="100px;" alt="zachesposito"/><br /><sub><b>zachesposito</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=zachesposito" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zaudtke"><img src="https://avatars.githubusercontent.com/u/1631560?v=4?s=100" width="100px;" alt="Al"/><br /><sub><b>Al</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=zaudtke" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AndrewSchwabe"><img src="https://avatars.githubusercontent.com/u/17070695?v=4?s=100" width="100px;" alt="Andrew Schwabe"/><br /><sub><b>Andrew Schwabe</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=AndrewSchwabe" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/binaryjanitor"><img src="https://avatars.githubusercontent.com/u/13708049?v=4?s=100" width="100px;" alt="Jon Cwiak"/><br /><sub><b>Jon Cwiak</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Abinaryjanitor" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://code.erpenbeck.io"><img src="https://avatars.githubusercontent.com/u/8420128?v=4?s=100" width="100px;" alt="Michael"/><br /><sub><b>Michael</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=GitMje" title="Code">💻</a> <a href="https://github.com/ThatConference/that.us/issues?q=author%3AGitMje" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/garciadev"><img src="https://avatars.githubusercontent.com/u/5198299?v=4?s=100" width="100px;" alt="Daniel Garcia"/><br /><sub><b>Daniel Garcia</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/issues?q=author%3Agarciadev" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ee.linkedin.com/in/kristjanroosild"><img src="https://avatars.githubusercontent.com/u/1203138?v=4?s=100" width="100px;" alt="Kristjan Roosild"/><br /><sub><b>Kristjan Roosild</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=kristjanr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DanWillman"><img src="https://avatars.githubusercontent.com/u/4489280?v=4?s=100" width="100px;" alt="Dan Willman"/><br /><sub><b>Dan Willman</b></sub></a><br /><a href="https://github.com/ThatConference/that.us/commits?author=DanWillman" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://envisionitllc.com"><img src="https://avatars.githubusercontent.com/u/1406827?v=4?s=100" width="100px;" alt="Bob Dankert"/><br /><sub><b>Bob Dankert</b></sub></a><br /><a href="#ideas-BobDankert" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
