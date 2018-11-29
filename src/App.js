import React, { Component } from 'react';
import loading from './assets/svg/loading.svg';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{margin: '25px auto', fontSize: '100px', fontWeight: '700',textAlign: 'center'}}>Servify</div>
        <img style={{display: 'block', margin: 'auto', width: '35vw'}} src={loading} alt='' />
      </div>
    );
  }
}

export default App;
