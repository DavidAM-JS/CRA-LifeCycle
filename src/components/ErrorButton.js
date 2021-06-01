import React, { Component } from 'react';

class ErrorButton extends Component {
    state = { throwError: false };

    handleError = () => {
        this.setState({ error: true  });
    }

    render(){
        if (this.state.error) {
            throw new Error('There is an Error');
        }

        return <input  type="button" className="btn btn-lg btn-danger btn-block" onClick={this.handleError} value="Error"/>
  }
}

export default ErrorButton;