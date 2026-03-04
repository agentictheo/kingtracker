import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider, teamsLightTheme, teamsDarkTheme } from '@fluentui/react-components'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>,
)
