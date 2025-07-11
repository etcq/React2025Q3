import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorMessage from '../error-message/error-message';

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state: { error: boolean } = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render(): ReactNode {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
