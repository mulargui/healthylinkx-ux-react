import { UNIVERSE, LIST, SELECTED, SEARCH, SELECT, SPECIALITIES, ERRORMESSAGE, NEWSEARCH } from '../actions/actiontypes'

const initialState = {
	state: UNIVERSE
	, search: {
		specialty: ''
		, lastname: ''
		, gender: ''
		, zipcode: ''
		, distance: ''
	}
	, specialities: []
	, doctorslist: []
	, selected: {
		transaction: 0
		, shortlist: []
	}
	, errorMessage: ''
}

export function myreducer(state = initialState, action) {
	switch(action.type){
	case SEARCH:
		return Object.assign({}, state, {
			state: LIST
			, search: action.search
			, doctorslist: action.doctorslist.slice()
			, errorMessage: ''
		})
	case SPECIALITIES:
		return Object.assign({}, state, {
			specialities: action.specialities.slice()
			, errorMessage: ''
		})
	case ERRORMESSAGE:
		return Object.assign({}, state, {
			errorMessage: action.errorMessage
		})
	case NEWSEARCH:
		return Object.assign({}, state, {
			state: UNIVERSE
			, errorMessage: ''
		})
	case SELECT:
		return Object.assign({}, state, {
			state: SELECTED
			, selected: {
				transaction: action.selected[0].Transaction
				, shortlist: action.selected[1].slice()
			}
			, errorMessage: ''
		})
	default:
		return state
	}
}
