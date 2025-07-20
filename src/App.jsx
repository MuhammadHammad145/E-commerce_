import React from 'react';
import './App.scss';
import '@ant-design/v5-patch-for-react-19';
import "bootstrap/dist/js/bootstrap.bundle";
import Index from './pages/Routes';
import { useAuthContext } from './context/Auth';
import ScreenLoader from './components/ScreenLoader';


function App() {
 
  const {isAppLoading}=useAuthContext()

  return (
    <>
    {isAppLoading
      ?<ScreenLoader/>
      :<Index/>
    }
    
    </>
  )
}

export default App
