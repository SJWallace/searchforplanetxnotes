import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: '10px', border: '1px solid #f44336', borderRadius: '4px', margin: '10px 0' }}>
          <h3 style={{ color: '#f44336' }}>Something went wrong</h3>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Show error details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>Component Stack:</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
          {this.props.fallback}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;