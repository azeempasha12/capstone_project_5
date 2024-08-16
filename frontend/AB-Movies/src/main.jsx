import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './component/authContext.jsx'

render(
    <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider>
    </BrowserRouter>,
    document.getElementById('app')
)
