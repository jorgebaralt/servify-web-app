import React, { Component } from 'react';
import LoadingDots from './components/LoadingDots/LoadingDots'

// react-router-dom
import { withRouter } from 'react-router-dom';

// redux-sagas
import { connect } from 'react-redux';
import { mobileCreator } from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.onIsMobile();
    // TODO fetch popular categories global
    // TODO last viewed services --> landing
    // TODO fetch new services near you --> landing
    // TODO popular near services --> landing
  }

  render() {
    return (
      <div>
        <div style={{ margin: '25px auto', fontSize: '100px', fontWeight: '700', textAlign: 'center' }}>Servify</div>
        <LoadingDots width={'5vw'}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.mobileReducer.isMobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIsMobile: () => dispatch(mobileCreator.isMobileInit())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
