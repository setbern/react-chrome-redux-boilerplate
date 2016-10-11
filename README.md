# react-chrome-redux-boilerplate


##Overview

This boilerplate uses redux for state handeling throughout the whole app ( background page , content script and popup). All three files are bundled together using webpack (webpack.config.js).

The same webpack bundles are used for both development and production.  Bundles and static files such as images and fonts are hosted in '/assets'.

## Getting Started

Clone latest repo and install dependencies:

	$ git clone https://github.com/brgarciarivas/react-chrome-redux-boilerplate.git

	$ cd react-chrome-redux-boilerplate
	
	$ npm install


##Directory Layout

Get familiar with the folder structure

```
|-- /assets/								# Contains all webpack bundles and static assets.  Used for development AND production.
|-- /background/							# Holds all files associated with the background page of a chrome extension
	|-- /src/								# Entry point for bundle of the background page
		|-- /reducers/						# Reducers for redux
|-- /content/								# Holds all files associated with the content script of a chrome extension
	|-- /src/								# Entry point for the bundle of content script
		|-- /components/					# Any components used by the content script 
|-- /popup/									# Holds all files associated with popup of a chrome extension
	|-- /components/						# Files making up the UI and functionality of Popup
	|-- /css/								# Holds all the styling for popup
```

##Usage 

###General Info
Unlike other boiler plates the development is production ready.

Meaning , editing files from outside the assets folder will be reflected in the produciton bundle.

Advantage of this process is using one webpack file to bundle up all three of the main parts of your chrome extension popup, background page and content script. This makes it extremly easy to test right away right to the chrome extension.

Cons of this process , need to manually dubplicate Index.html from `reacat-chrome-redux-boilerplate/popup/index.html` to `react-chrome-redux-boilerplate/assets/`

##Begin development

Open up terminal and cd to project

Begin with running command:

	$ npm run build

this will create the basic bundle of the three files and output them to the assets folder in the top of the root directory

Webpack watches over these entry points and reflects the changes in the production bundle 	

	./popup/index.js

	./background/src/index.js

	./content/src/index.js


##Popup development

popup follows normal react logic using `popup/index.js as the entry point. This file also defines the port where it connects with the background page uisng react-chrome-redux

simply develop as a normal react UI application intergrated with redux

##Background page development

The background page holds the redux store communicating it between the content script and popup page

Redux store is created in `background/src/index.js`
	
Configure the reducers in `background/src/reducers`

##Content script development

Content script is inject programatilly through the background page in `background/index.js`

Script is injected on First tab created and any tab change ( basically whenever you change url )


##Load unpack extension with `react-chrome-redux-boilerplate/assets`

You will see the changes upon reopening the popup or refreashing either background or local page content script is being injected to


Would be estatic to hear feedback from all, Just open an issue and lets your thoughts out!


###Huge shout out to @tshaddix much of this is based off his examples he gave at soCal Talk and for blessing us with react-chrome-redux






