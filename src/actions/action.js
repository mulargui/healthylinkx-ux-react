import { SEARCH, SELECT, SPECIALITIES, ERRORMESSAGE, NEWSEARCH } from './actiontypes'

export function SearchDoctors(s,l,g,z,d, r) {
	return {
		type: SEARCH
		, search: {
			specialty: s
			, lastname: l
			, gender: g
			, zipcode: z
			, distance: d
		}
		, doctorslist: r
	}
}

export function SelectDoctors(r) {
	return {
		type: SELECT
		, selected: r
	}
}

export function AddSpecialities(l) {
	return {
		type: SPECIALITIES
		, specialities: l
	}
}

export function ErrorMessage(t) {
	return {
		type: ERRORMESSAGE
		, errorMessage: t
	}
}

export function NewSearch() {
	return {
		type: NEWSEARCH
	}
}
