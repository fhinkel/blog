---
title: Tools for Node.js Contributors
excerpt: 'This article lists a few tools, tips, and tricks for Node core contributors.'
coverImage: '/assets/blog/Tools-for-Node-js-Contributors/filter.png'
date: '2017-03-25T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/Tools-for-Node-js-Contributors/filter.png'
---
This article lists a few tools, tips, and tricks for Node core contributors.  They are in addition to the process laid out in [Contributing](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md) and the [collaborator guide](https://github.com/nodejs/node/blob/master/COLLABORATOR_GUIDE.md).

[Node contributions](https://github.com/nodejs/node) are managed under an [open governance model](https://github.com/nodejs/node/blob/master/GOVERNANCE.md).  Everybody is welcome to [contribute](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md).  Individuals making significant contributions aremade *Collaborators* and given commit-access to the project.

### Automatically check your commit messages

Node has [strict rules](https://github.com/nodejs/node/blob/master/CONTRIBUTING.md#commit-guidelines) about the format of a commit message. So strict that it’s often hard to remember all of them. Luckily, there’s the handy [core-validate-commit](https://www.npmjs.com/package/core-validate-commit) tool to help you (shoutout to [Evan
Lucas](https://medium.com/@evanlucas)👏)

![core-validate-commit in action.](/assets/blog/Tools-for-Node-js-Contributors/core-validate-commit.png)

Install it and run it on every commit that you open a PR for and for every commit that you merge as a collaborator.  [core-validate-commit](https://www.npmjs.com/package/core-validate-commit) is invaluable for a smooth review process.

### Filter pull requests

We merge [pull requests](https://github.com/nodejs/node/pulls) manually. We currently have more than 300 open PRs. To work through them, it’s useful to filter for PRs that are ready to merge, i.e., approving reviews and passing [CI](https://ci.nodejs.org/). With the right [search](https://help.github.com/articles/searching-issues/) terms on GitHub, [that’s easy](https://github.com/nodejs/node/pulls?q=is%3Apr%20is%3Aopen%20status%3Asuccess%20review%3Aapproved%20):

    is:pr is:open status:success review:approved


![Filter PRs that are ready to merge.](/assets/blog/Tools-for-Node-js-Contributors/filter.png)

This results in 10 issues. Wait, only 10 out of 334? The CI is often flaky on specific architectures. We fall back to manually inspecting the CI results (11 out of 12 checks is usually good enough). Still, we can narrow the results and then happily approve, merge, and close away:

    is:pr is:open review:approved -label:semver-major -label:"in progress"

### Review metadata

We annotate every PR with metadata, the PR Url and reviewers. Use [the node-review chrome extension](https://github.com/evanlucas/node-review) and let it generate the metadata for you.

### Filter email notifications

The Node repository has a lot of traffic, keeping up to date with all email notifications is impossible. I filter for notifications that specifically mention my GitHub handle and only skim the other notifications. Whatever your system, you probably need some kind of filtering to be effective with GitHub notifications.

![inbox.google.com](/assets/blog/Tools-for-Node-js-Contributors/settings.png)

---

Happy contributing!
