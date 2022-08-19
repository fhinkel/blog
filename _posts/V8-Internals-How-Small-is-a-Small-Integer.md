---
title: 'V8 Internals: How Small is a “Small Integer?”'
excerpt: 'V8 is Google’s open source JavaScript engine. Chrome, Node.js, and many other applications embed V8. If you have heard any talks about V8 or read any blogposts, you have surely heard about Smis, small integers. This article digs into V8’s source code to discover how large Smis actually are.'
coverImage: '/assets/blog/V8-Internals-How-Small-is-a-Small-Integer/img1.jpeg'
date: '2018-09-03T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/V8-Internals-How-Small-is-a-Small-Integer/img1.jpeg'
---
**When binary is useful outside of a coding interview**

*This article is [available in Chinese](https://medium.com/@justjavac/v8-internals-how-small-is-a-small-integer-ba5e17a3ae5f).*

[V8](https://github.com/v8/v8/wiki) is Google’s open source JavaScript engine. Chrome, Node.js, and many other applications embed V8. If you have heard any [talks](https://www.youtube.com/watch?time_continue=1616&v=PM38nnInUOI) about V8 or read any [blogposts](https://medium.com/@fhinkel/understanding-v8s-bytecode-317d46c94775), you have surely heard about **`Smis`, small integers**. This article digs into V8’s source code to discover how large `Smis` actually are.

JavaScript, by specification, does not know about integers (with the exception of recently introduced [BigInts](https://developers.google.com/web/updates/2018/05/bigint)). It only knows IEEE doubles. But many operations are based on integers, just think of `for` loops. All JavaScript engines have a special representation for integers. V8 has so called `Smis`, small integers.

The range for `Smis` on 64-bit platforms is -2³¹ to 2³¹-1 (2³¹≈ 2*10⁹). That might not be immediately obvious when you look at V8’s source code. `kSmiMinValue` and `kSmiMaxValue` are defined in [include/v8.h](https://github.com/v8/v8/blob/a9e3d9c7ec1345085c861af76e508d9591634530/include/v8.h#L253) as follows:

```cpp
static const int kSmiMinValue = 
  (static_cast<unsigned int>(-1)) << (kSmiValueSize — 1);
static const int kSmiMaxValue = -(kSmiMinValue + 1);
```

How is that equal to -2³¹ and 2³¹-1? Let’s dissect the `C++` code into smaller chunks.

## Left Shift
`<<` is a bitwise left shift. Left shift means that we shift the binary representation of a number to the left by filling up the right side with zeros. For example, `5 << 3 = 40`.

![](/assets/blog/V8-Internals-How-Small-is-a-Small-Integer/img1.jpeg)

You might notice that left shift for positive numbers is the same as multiplication by 2.

## Static Cast to an Unsigned Integer

```cpp
static_cast<unsigned int>(-1)
```

What happens when we cast a negative value to an unsigned integer, i.e., a positive number? The bits stay the same but the value is interpreted differently. Casting to an unsigned integer allows us to use left shift because it is only defined for positive numbers in `C++`.

What is the binary representation of `-1`? In [Two’s complement](https://en.wikipedia.org/wiki/Two%27s_complement), -1 is represented as `(111...111)_2` because 2⁶³-2⁶²-2⁶¹- … -2²-2¹–1 = 1.

![](/assets/blog/V8-Internals-How-Small-is-a-Small-Integer/img2.jpeg)

## Putting it All Together

If you follow the [definitions](https://github.com/v8/v8/blob/a9e3d9c7ec1345085c861af76e508d9591634530/include/v8.h#L225) in V8’s source code, you will find that `kSmiValueSize` is defined as 32 on 64-bit machines, resulting in:

```cpp
kSmiMinValue =(static_cast<unsigned int>(-1)) << (kSmiValueSize — 1)
             = (111...111)_2 << (32-1) 
             = (111...111)_2 << 31
             = (11...1100...00)_2  // 31 zeros
             = -2^31
```

Now we use this result in the initial definition of `kMaxValue`.

```cpp
int kSmiMaxValue = -(kSmiMinValue + 1);
```

That is easy, `kSmiMaxValue = -(-2^31+1) = 2^31-1`. The range for `Smis` in V8 on 64-bit platforms is [-2³¹, 2³¹-1].

## 32-Bit Platforms
On 32-bit platforms, `kSmiValueSize = 31`. So we shift by 30, and end up with `kMinValue = -2^30`. Note, 2³⁰≈ 10⁹.

Why is the range for `Smis` one bit smaller on 32-bit platforms? [Internally](https://github.com/v8/v8/blob/a9e3d9c7ec1345085c861af76e508d9591634530/include/v8.h#L177), V8 tags all JavaScript values as either `Smis` or heap objects using the least significant bit. If it is `1`, it is a pointer. If the least significant bit is a `0`, it is a `Smi`. That means that 32-bit integers can use only 31 bits for the `Smi` value, because one bit is used as the tag.

**V8 tags all values as either Smis or heap pointers using the least significant bit.**

`Smis` are not as small as you might have thought, but they easily fit into a 32-bit or 64-bit integer together with their encoding bit.

*Bonus question: Given a non-empty array of integers, every element appears twice except for one. Find that single one. Can you use binary representation for a linear time, constant space solution?*

---

I like to use a [dotted Leuchturm1917](https://amzn.to/3ChYByL) and [Pigma Microns](https://amzn.to/3QWKT8k) for my notes.