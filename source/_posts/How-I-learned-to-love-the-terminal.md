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

Are you unfamiliar with the command line? Here are some tips that'll make working in the terminal much easier.

## Shortcuts instead of typing full commands

Use the **arrow up** and **arrow down** keys to iterate over the last used commands. 

Use **tab completion** to complete commands, directories and files, and even some parameters. Start typing one or two characters of a command. Then hit tab twice. If that gives you several options, type a few more letters and then hit tab again. You should never type out a full filename. Use tab aggressivly. It's muscle memory you need to build if you want to be fast on the command line.

If you remember parts of a command, not necessarily the beginning, you can search for that command with **Ctrl R**. Type Ctrl R, this starts **reverse-i-search**. Then start typing your command. You'll see a suggestion. You can keep typing to further refine your search results or hit Ctrl R to cycle through the commands that match the search query in reverse order. 

## Navigate around

Use `cd ..` to navigate up one directory. Use `cd` to jump to your home directory. This is the same as `cd ~/`. Use `cd /` to jump to the root directory and `cd -` to go back to the last directory. 

Jump to the beginning and end of the line with **Ctrl A** and **Ctrl E**.

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
