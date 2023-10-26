# Are youtube ADS blocked by uBlock?
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/drHyperion451/does-uBO-bypass-yt">
    <img src="assets/icons/favicon.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Does uBlock bypass YouTube anti-adblocker script?</h3>

  <p align="center">
    This website will tell you!
    <br />
    <a href="https://drhyperion451.github.io/does-uBO-bypass-yt">View Website</a>
    ·
    <a href="https://github.com/drHyperion451/does-uBO-bypass-yt/issues">Report Bug</a>
    ·
    <a href="https://github.com/drHyperion451/does-uBO-bypass-yt/issues">Request Feature</a>
  </p>
</div>

## How it works?
It just compares the latest filter made by [ublock volunteers](https://github.com/stephenhawk8054/misc/blob/main/yt-fix.txt) with [youtube anti-adbock script](https://pastefy.app/G1Txv5su/raw). If they matches it means the filter is updated and you should update your filters.

### So if the ID do not match, does it mean ublock is not working on youtube?
Not necessary. This website only recommends the user to watch out and update their filters and to tell the user when they should report to ublock if they still see ads. 

If the IDs do not match **DO NOT make a report to uBlock** to avoid overload on their issue tracker

## How can I contribute?
Fork the `dev` branch, make some changes and PR to the `dev` branch to avoid overloading github pages deployment.

I think it's not necessary to write a long `CONTRIBUTING.md` but there are some practices that could help the mainainers review and accept the PR:
1. Usually HTML is for info, CSS is for animations/styling and javascript is for making the website work. That way we could keep specially javascript code as clean as possible
2. Try to use comments and explain briefly what does your function do.
3. No external libraries or heavy frameworks. Plain js is the most compatible, fast and less bloating in very simple static websites.

I personally use [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) to view the website local HTML, edit the CSS and debug javascript. I use VSCode for editing HTML and javascript. 

**Thanks for contributing!**

## Donations?
I do not accept donations. This project has the same philosophy as the ublock project. Also will have no tracking... like web should have been since the beginning.

<div align="center"> 
  <b>Special thanks to the uBlock Origin team for being so talented and developing the best antivirus software</b>
</div>

[contributors-shield]: https://img.shields.io/github/contributors/drHyperion451/does-uBO-bypass-yt.svg?style=for-the-badge
[contributors-url]: https://github.com/drHyperion451/does-uBO-bypass-yt/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/drHyperion451/does-uBO-bypass-yt.svg?style=for-the-badge
[forks-url]: https://github.com/drHyperion451/does-uBO-bypass-yt/network/members
[stars-shield]: https://img.shields.io/github/stars/drHyperion451/does-uBO-bypass-yt.svg?style=for-the-badge
[stars-url]: https://github.com/drHyperion451/does-uBO-bypass-yt/stargazers
[issues-shield]: https://img.shields.io/github/issues/drHyperion451/does-uBO-bypass-yt.svg?style=for-the-badge
[issues-url]: https://github.com/drHyperion451/does-uBO-bypass-yt/issues
[license-shield]: https://img.shields.io/github/license/drHyperion451/does-uBO-bypass-yt.svg?style=for-the-badge
[license-url]: https://github.com/drHyperion451/does-uBO-bypass-yt/blob/dev/LICENSE
