import { Component } from "react";

export default class ErrorBoundary extends Component {
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

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#f7faf7" }}>
          <div style={{ maxWidth: 420, textAlign: "center", background: "#fff", padding: 40, borderRadius: 20, border: "1px solid #d8e5da" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>😕</div>
            <h2 style={{ margin: "0 0 8px", color: "#17351f", fontFamily: "'IBM Plex Serif', serif" }}>Something went wrong</h2>
            <p style={{ margin: "0 0 20px", color: "#65766a", fontSize: 14, lineHeight: 1.6 }}>
              We hit an unexpected error. Please try again or return home.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={this.handleRetry} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #277a44", background: "#277a44", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
                Try Again
              </button>
              <button onClick={() => { window.location.href = "/"; }} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #d8e5da", background: "#fff", color: "#277a44", fontWeight: 600, cursor: "pointer" }}>
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
