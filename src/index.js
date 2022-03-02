import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// bringing redux saga into our project:
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import elementList from './reducers/elementList.reducer';
import postElement from './sagas/addElement.saga';
import fetchElements from './sagas/fetchElements.saga';

function* myGenerator() {
    yield true;
    yield 100;
    yield 'Hello!';
    yield [1, 2, 3];
    yield { key: 'value' };
}

function* getSwitch() {
    while (true) {
        yield 'on';
        yield 'off';
    }
}

const toggle = getSwitch();
console.log(toggle.next().value); // 'on'
console.log(toggle.next().value); // 'off'
console.log(toggle.next().value); // 'on'

// create an instance
const goGoGo = myGenerator();

// call the generator with .next()
console.log(goGoGo.next());
console.log(goGoGo.next());
console.log(goGoGo.next());
console.log(goGoGo.next());
console.log(goGoGo.next());
console.log(goGoGo.next());

// const elementList = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_ELEMENTS':
//             return action.payload;
//         default:
//             return state;
//     }
// };

// function* fetchElements() {
//     try {
//         const elementsResponse = yield axios.get('/api/element');
//         yield put ({ type: 'SET_ELEMENTS', payload: elementsResponse.data}); 
//     } catch (error) {
//         console.log('Error fetching elements', error);
//     }
// }

// function* postElement(action) {
//     try {
//         yield axios.post('/api/element', action.payload);
//         yield put({ type: 'FETCH_ELEMENTS' });
//     } catch (error) {
//         console.log('Error posting an element', error);
//     }
// }

function* firstSaga(action) {
    console.log('firstSaga was hit with action:', action)
}

// this is the saga that will watch for actions
// a generator function
// sagas are generator functions
function* watcherSaga() {
    // yield takeEvery('RUN_FIRST_SAGA', firstSaga);
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
    yield takeEvery('ADD_ELEMENT', postElement);
}


const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementList,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
