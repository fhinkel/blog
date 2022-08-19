---
title: Speed up Your Node.js App with Native Addons
excerpt: 'JavaScript is a ridiculously fast scripting language. But how fast is JavaScript compared to C++? Let’s look at this example that computes prime numbers in Node with JavaScript and with a native C++ addon.'
coverImage: '/assets/blog/Speed-up-Your-Node-js-App-with-Native-Addons/WithOpt.png'
date: '2017-12-07T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/Speed-up-Your-Node-js-App-with-Native-Addons/WithOpt.png'
---
## What’s faster, C++ or JavaScript?

JavaScript is a ridiculously fast scripting language. But how fast is JavaScript compared to C++? Let’s look at this example that computes prime numbers in Node with JavaScript and with a native C++ addon.

The JavaScript and the C++ implementation use the same algorithm. My measurements show that calling into the addon and **running the computations in C++ is faster than staying in JavaScript except for small prime numbers.**

> If your Node app’s sole purpose is to compute prime numbers and you don’t want to use a fast lookup table, please rely on this benchmark 100%. For anything else, this benchmark is probably useless.

![Computing one million prime numbers without warm up.](/assets/blog/Speed-up-Your-Node-js-App-with-Native-Addons/WithOpt.png)

Except for the smallest computations, C++ is faster than JavaScript by a factor 1.5, e.g., C++ takes 10 seconds where JavaScript takes 15 seconds. If you have a similar workload (computation heavy, few jumps between C++ and JavaScript), you might want to consider writing a native addon.

V8’s optimizing compiler TurboFan uses information collected at runtime to speed up future computations. We can see in the chart above that TurboFan has finished compiling when we get to the 90th prime number, speeding up JavaScript substantially.

![Computing the first 50 prime numbers with warm up.](/assets/blog/Speed-up-Your-Node-js-App-with-Native-Addons/WithOpt50.png)

If we “warm up” TurboFan and then start computing prime numbers, JavaScript is faster on the first 25 prime numbers, because calling into C++ comes with a small performance overhead. For larger prime numbers, the C++ addon is faster.

> If we use `long` instead of `int` as the parameter for C++’s `prime()` function, it slows down the modulo operator so badly that JavaScript ends up being faster than C++ 🤷🏻‍. **Always measure performance, don’t blindly make changes because somebody said “C++ is faster than JavaScript.”**

```js
const js = require('./primes.js');
const addon = require('./build/Release/primes.node');

function run(i) {
    console.time('Prime in js');
    js.prime(i);
    console.timeEnd('Prime in js');

    console.time('Prime in addon');
    addon.prime(i);
    console.timeEnd('Prime in addon');
}

for(let i = 0; i < 1000000; i++) {
  run(i);
}
```
_Index.js that runs prime number computations in JavaScript and C++ side by side._

We could easily improve the algorithm. But since we’re not interested in absolute performance, it doesn’t matter as long as both implementations use the same algorithm.

```js
function isPrime(p) {
    const upper = Math.sqrt(p);
    for(let i = 2; i <= upper; i++) {
        if (p % i === 0 ) {
            return false;
        }
    }
    return true;
}

// Return n-th prime
function prime(n) {
    if (n < 1) {
        throw Error("n too small: " + n);
    }
    let count = 0;
    let result = 1;
    while(count < n) {
        result++;        
        if (isPrime(result)) {
            count++;
        }
    }
    return result;
}

module.exports = {
    prime 
};
```
_N-th prime implementation in JavaScript._

The implementation of the algorithm in `primes.cc` is exactly the same as in `primes.js` modulo syntax. What’s different in the addon is how the function `prime()` is exported:

```cpp

#include <napi.h>
#include <math.h>

namespace primes {

// Implementation of isPrime() and prime() omitted. See
// https://github.com/fhinkel/javascript-vs-native-addon-prime-numbers/blob/master/primes.cc
    
Napi::Value Method(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int number = info[0].ToNumber().Int32Value();
    int res = primes::prime(env, number);
    return Napi::Number::New(env, res);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "prime"),
                Napi::Function::New(env, Method));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)

} // End namespace prime
```
_Initializing the native module with N-API._

This example uses the [N-API](https://nodejs.org/api/n-api.html) for the [Node.js Native Addon](https://nodejs.org/api/addons.html). **The N-API is a C API that ensures stability of the Application Binary Interface (ABI) across versions of Node.js.** That means, compiled once, the module can be used for different versions of Node (8 and higher) without re-compilation. As C++ is often more convenient than C, we use a C++ wrapper package, [node-addon-api](https://www.npmjs.com/package/node-addon-api). For more info on getting started with N-API check out the [documentation](https://nodejs.org/dist/latest/docs/api/n-api.html) or [GitHub repository](https://github.com/nodejs/abi-stable-node).

`Method` converts the first argument to a number, calls the C++ function `prime` with that number, and returns the result as a JavaScript value. The `Init` function sets `Method` as property `prime` on the exported module.

> Except for small prime numbers, C++ is faster than JavaScript. If you have a similar workload (computation heavy, few jumps between C++ and JavaScript) and its performance is critical, you might want to consider writing a native addon.

### Running JavaScript without Optimizations

JavaScript is almost as fast as C++ for tasks like this prime number calculation. Such performance is possible with [modern JavaScript engines because they use adaptive optimizations](https://youtu.be/p-iiEDtpy6I). Without optimizations, the performance difference is much bigger.

![Computing prime numbers without adaptive optimizations.](/assets/blog/Speed-up-Your-Node-js-App-with-Native-Addons/WithoutOpt.png)

In the prime number example, JavaScript without optimizations is 10 times slower than C++, not only 0.5 times. You can turn off optimizations with V8’s `--no-opt` flag, e.g.., by running `node --no-opt index.js`.

**The full prime number example is hosted on **[GitHub](https://github.com/fhinkel/javascript-vs-native-addon-prime-numbers)**.  Fork it and experiment with it. Remember to run **`npm install`** to recompile the addon if you change any C++ code.**

---

*All computations were run on a MacBook Air with Node 9.2.*

Thanks to Andreas Haas, Anna Henningsen, and Michael Dawson for careful reviews.
