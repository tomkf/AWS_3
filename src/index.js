import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//amplify config:

import Amplify from 'aws-amplify';
import config from './config';

ReactDOM.render(<App />, document.getElementById('root'));

//config method called from amplyfiy api, and provided with our configure settings for the remote connection 
Amplify.configure({
    Auth:{
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
