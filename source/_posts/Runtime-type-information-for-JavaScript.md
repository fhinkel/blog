---
title: Runtime Type Information for JavaScript
date: 2017-09-17
tags: V8
---
## Chrome V8 can now collect type information at runtime

Get types like string, number, null, or custom classes at runtime. V8 can now
collect type information. V8 is Google’s open source JavaScript engine. Chrome,
Node.js, and many otherapplications use V8. This type profiler is built into the
engine, the information is not statically inferred.

JavaScript is a dynamically typed language. But most code is written with fixed
types in mind. When debugging JavaScript, itis helpful to know the types of
variables and parameters at runtime. It is often hard to infer types for complex
code. Type profiling provides this information at runtime.

![](https://cdn-images-1.medium.com/max/2000/1*CLdktAPyagGXXZQYUS5UtA.png)
<span class="figcaption_hack">[https://github.com/fhinkel/type-profile](https://github.com/fhinkel/type-profile)</span>

    function foo(x) {
        if (x < 2) {
          return 42;
        }
        return "What are the return types of foo?";
      }

The static definition of `foo()` does not hold any information about the
parameters with which `foo` is called. In this simple case, we can deduct the
return types, `number` and `string`. For more complex cases that is often
impossible, though. But at runtime, it is clear with which types `foo` is being
called. Runtime type information collects exactly this information.

Type profiling is implemented in V8 and can be used via the **V8 inspector
protocol**. If you get [Node.js with the newest V8](https://github.com/v8/node),
you can test it yourself. In a few weeks a newer V8 will land in Node and type
profile will be available in regular Node releases.

**One of the intended use cases is to auto-generate JSDoc, TypeScript, or Flow
annotations**. As type profiling is available via [Node’s
inspector](https://nodejs.org/api/inspector.html), you can build your own tools
with it to fit your needs. [Here’s](https://github.com/fhinkel/type-profile) a
demo to show some basic usage.

> I look forward to all the tools the community will come up with that use type
> profile.

I look forward to all the tools the community will come up with that use type
profile. I’m sure there are many use cases that I haven’t even considered yet.
If you are already working on a prototype, please share!

<span class="figcaption_hack">foo() has only been called with Objects, it always returned strings.</span>

<span class="figcaption_hack">foo() has been called with strings and Rectangles. It always returns strings.</span>

<span class="figcaption_hack">foo() has returned strings and numbers.</span>

* [JavaScript](https://medium.com/tag/javascript?source=post)
* [V8](https://medium.com/tag/v8?source=post)
* [Typescript](https://medium.com/tag/typescript?source=post)
* [Compilers](https://medium.com/tag/compilers?source=post)
* [Nodejs](https://medium.com/tag/nodejs?source=post)