import React from 'react';
import ReactDOM from 'react-dom';
import 'rxjs';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css/animate.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'flag-icon-css/css/flag-icon.css';
import 'react-virtualized/styles.css'

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
