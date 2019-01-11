import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import './assets/plugins/jvectormap/jquery-jvectormap-2.0.2.css';
// import './assets/plugins/fullcalendar/vanillaCalendar.css';
// import './assets/plugins/morris/morris.css';
// import './assets/css/bootstrap.min.css';
// import './assets/css/icons.css';
// import './assets/css/style.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
