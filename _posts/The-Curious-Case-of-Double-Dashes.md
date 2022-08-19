---
title: 'The Curious Case of Double Dashes'
excerpt: 'Why do we sometimes use bare double dashes in commands like git checkout -- file.txt? Isn’t git checkout file.txt just as good?'
coverImage: '/assets/blog/The-Curious-Case-of-Double-Dashes/img1.jpeg'
date: '2019-01-17T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/The-Curious-Case-of-Double-Dashes/img1.jpeg'
---
### Bare -- in bash commands

Why do we sometimes use bare double dashes in commands like `git checkout -- file.txt`? Isn’t `git checkout file.txt` just as good?

![](/assets/blog/The-Curious-Case-of-Double-Dashes/img1.jpeg)

**Bare double dashes signify the end of options**. Anything after `--` is a parameter. For example in git, you can checkout a file named `main`:

```bash
git checkout main     # Checkout the main branch
git checkout -- main  # Checkout the file named main
```

In proper documentation, we see `git checkout -- file.txt` when `git checkout file.txt` would work, too. **-- safeguards against checking out branches when files have the same name as branches.**

### POSIX.1–2017 standard
>  12.2 [Utility Syntax Guidelines](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap12.html)
>  Guideline 10:
>  The first `--` argument that is not an option-argument should be accepted as a delimiter indicating the end of options. Any following arguments should be treated as operands, even if they begin with the ‘-’ character.

### Use case: rm

When you need to delete an oddly named filed like `-file.txt`, `rm` treats `-f` as an option. Use bare double dashes to delete the file. This works for many bash commands that work with files like `cat`, `mv`, or `touch`.

```bash
rm -file.txt          # rm: illegal option -- l
rm -- -file.txt 
```

### Use case: grep

You can use double dashes in grep when the search term starts with a dash:

```bash
grep -- -v *
```

This searches for the string ‘-v’ rather than interpreting it as the option for inverse matches.

### Use case: npm scripts

Double dashes are incredibly useful for `npm` scripts. Anything after the double dashes is not an option of `npm`, but a parameter for the script that `npm` executes.

If we want to fix linter errors, we do not need to look up which linter is specified in `package.json`. As long as the linter understands `--fix`, we simply run

```bash
    npm run lint -- --fix
```

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">TIL, you can pass parameters with -- to an npm script, like `npm run lint -- --fix` 🤯 <a href="https://t.co/LVusMurAIX">pic.twitter.com/LVusMurAIX</a></p>&mdash; Franziska Hinkelmann, Ph.D. (@fhinkel) <a href="https://twitter.com/fhinkel/status/1058787699912511488?ref_src=twsrc%5Etfw">November 3, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### What can you do with --?

I hope this shed some light on why we sometimes have bare double dashes in our commands. Where do you use `--`? I would love to hear your tips in the comment section.
