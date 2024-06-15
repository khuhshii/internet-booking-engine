import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as Sentry from "@sentry/react";
import {Provider} from 'react-redux'
import { store } from './redux/store/store.ts';

import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './config/msalConfig.tsx';

Sentry.init({
  dsn: "https://78d3e3e698b8135a1112b20449b59099@o4506873748455424.ingest.us.sentry.io/4506873769754624",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  
  tracesSampleRate: 1.0, 
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0,
});


const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
    <App instance={msalInstance}/>
    </Provider>
  // </React.StrictMode>
)
