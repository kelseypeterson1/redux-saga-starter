import { put } from 'redux-saga/effects';
import axios from 'axios';

function* postElement(action) {
    try {
        yield axios.post('/api/element', action.payload);
        yield put({ type: 'FETCH_ELEMENTS' });
    } catch (error) {
        console.log('Error posting an element', error);
    }
}

export default postElement;