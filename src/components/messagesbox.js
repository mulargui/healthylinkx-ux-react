import  React, { Component } from 'react'

export class Messages extends Component {
	constructor(props) {
		super(props)
		
		// This bindings are necessary to make `this` work in the callback
		this.storeChanged = this.storeChanged.bind(this)

		//state of the controls in the div
		this.state = {	message: '', visible: false}
		
		this.props.store.subscribe(this.storeChanged)
	}
	
	storeChanged() {
		let v = this.props.store.getState()
		if(v.errorMessage === '') this.setState({message: '', visible: false})
		else this.setState({message: v.errorMessage, visible:true})
	}

	render(){ 
		if (!this.state.visible) return null
		return (
				<div className="container">
					<p></p>
					<div className="alert alert-danger">
						<span>{this.state.message}</span>
					</div>
				</div>
		)
	}
}
