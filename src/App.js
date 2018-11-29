import React, { Component } from 'react';
import LoadingDots from './components/LoadingDots'

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ margin: '25px auto', fontSize: '100px', fontWeight: '700', textAlign: 'center' }}>Servify</div>
        <LoadingDots style={{display: 'block', margin: 'auto', width: '35vw'}}/>
      </div>
    );
  }
}

export default App;
