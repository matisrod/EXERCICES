import { type FC } from 'react'
import './App.css'
import Header from './components/header';
import Main from './components/main';

const App: FC = () => {

  return (
    <div>
      <Header/>
      <Main/>
    </div>
  )
}

export default App
