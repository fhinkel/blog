---
title: "Debug V8 in Node.js Core with GDB"
excerpt: 'If you contribute to Node core, you will eventually need to debug C++ code in /node/src/. If you’ve done this before, you might have noticed that GDB’s print command is not helpful when working with V8 code.'
coverImage: '/assets/blog/Debug-V8-in-Node-js-Core-with-GDB/cover.jpg'
date: '2017-01-17T05:35:07.322Z'
author:
  name: Franziska Hinkelmann
  picture: '/assets/blog/authors/franziska.jpeg'
ogImage:
  url: '/assets/blog/Debug-V8-in-Node-js-Core-with-GDB/cover.jpg'
---

If you contribute to Node core, you will eventually need to debug C++ code in [/node/src/](https://github.com/nodejs/node/tree/master/src). If you’ve done this before, you might have noticed that GDB’s print command is not helpful when working with V8 code.

**TL;DR: Use .gdbinit from V8.**

```bash
(gdb) job obj   # Print v8::HeapObject*.
(gdb) jlh obj   # Print v8::Local handle.

# Somewhere in the code
v8::Local<v8::String> class_name =
    FIXED_ONE_BYTE_STRING(env->isolate(), "ContextifyScript");

# Looking at this variable in GDB
(gdb) print class_name
$1 = {val_ = 0x51eb3a0} 
```

We'd really like to see "ContextifyScript" mentioned in the output, not a memory address.

Node core uses V8 as its JavaScript engine. A lot of variables in V8 are either v8::Values wrapped in v8::Local handles, or v8::internal::HeapObjects wrapped in v8::internal::Handle handles. Handles are needed for the garbage collector.  You’ll find v8::Locals all over the [Node core sources](https://github.com/nodejs/node/search?l=C++&q=Local). However, if you want to debug them, you need to do something a little more involved than just typing *print*.

V8 provides a gdbinit file with [user-defined commands](https://sourceware.org/gdb/onlinedocs/gdb/Define.html) for inspecting V8 heap objects. They allow us to easily debug V8 objects. Let’s go through it step-by-step how to use these commands.

Get the [gdbinit file](https://github.com/v8/v8/blame/master/tools/gdbinit) from the V8 repo and save it as .gdbinit in your Node directory or home directory.  You can also pass the file to GDB with -x. If you save it in your Node folder, you probably want to add it to [.git/info/exclude](https://help.github.com/articles/ignoring-files/#explicit-repository-excludes).

Next, you need a debug build of Node.

```bash
# Build the Node debug build. We assume you already have the Node sources in $NODE.
$ cd $NODE
$ ./configure --debug && make -j8
```

Say we are working on the vm module in node_contextify.cc and need to figure out what’s going on there. We call node on a test case (or any other JavaScript file for that matter) that uses the code that we want to debug.

```bash  
# Start gdb. Node_g is the debug build executable.
$ gdb --args node_g test/parallel/test-vm-context.js
```

Let’s set a few break points in the functions that we are interested in.

```bash
# Set a breakpoint. You can use filenames or function names. Code completion works here!
(gdb) break node_contextify.cc:380
Breakpoint 1 at 0x2214955: file ../src/node_contextify.cc, line 380.

(gdb) break node::ContextifyContext::GlobalPropertyQueryCallback
Breakpoint 2 at 0x2214aa2: file ../src/node_contextify.cc, line 409.

# Run until you hit a breakpoint.
(gdb) run
Starting program: ...
Breakpoint 1, node::ContextifyContext::GlobalPropertySetterCallback (property=..., value=..., args=...) at ../src/node_contextify.cc:380
380     ASSIGN_OR_RETURN_UNWRAP(&ctx, args.Data().As<Object>());

# If you want to set a breakpoint inside V8, don't forget the v8::internal namespace.
(gdb) b v8::internal::JSReceiver::GetPropertyAttributes
Breakpoint 3 at 0x15c4032: v8::internal::JSReceiver::GetPropertyAttributes. (2 locations)
```

Now the debugger has stopped at Breakpoint 1. The code is using the [V8 API](https://github.com/v8/v8/blob/master/include/v8.h) and we have several v8::Local handles. Let’s see what their values are.

```bash
# A regular print on v8::Local handles is not very helpful.
(gdb) print property
$1 = {val_ = 0x7ffed1702eb0}
(gdb) print value
$2 = {val_ = 0x7ffed1702ea8}

# To see the value of a local handle, use the jlh command provided by gdbinit. If you get "Undefined command", double check the location and name (don't forget the dot!) of your .gdbinit.
(gdb) jlh property
#foo
(gdb) jlh value
3
# As expected, because the test is setting foo = 3.
```

If we use jlh instead of print on our first example, we see the underlying string (probably what we’re interested in) and not a memory address.

```bash
# Somewhere in the code
v8::Local<v8::String> class_name =
    FIXED_ONE_BYTE_STRING(env->isolate(), "ContextifyScript");

# Looking at this variable in GDB
(gdb) print class_name
$1 = {val_ = 0x51eb3a0}

(gdb) jlh class_name
"ContextifyScript"
```

**To sum up, if you want to print the content of a v8::Local handle, use jlh.**

If you wonder what *jlh* stands for, it stands for “job local handle”. *job* is V8’s user-defined GDB command for printing v8::internal::HeapObjects, which are the very common objects in V8.

```bash
(gdb) job heap_object_ptr
```

Not V8 specific, but here are a few more helpful GDB commands. Happy debugging!

```bash
# Run until breakpoint or the end
(gdb) r
# Go to the next line.
(gdb) n
# Continue to the next breakpoint. 
(gdb) c
# Step into a function.
(gdb) s

# List all your breakpoints, enable and disable them.
(gdb) info b
(gdb) disable 3
(gdb) enable 3

# You can shorten all commands in gdb, they only need to be so long that they are unique. Like p for print. 
# Make use of tab completion, arrow up-down, reverse-i-search, and readline commands.
# Enter repeats the last command.
```

---

Thanks to Yang Guo for [adding his jlh command to V8’s gdbinit](https://codereview.chromium.org/2628293003) and thanks to Andreas Haas for proofreading and valuable corrections.
