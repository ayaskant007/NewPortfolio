import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-3xl z-[999999] text-white p-10 select-none">
          <div className="max-w-2xl text-center space-y-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold font-georama tracking-tight">System Exception Detected</h1>
            <p className="text-white/60 font-medium">An unexpected error has occurred within the macOS environment. This is often caused by a module resolution failure or an invalid animation state.</p>
            <div className="p-4 bg-white/10 rounded-lg border border-white/10 font-mono text-sm text-left overflow-auto max-h-[300px]">
                <span className="text-red-400">Error:</span> {this.state.error?.message || "Unknown error"}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
            >
              Restart Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
