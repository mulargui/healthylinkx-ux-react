import { createStore } from 'redux'
import { myreducer } from '../reducers/reducer'

export function configureStore() {
	return createStore(myreducer)
}
