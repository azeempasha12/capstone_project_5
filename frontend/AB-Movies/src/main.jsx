// import { h, render } from 'preact';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './component/authContext.jsx';
// import App from './app.jsx';
// import './index.css';

// render(
//   <BrowserRouter>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </BrowserRouter>,
//   document.getElementById('app')
// );



//import App1 from './app1.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './component/authContext.jsx'



ReactDOM.createRoot(document.getElementById('app')).render(
    
    <BrowserRouter>
    <AuthProvider>
    
    <App />
    {/* <App1/> */}
   
    </AuthProvider>
    </BrowserRouter>
  )