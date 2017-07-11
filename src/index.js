import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  MuiThemeProvider,
  createMuiTheme
} from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';

import AppContainer from './csu-app-template/AppContainer';
import App from './App';

import config from './config.json';
import theme from './csu-app-template/theme.json';

injectTapEventPlugin();

const muiTheme = createMuiTheme({
  palette: createPalette(theme.palette)
});

ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <AppContainer config={config}>
      <App/>
    </AppContainer>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
