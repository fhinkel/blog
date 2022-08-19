---
title: Understanding npm-link
excerpt: 'Sometimes you need to work on application code and a dependency at the same time. You might be the author of a dependency and don’t have good test coverage yet. The application can serve as an end-to-end test for the dependency. Maybe you need to debug an issue in your application and the problem seems to be in the dependency sources.'
coverImage: '/assets/blog/Understanding-npm-link/img2.png'
date: '2018-10-25T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/Understanding-npm-link/img2.png'
---
**Simultaneously Working on Application and Dependency**

Sometimes you need to work on application code and a dependency at the same time. You might be the author of a dependency and don’t have good test coverage yet. The application can serve as an end-to-end test for the dependency. Maybe you need to debug an issue in your application and the problem seems to be in the dependency sources.

![](/assets/blog/Understanding-npm-link/img1.png)

You could make changes in `node_modules` and manually copy the changes to the `git` repository of the dependency once you are done. But there is a much cleaner approach: `npm link`.

## Usage
Package linking is a two-step process:

1. Create a global symlink for a dependency with `npm link`. A **symlink**, short for symbolic link, is a shortcut that points to another directory or file on your system.
2. Tell the application to use the global symlink with `npm link some-dep`.

```bash
cd ~/projects/some-dep
npm link  # Step 1.
cd ~/projects/my-app
npm link some-dep  # Step 2.
```

![](/assets/blog/Understanding-npm-link/img2.png)

You can edit, transpile, run tests, or commit as usual in `some-dep`. All while `my-app` runs with the changes you made to `some-dep`. The symbolic links are local and will not be committed to `git`. When you are ready to share your code, publish a new version of `some-dep` or push to a branch that you specify in `my-app`’s `package.json`:

```bash
cd ~/projects/my-app
npm install — save some-dep@fhinkel/some-dep#experimental-branch
```

## Debugging
If you use [VSCode](https://code.visualstudio.com/) and want to set breakpoints in `some-dep`, you need to enable symlinks in the debugger for `my-app`. Do so by setting

```js
“runtimeArgs”: [
  “--preserve-symlinks”
]
```

in `launch.json`.

![Enable symlinks in debug configuration in Code.](/assets/blog/Understanding-npm-link/img3.png)

## Back to Normal
How do you switch back to *normal* dependencies? When you don’t want to use the local version of `some-de`p anymore, delete the symlink. But careful, `npm unlink` is an alias for `npm uninstall`, it does not mirror the behavior of `npm link`.

```bash
cd ~/projects/my-app
npm uninstall --no-save some-dep && npm install 
```

You can clean up the global link, though its presence won’t interfere with `my-app`.

```bash
cd ~/projects/some-dep
npm uninstall  # Delete global symlink
```

## Conclusion
I used `npm link` while working on dependencies of the [client libraries](https://github.com/googleapis/google-cloud-node) for Google Cloud Platform. All our libraries use the module `@google-cloud/common`. In some cases I needed to immediately see the changes in the larger libraries instead of in isolation in `common`.

**Mastering the two-step process of `npm link` is a useful addition to the toolset of any Node.js developer.** The process consists of running `npm link` in the dependency, and `npm link some-dep` in the application.

---

*Huge thanks to Peter Marshall and Alexander Fenster for helping review this post.*