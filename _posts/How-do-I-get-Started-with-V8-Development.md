---
title: How do I get Started with V8 Development?
excerpt: 'Are you interested in understanding more about compilers, virtual machines, JavaScript engines, and maybe even want to contribute to V8? You don’t need to understand all aspects of compilers to make a contribution. Here are some resources that might help you on the way.'
coverImage: '/assets/blog/How-do-I-get-Started-with-V8-Development/img2.png'
date: '2017-07-30T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/How-do-I-get-Started-with-V8-Development/img2.png'
---
Are you interested in understanding more about compilers, virtual machines, JavaScript engines, and maybe even want to contribute to V8? 

Have you never taken a compiler course (maybe no formal CS course) or no experience in C++? Fear not, nobody was born with that knowledge. You don’t need to understand all aspects of compilers to make a contribution. Here are some resources that might help you on the way.

There are very few compiler books, and I have not found one that covers modern optimizations, especially for JavaScript engines. If you want to learn the fundamentals, the [Dragon Book](https://amzn.to/3A8ayEv) (Compilers: Principles, Techniques, & Tools, 2nd Edition) is the book to read.

![My professor’s copy that he used in grad school. Get the [2nd edition from 2006](https://amzn.to/3A8ayEv)](/assets/blog/How-do-I-get-Started-with-V8-Development/img1.jpeg)

There are multiple **blogs** about V8:

* **Official V8 blog** [v8project.blogspot.com](http://v8project.blogspot.com/)
* [benediktmeurer.de](https://t.co/CzlzNpYFzx) (V8 compiler and benchmarks)
* [http://ripsawridge.github.io/](http://ripsawridge.github.io/) (V8 compiler)
* [https://medium.com/@tverwaes](https://medium.com/@tverwaes) (V8 runtime)
* [http://mrale.ph/](http://mrale.ph/) (Not on the V8 team anymore.)

If you rather listen than read, you might want to watch these **videos**:

* [Breaking the Speed Limit](https://www.youtube.com/watch?v=UJPdhx5zTaw) from 2012 by Daniel Clifford, V8 lead [[Slides](http://v8-io12.appspot.com/)]
* [A Trip to the Zoo](https://www.youtube.com/watch?v=1kAkGWJZ6Zo) from 2015 by me, Nordic.js [[Slides](https://fhinkel.github.io/JSEngines-HowDoTheyEven/JSConfEU/)]
* [V8, modern JavaScript, and Beyond](https://www.youtube.com/watch?v=N1swY14jiKc&t=28s) from 2016 by Seth Thompson
* [A little on V8 and WebAssembly](https://www.youtube.com/watch?v=BRNxM8szTPA) from 2016 by Ben Titzer [[Slides](https://ia601208.us.archive.org/16/items/vmss16/titzer.pdf)]
* [JS Engines — how do they even?](https://www.youtube.com/watch?v=p-iiEDtpy6I) from 2017 by me, JSConfEU [[Slides](https://github.com/fhinkel/JSEnginesExamples/blob/master/JSConfEU.ppt?raw=true)]

Unfortunately, there’s a huge gap between these high level resources and the actual *948341* lines of source code in `V8/src`. But you learn by doing. So [get the source code and build](https://github.com/v8/v8/wiki/Building-from-Source) it. See if you can run the tests. V8 has millions of lines of code in `V8/test`. Stick to running a few tests locally, or you’ll wait for several hours. Follow the [V8 Wiki](https://github.com/v8/v8/wiki) for [building](https://github.com/v8/v8/wiki/Building-with-GN) and [running](https://github.com/v8/v8/wiki/Using-D8) V8. The wiki also has instructions on how to commit a change list. A change list is the Chromium terminology for a pull request.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Who needs a heater when you can compile V8 on your laptop?</p>&mdash; Franziska Hinkelmann, Ph.D. (@fhinkel) <a href="https://twitter.com/fhinkel/status/797699178751258625?ref_src=twsrc%5Etfw">November 13, 2016</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
It takes a while to compile V8.

I would suggest you start out very simple. Make a minuscule change in the code, maybe change the wording of an error message. Then compile the code, run it on a few lines of JavaScript that result in that error, and see if you’ll get *your* error message. [Here](https://codereview.chromium.org/1399693003) is a simple change list that changes an error message. Toying around with the code like this will slowly get you familiar with the codebase and the build process.

To run your local modified V8 instead of the released version in the browser, use [D8](https://github.com/v8/v8/wiki/Using-D8), V8’s debug shell. When you work with V8, you can use `git` just like you’re used to from other projects.

![A change list in [Chromium’s code review tool, Gerrit](https://chromium-review.googlesource.com/)](/assets/blog/How-do-I-get-Started-with-V8-Development/img2.png)
 
Once you get to the point where you can edit error messages and see the change in D8, [upload your code](https://github.com/v8/v8/wiki/Contributing) and run all the tests on the V8 testing infrastructure. You should see some tests fail because we have tests that check the wording of error messages. This gets you familiar with our code review tool and how to run automated tests on our infrastructure, so you’re ready when you want to **submit a patch**. Details on how to use the V8 (Chromium) review tool and how to run the tests are [here](https://dev.chromium.org/developers/contributing-code).

If you are familiar with JavaScript but not with C++, you might want to start by looking at `V8/src/js.` Parts of V8 are implemented in JavaScript, and they are in this folder. Most of this code directly implements JavaScript behavior as defined in the **EcmaScript specification**. Pick a function and look up its [specification](https://tc39.github.io/ecma262/). Can you see how the specification corresponds to the code? If you change or delete part of the code, which tests are breaking, which steps in the specification are violated? There is also a lot of JavaScript code in `V8/test`, specifically `V8/test/mjsunit`.

As a next step, you can look through the [V8 issue tracker](https://bugs.chromium.org/p/v8/issues/list). Maybe you find a small issue that you want to attempt to fix. Start by checking if you can understand and duplicate the issue. Write a small code snippet in JavaScript, that, when run, shows the issue. Poke around in the code. Intentionally break the code.  Then run your test snippet to confirm that it fails because of the code you just broke. **Play with the code**. The V8 codebase is huge and complex. Maybe you can figure out enough to fix the issue. If not, no worries, you learnt something along the way when investigating the issue.

---

Making substantial changes in V8 is hard and requires a lot of time and knowledge. I would be lying if I told you that you can easily change how V8 works or add new features. But everybody has to start somewhere. Maybe you’ll stick with it and we see a change list from you in the future.

*Have fun and enjoy learning!*
