import './assets/css/tailwind.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router'
import { BaseIndex } from './views/base_index'
import { BaseAuth } from './views/base_auth'
import { Global404 } from './views/global_404'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseIndex />} />
        <Route path="/auth/*" element={<BaseAuth />} />
        <Route path="*" element={<Global404 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
