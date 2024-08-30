import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'
import { SearchContextProvider } from './contexts/searchContext.tsx'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </SearchContextProvider>


    </QueryClientProvider>
  </React.StrictMode>,
)
