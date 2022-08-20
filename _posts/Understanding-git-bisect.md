---
title: Understanding Git-Bisect, i.e. Use Binary Search to Find the Change that Introduced a Bug
excerpt: 'Git is a powerful tool. Once you’ve mastered commit and merge, there are endless possibilities. A very useful one is git-bisect. It helps you find a commit that introduced a certain change in behavior.'
coverImage: '/assets/blog/Understanding-git-bisect/img1.png'
date: '2021-02-03T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/Understanding-git-bisect/img1.png'
---
Git is a powerful tool. Once you’ve mastered commit and merge, there are endless possibilities. A very useful one is [git-bisect](https://git-scm.com/docs/git-bisect). It helps you find a commit that introduced a certain change in behavior.

<video-card><div>
<iframe  src="https://www.youtube.com/embed/dfDBNcYRKcE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div></video-card>

When you find a **regression, something broken that used to work**, use git-bisect to find the commit that broke it. Mark the current commit as bad and mark an old commit, where that feature still worked, as good. Git-bisect will then bisect all the changes between those two commits with a binary search. At every step, you are asked to mark the commit as good or bad until bisect finds **the first bad commit**.

### How to use git-bisect

```bash
git bisect start
npm test   #  Double check that this commit is broken.
git bisect bad
git log --oneline   # Find the hash of a good commit.
git checkout 7425633   #  Checkout that good commit.
npm test   # Double check that everything was green.
git bisect good
```

Bisect uses binary search, so the range decreases exponentially. Every step cuts the range in half. If you bisect twice as many commits, it takes one additional step on average — not twice as long. Thus bisecting large ranges of commits is fairly quick.

![Git bisect view. The range of commits to test is cut in half at every step.](/assets/blog/Understanding-git-bisect/img1.png)

We use git-bisect a lot in the [Node.js project](https://github.com/nodejs/node). The Node.js project has good continuous integration but some bugs are only discovered after a release. With git-bisect, it’s easy to find the bad commit.

### Try it!

If you want to try out git-bisect, here is a [demo repository](https://github.com/fhinkel/git-bisect-demo). At some point, a bug was introduced as you can see by running npx mocha test1.js. Can you find the bad commit?

![[Use this repository to practice git bisect.](https://github.com/fhinkel/git-bisect-demo)](/assets/blog/Understanding-git-bisect/img1.png)

### Automating git-bisect

Instead of testing each step manually, you can run git-bisect with a script. It will use the script at each step and automatically mark the commit, until it finds the **first bad commit**.

<video-card><div>
<iframe src="https://www.youtube.com/embed/pFavI1XgxYs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</video-card></div>