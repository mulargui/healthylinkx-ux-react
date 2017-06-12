import './app.css'

import React, { Component } from 'react'
var FontAwesome = require('react-fontawesome')
import { configureStore } from '../containers/store'
import { Search } from './search'
import { Messages } from './messagesbox'
import { ProvidersList } from './providerslist'
import { ProvidersShortList } from './providershortlist'

//create the global store for redux
let store = configureStore()

class Header extends Component {
	render(){ 
		return (
				<div className="container" id="Logo">
					<a href="index.html">
						<h1><FontAwesome name='fa fa-user-md'/>
						<strong>Healthy</strong>Linkx</h1>
					</a>
					<p className="lead">Mapping the healthcare world!</p>
				</div>
		)
	}
}

class Footer extends Component {
	render(){ 
		return (
				<footer className="footer">
					<p></p>
					<div className="container">
						<p>HealthyLinkx &copy; 2014</p>
					</div>
				</footer>
		)
	}
}

class App extends Component {
	render(){ 
		return (
			<div>
				<Header />
				<Search store={store}/>		
				<ProvidersList store={store}/>		
				<ProvidersShortList store={store}/>		
				<Messages store={store}/>
				<Footer />
			</div>
		)
	}
}

export default App