# NoPhoneWeek - front-end

[![Build Status](https://travis-ci.org/NoPhoneWeek/front-end.svg?branch=master)](https://travis-ci.org/NoPhoneWeek/front-end)

# Git usage (DO NOT USE GIT GUIS)

```
# always start from master branch
git checkout master

# make sure you have the latest changes
git pull —rebase

# create your working branch
git checkout -b my-new-branch

# … change files

# add your changed/new files
git add my-file.scss # as an example

# add a commit message
git commit -m 'what I changed here and why'

# push your new branch to repository
git push origin my-new-branch
```

> You should **NEVER** commit *master* branch into your branch. If you need to do this, then you did something wrong. Rebase is safe and should add your changes above master changes.

> Now you can go on github and create a Pull Request

If you and somebody else changed the same line in a file then you may have a git conflict. If this happens you should run these commands to solve the conflicts:

```
# you are on your branch here. Make sure you have no changes uncommited

# go to master branch
git checkout master

# make sure you have the latest changes from master branch
git pull --rebase

# switch back to your branch
git checkout my-new-branch

# rebase your branch against master branch
git rebase -i master

# here you'll have to follow screen instructions. This is not an easy step

# Force push your fixed branch to github repository
git push -f origin my-new-branch
```

### Requirements

> This project was tested on an UNIX based OS (Ubuntu 15.04 and OS X 10.11)

| Package | Minimal version |
| --- | --- |
| nodejs | v5 |
| npm | 3.8.6 |
| gulp | view package.json |
| bower | view package.json |
| boostrap | 3.3.6 |

### Installation

```
npm install
```

### Run 
```
npm start
```

### Build
To build distribution files without running the live server
```
npm run build
```

### Generating Images
Images should be built with the primary build task but to build images explicitly run `npm run images`.

> For production and if you want optimized images in dev use `npm run optimized-images` (requires imagemagick & graphicsmagick)

### Generating Styleguide
```
npm run styleguides
```
and your styleguide will be available in `{hostname}/styleguides.html` from the browser.

### Test
```
npm test
```

### Contributing
You are encouraged to contribute. To do so please read the [contributing guide](https://github.com/NoPhoneWeek/front-end/blob/master/CONTRIBUTING.md)

