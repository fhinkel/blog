# Blog

## Notes to myself

Make changes in `source/_posts`. 

Publish to GitHub Pages with 

```
npx hexo generate; cd public; git ci -am 'Update' && git push; cd ..;
```

Or use the shortcut in `.gitconfig` (`git hexp`). 

Delete `speaking/index.html` in `public` if you want to regenerate it. Same for the archive and landing  page.