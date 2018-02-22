import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,   
    document.getElementById('root')
);
registerServiceWorker();


// const store = createStore(reducer)

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider >,   
//     document.getElementById('root')
// );
// registerServiceWorker();
