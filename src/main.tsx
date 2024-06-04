import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './providers/theme-provider.jsx'
import {Toaster} from "@/component/components/ui/toaster.tsx"
import { QueryClient, QueryClientProvider } from 'react-query'
import ModelProvider from './providers/model-provider-file.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModelProvider>
        <App />
      </ModelProvider>
    <Toaster />
    </ThemeProvider>
     </QueryClientProvider>
  </React.StrictMode>,
)
