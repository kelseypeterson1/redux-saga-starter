import { put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchElements() {
    try {
        const elementsResponse = yield axios.get('/api/element');
        yield put ({ type: 'SET_ELEMENTS', payload: elementsResponse.data}); 
    } catch (error) {
        console.log('Error fetching elements', error);
    }
}

export default fetchElements;