import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';


import App from './components/App.js';
import Test from './components/Test.js';






export default(
		<Route path='/index.html' component={App}>
			<IndexRoute component={Test}/>
		</Route>
	)