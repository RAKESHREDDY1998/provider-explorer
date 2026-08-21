import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.tsx'
import Search from './Search.tsx'
import Provider from './Provider.tsx'
import '../../shared-styles/styles.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/" element={<App />}>
          <Route path="search" element={<Search />} />
          <Route path="provider/:id" element={<Provider />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
