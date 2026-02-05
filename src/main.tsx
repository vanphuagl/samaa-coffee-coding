import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import 'src/styles/main.scss'

// load fonts
// import { preconnectFonts, loadFonts } from 'src/utils/LoadFonts'
// preconnectFonts()
// setTimeout(() => {
//   loadFonts()
// }, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
