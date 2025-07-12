import { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
}
export default Loading;
