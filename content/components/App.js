import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            console.log('testing')
            this.props.dispatch({
                type: 'ADD_COUNT'
            });
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(App);
