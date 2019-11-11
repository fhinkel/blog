---
title: "How I learned to love the\_terminal"
date: 2019-11-08 08:38:57
tags:
  - bash,
  - terminal
  - beginners
  - linux
---

*An introduction to the command line.*

it's almost always available (unlike some GUI tools that must be installed); some people have to reduce their mouse use for ergo reasons; you can save frequently-used commands as aliases and save time; your bash history will save your bacon at least once when you forget how to do something (but watch out, if you have cleartext creds -- like making curl requests w/API keys or connecting to dbs w/ --password, those will be in your history ...)

Are you unfamiliar with the command line? Here are some tips that'll make working in the terminal much easier.

## Shortcuts instead of typing full commands

Use the **arrow up** and **arrow down** keys to iterate over the last used commands. 

Use **tab completion** to complete commands, directories and files, and even some parameters. Start typing one or two characters of a command. Then hit tab twice. If that gives you several options, type a few more letters and then hit tab again. You should never type out a full filename. Use tab aggressivly. It's muscle memory you need to build if you want to be fast on the command line.

If you remember part of a command, but not necessarily the beginning, you can search for that command using **reverse-i-search**. To use reverse-i-search, press Ctrl+R, then start typing the command. If there are commands that match what you've typed, you'll see a suggestion. You can keep typing to further refine your search results or press Ctrl+R again to cycle through the commands that match your search query in reverse order. 

## Navigate around

Use `cd ..` to navigate up one directory. Use `cd` to jump to your home directory. This is the same as `cd ~/`. Use `cd /` to jump to the root directory and `cd -` to go back to the last directory. 

Jump to the beginning and end of the line with **Ctrl A** and **Ctrl E**. You can move word by word with **option arrow left** and **option arrow right**.

When you realize that you're typing the wrong command, use **Ctrl C** to start over. This is faster than deleting the command character by character.  

## Hidden config files

To see hidden files, i.e., filenames that start with a dot, use `ls -la`. Check out the hidden .gitconfig in your home directory. Or edit the .gitignore file in a git project to exclude files from revision control. You can configure a lot of tools via a dot file. Many follow the convention of the config file name ending in rc ("run command"), like .npmrc for npm config settings. 

## Configure your terminal

The config file .bash_profile determines how your terminal, more specifically bash, behaves¹. The .bash_profile file is in your home directory (`~/`) . In this file you can do things like

* specify shortcuts with `alias`,
* configure your prompt, 
* set environment variables.

## Git on the command line

If you use git on the command line, there are a few tricks to make your life easier. Enable tab completion for git and configure custom shortcuts like `git co` instead of `git checkout`. For me, the most important feature is to always see what branch I'm on. 

{% asset_img terminal.png %}
My bash shows the current directory and the branch I'm on if I'm in a git directory.

```
# Configuration in .bash_profile

# The next line enables git autocompletion
. ~/.git-completion.bash

# The next lines configures a fancy prompt
. ~/.git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=1
export PS1='\[\e[35m\]\w$(__git_ps1 " (%s)")\$\[\e[0m\] '
```

Download the scripts from the git source code mirror and follow the instructions:  [.git-prompt.sh](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh) and [.git-completion.bash](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash). 
You can change the color of the prompt. I use different colors on different machines to easily see what machine I'm ssh'ed into.

## Most importantly 

Be adventurous. Don't let the terminal intimidate you! Once you know some basics, it's easy to work efficiently with the command line. Search [StackOverflow](https://stackoverflow.com/questions/tagged/command-line) for tips to make things even easier. Read through other people's config files (mine are [here](https://github.com/fhinkel/configs)). Go explore and try a few things. Lots of tips are really helpful, you just need to find those that work for you.


¹ .bash_profile is the default config for bash on MacOS. On Linux, use .bashrc.

*Many thanks to Amy Unruh, Sofia Leon, ErinMcKean, Sandra Friesen, and Sarah Clark for their thoughtful reviews and comments.**