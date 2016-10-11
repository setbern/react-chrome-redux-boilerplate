# react-chrome-redux-boilerplate


##Overview
While other boiler plates for React chrome extensions exist, many of them contain additional dependencies or middleware which are not entirely necessary.
react-chrome-redux-boilerplate contains the bare minimum needed to get started with Chrome Extension development using React, Redux, and React-Router.
Install dependencies, build the webpack bundle, add the 'assets' folder as a chrome extension and you're good to go.  

## Getting Started

Clone latest repo, install dependencies:

	$ git clone https://github.com/brgarciarivas/react-chrome-redux-boilerplate.git

	$ cd react-chrome-redux-boilerplate
	
	$ npm install


##Usage

Begin by running command:

	$ npm run build

Webpack will create a bundle for background, content, and popop inside the '/assets' directory.  
KEEP YOUR TERMINAL WINDOW OPEN AFTER RUNNING THIS COMMAND!
the `watch:true` flag automatically updates bundles with any changes made to popup, content, or background in real time.
This allows your chrome extension to refresh automatically, similar to hot reloading with webpack-dev-server.  

Add the `/assets` directory to chrome as an extension and everything is be good to go.  
Try making some changes to `popup/components/App.js`.  Any changes should be visibile inside your Chrome extension automatically.  


##Directory Layout

```
|-- /assets/								# Contains all webpack bundles and static assets.  Used for development AND production.
|-- /background/							# Holds all files associated with the background page of a chrome extension
	|-- /reducers/							# Reducers for redux
|-- /content/								# Holds all files associated with the content script of a chrome extension
	|-- /components/						# Any components used by the content script 
|-- /popup/									# Holds all files associated with popup of a chrome extension
	|-- /components/						# Files making up the UI and functionality of Popup
	|-- /css/								# Holds all the styling for popup
```

##Popup development
Popup follows normal react logic using `popup/index.js` as the entry point. This file also defines the port used to connect to the background page.
Simply develop as a normal react UI application with redux.

##Background page development
The background page manages the redux store and communication between the content script and popup page
Redux store resides in `background/index.js`
Configure reducers in `background/reducers`

##Content script development
The background page programatically injects any required content scripts via `background/index.js`
Scripts are injected when browser tabs are created or changed ( basically whenever you change url ).

###Huge shout out to @tshaddix! Much of this is based off examples given at SoCal Talk and ract-chrome-redux