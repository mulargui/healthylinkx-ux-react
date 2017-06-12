import  React, { Component } from 'react'
import Select from 'react-select'
require('es6-promise').polyfill();
require('isomorphic-fetch');

import { TAXONOMYAPI, PROVIDERSAPI, PARAMSEPARATOR } from '../global'
import { UNIVERSE } from '../actions/actiontypes'
import { SearchDoctors, ErrorMessage } from '../actions/action'

export class Search extends Component {
	constructor(props) {
		super(props)
		
		// This bindings are necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this)
		this.loadSpecialities = this.loadSpecialities.bind(this)
		this.storeChanged = this.storeChanged.bind(this)

		//most of the state is kept in the controls of the form
		this.state = {specialty : '', visible: true}
		
		this.props.store.subscribe(this.storeChanged)
	}
	
	storeChanged() {
		//the state is kept in the controls of the form, nothing to do
		//this.setState(store.getState())
		let v = this.props.store.getState()
		if(v.state === UNIVERSE) this.setState({visible: true})
		else this.setState({visible: false})	
	}

	loadSpecialities(input)  {
		let store = this.props.store

		return fetch(TAXONOMYAPI)
			.then(function(response) {
				if (!response.ok)
					throw new Error("Bad response from server")
				return response.json()
			})
			.then(function(response) {
				if (!response.length === 0)
					throw new Error("No taxonomies!")
				var taxonomyTags = []
				response.forEach(function(entry) {
					taxonomyTags.push({ value: entry.Classification, label: entry.Classification })
				})
				return { options: taxonomyTags, complete: true}
			})
			.catch(function(error) {
				store.dispatch(ErrorMessage(error.message))
			})
	}
	
	handleClick() {	
		//let's form the URL to query
		var requeststring = PROVIDERSAPI
		var firstparam = true

		if ("" !== this.zipcode.value){
			if(firstparam) firstparam=false
			else requeststring+=PARAMSEPARATOR
			requeststring+="zipcode="
			requeststring+=this.zipcode.value
		}

		if ('N' !== this.gender.value){
			if(firstparam) firstparam=false
			else requeststring+=PARAMSEPARATOR
			requeststring+="gender="
			requeststring+=this.gender.value
		}

		if ("" !== this.lastname.value){
			if(firstparam) firstparam=false
			else requeststring+=PARAMSEPARATOR
			requeststring+="lastname1="
			requeststring+=this.lastname.value
		}
			
		if ("undefined" !== typeof this.state.specialty.value){
			if(firstparam) firstparam=false
			else requeststring+=PARAMSEPARATOR
			requeststring+="specialty="
			requeststring+=this.state.specialty.value
		}
	
		if(firstparam) firstparam=false
		else requeststring+=PARAMSEPARATOR
		requeststring+="distance="
		requeststring+=this.distance.value

		//lets call the api, collect the data and dispath the result to the store
		let store = this.props.store
		let specialty = this.state.specialty.value
		let lastname = this.lastname.value
		let gender = this.gender.value
		let zipcode = this.zipcode.value
		let distance = this.distance.value
		
		fetch(requeststring)
			.then(function(response) {
				if (!response.ok)
					throw new Error("Bad response from server")
				return response.json()
			})
			.then(function(response) {
				if (response.length === 0)
					throw new Error("No matching providers were found.")
				return store.dispatch(SearchDoctors( specialty, lastname, gender, zipcode, distance, response))
			})
			.catch(function(error) {
				store.dispatch(ErrorMessage(error.message))
			})
	}

	render(){ 
		if (!this.state.visible) return null

		return (
				<div className="container">
					<legend>Providers Search</legend>
					<div className="row">
						<Select.Async name="form-field-name" onChange={value => this.setState({specialty:value})} value={this.state.specialty}
							loadOptions={this.loadSpecialities} placeholder="Type a Medical Specialty" />
						<p></p>
					</div>
					<div className="row">
						<input type="text" className="form-control" ref={(e) => this.lastname = e} placeholder="Last Name" maxLength="30" pattern="\w+"></input>
						<p></p>
					</div>
					<div className="row">
						<select className="form-control" ref={(e) => this.gender = e}>
							<option value="N">No gender preference</option>
							<option value="F">Female only</option>
							<option value="M">Male only</option>
						</select>
						<p></p>
					</div>
					<div className="row">
						<input type="text" className="form-control" ref={(e) => this.zipcode = e} placeholder="Zip Code" autoComplete="off" maxLength="5" pattern="\d{5}"></input> 
						<p></p>
					</div>
					<div className="row">
						<select className="form-control" ref={(e) => this.distance = e}>
							<option value="5">Within 5 miles</option>
							<option value="10">Within 10 miles</option>
							<option value="25">Within 25 miles</option>
						</select>
						<p></p>
					</div>
					<div className="row">
						<button className="btn btn-link" onClick={this.handleClick}>
							<i className="glyphicon glyphicon-search"></i>&nbsp;Search</button>
					</div>
				</div>
		)
	}
}