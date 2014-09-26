# tbpl-hou
TBPL Hou lets Gaia developers get notifications when the jobs are done.

## Build
To build the project, we need to install [gulp](http://gulpjs.com) and dependent modules first.
```
npm -g install gulp
npm install
```
Then run
```
gulp build
```
to build tbpl-hou, and we could get the Firefox Add-ons and the Chrome Extension in the `~/path/to/tbpl-hou/build` folder.

Build Firefox Addon.
```
gulp build-firefox-addon
```

Build Chrome Extension.
```
gulp build-chrome-extension
```

## Download
### version 0.0.2
Match different URLs(`https://tbpl.mozilla.org/?rev=*&tree=Gaia-Try` or `https://tbpl.mozilla.org/?tree=Gaia-Try&rev=*`).
* [Firefox Add-ons](https://evanxd.github.io/tbpl-hou/download/tbpl-hou-0.0.2.xpi)
* [Chrome Extension](https://evanxd.github.io/tbpl-hou/download/tbpl-hou-0.0.2.crx)

### version 0.0.1
Send the result notification once the TBPL job is done.
* [Firefox Add-ons](https://evanxd.github.io/tbpl-hou/download/tbpl-hou-0.0.1.xpi)
* [Chrome Extension](https://evanxd.github.io/tbpl-hou/download/tbpl-hou-0.0.1.crx)
