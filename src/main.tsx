import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { setupStore } from './store'

async function startApp() {
  try {
    const { worker } = await import('./mocks/browser')
    // console.log('MSW worker imported:', worker)

    await worker.start({
      onUnhandledRequest: 'warn',
    })
    // console.log('MSW start result:', result)
    console.log('MSW started successfully')
  } catch (error) {
    console.error('Failed to start MSW:', error)
    // console.error('Error details:', error.message)
  }

  const store = setupStore()

  const reactRoot = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  )
  reactRoot.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

startApp()