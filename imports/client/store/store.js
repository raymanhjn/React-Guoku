import {applyMiddleware,createStore} from 'redux';
import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware(promise,ReduxThunk)(createStore);
const Store = createStoreWithMiddleware(rootReducer);

export default Store;