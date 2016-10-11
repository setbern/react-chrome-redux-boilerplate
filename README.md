# react-chrome-redux-boilerplate

##General Info

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