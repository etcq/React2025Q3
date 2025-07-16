import { Component, type ReactNode } from 'react';
import ErrorMessage from '../error-message/error-message';

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state: { error: boolean; errorMessage: string } = {
    error: false,
    errorMessage: '',
  };

  componentDidCatch(error: Error) {
    this.setState({
      error: true,
      errorMessage: error.message,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage message={this.state.errorMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
