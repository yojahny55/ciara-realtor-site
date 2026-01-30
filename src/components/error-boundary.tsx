import { Component } from 'preact';
import type { ComponentChildren } from 'preact';

interface ErrorBoundaryProps {
  fallback?: ComponentChildren;
  children: ComponentChildren;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack?: string }): void {
    console.error('Island error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div style={{
          padding: '1rem',
          border: '1px solid #ef4444',
          borderRadius: '0.5rem',
          backgroundColor: '#fef2f2',
          color: '#991b1b',
        }}>
          <p>Something went wrong loading this component.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
