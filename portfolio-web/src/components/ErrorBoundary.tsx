import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crashed:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-ink text-paper p-8 font-sans">
          <p className="font-mono text-accent text-sm mb-4">Something went wrong</p>
          <pre className="text-sm text-paper/70 whitespace-pre-wrap">{this.state.error.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
