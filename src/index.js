import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';
import reportWebVitals from './reportWebVitals';
import App from './App';
import postStore from './store/PostStore';
import userStore from './store/UserStore';
import loginStore from './store/LoginStore';
import 'antd/dist/antd.css';

const store = {postStore,userStore,loginStore};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
