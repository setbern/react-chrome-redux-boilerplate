# react-chrome-redux-boilerplate

##Overview

react-chrome-redux-boilerplate is boiler plate made with the intent of bare minumun boiler plate for building chrome extension with react. This boilerplate also uses redux for state handeling through out the whole app ( background page , content script and popup). All three files are bundled up together with webpack.config.js.

Development and production files are hosted in the same foler `react-chrome-redux-boilerplate/assets` this folder also will hold any static files such as images and fonts


Would be estatic to hear feedback from all, Just open an issue and lets your thoughts out!


## Getting Started

Clone latest repo by running:

	https://github.com/brgarciarivas/react-chrome-redux-boilerplate.git

	cd react-chrome-redux-boilerplate

##Install all dependencies, run: `npm install`

This will install all dependencies and developer tools

##Directory Layout

Get familiar with the folder structure

```
|-- /assets/								# Folder holds bundles of popup , background and content sript files
|-- /background/							# Holds all files associated with the background page of a chrome extension
	|-- /src/								# Entry point for bundle of the background page
		|-- /reducers/						# Reducers for redux
|-- /content/								# Holds all teh files associated with the content script of a chrome extension
	|-- /src/								# Entry point for the bundle of content script
		|-- /components/					# Any files associated with functionality of the content script 
|-- /popup/									# Holds all files associated with popup of a chrome extension
	|-- /components/						# Files making up the UI and functionality of Popup
	|-- /css/								# Holds all the styleing for popup
```

##Usage 

###General Info
Unlike other boiler plates the development is production ready.

Meaning , you begin with bundeling up the files with webpack on start of development and continue with a webpack-dev-server that listens to any changes you make and updates the bundles with `watch` option in webpack.config.js file.

Advantage of this process is using one webpack file to bundle up all three of the main parts of your chrome extension popup, background page and content script.

Cons of this process , need to manually dubplicate Index.html from `reacat-chrome-redux-boilerplate/popup/index.html` to `react-chrome-redux-boilerplate/assets/

##Begin development

Open up terminal and cd to project

Begin with running command:

	npm run build

this will create the basic bundle of the three files and output them to the assets folder in the top of the root directory

Follow up with opening up a second terminal tab and running:

	npm run start

This will start a wepack-dev-server that watches all the changes in either 
	
	./popup/index.js

	./background/src/index.js

	./content/src/index.js

webpack-dev-server will update the bundle files real time on change with inline and hot-reloading 







