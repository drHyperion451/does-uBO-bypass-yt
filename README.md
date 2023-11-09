[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/drHyperion451/does-uBO-bypass-yt">
    <img src="assets/icons/favicon-green.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Does uBlock bypass YouTube's anti-adblocker script?</h3>

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

## How does it work?
It just compares the latest filter made by [uBlock volunteers](https://github.com/stephenhawk8054/misc/blob/main/yt-fix.txt) with [YouTube's anti-adblock script](https://pastefy.app/G1Txv5su/raw). If they match, it means the filter is updated and you should update your filters.

### So if the IDs do not match, does it mean uBlock is not working on YouTube?
Not necessarily. This website only recommends the user to watch out and update their filters and tells the user when they should report to uBlock if they still see ads. 

If the IDs do not match, **DO NOT make a report to uBlock** to avoid overload on their issue tracker.

## How can I contribute?
Fork the `dev` branch, make some changes and PR to the `dev` branch to avoid overloading GitHub Pages deployment.

I think it's not necessary to write a long `CONTRIBUTING.md` but there are some practices that could help the maintainers review and accept the PR:
1. Usually HTML is for info, CSS is for animations/styling and JavaScript is for making the website work. That way we can keep the code (especially JS) as clean as possible.
2. Try to use comments and explain briefly what your function does.
3. No external libraries or heavy frameworks. Plain JS is the most compatible, fast and least bloated for very simple static websites.

I personally use [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) to view the website's local HTML, edit the CSS and debug JavaScript. I use VSCode for editing HTML and JavaScript. 

**Thanks for contributing!**

## Donations?
I do not accept donations. This project has the same philosophy as the uBlock project. Also will have no tracking... like the web should have been since the beginning.

## Other projects:
Check out other projects at <a href="https://drhyperion451.github.io/">drhyperion451.github.io</a>! 
<div align="center"> 
  <b>Special thanks to the uBlock Origin team for being so talented and developing the best antivirus software.</b>
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
