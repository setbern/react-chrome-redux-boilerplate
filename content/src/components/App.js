import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //basic clicker to log redux is working across platform
    document.addEventListener('click', () => {
      console.log('testing')
      this.props.dispatch({
        type: 'ADD_COUNT'
      });
    });
  }

  render() {
    return (
      <div>
       does this hot reload as well?
       nahh yee plz work yass how does it know it chanved, does hot reloading not work with content
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
