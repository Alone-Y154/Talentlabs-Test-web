import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <GoogleOAuthProvider clientId="485713951108-t87sjmencv92nh3pff3k5o6sf7ba8re9.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
