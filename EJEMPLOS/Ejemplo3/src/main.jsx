import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import EmailInput_01 from './EmailInput_01.jsx'
// import EmailInput_02 from './EmailInput_02.jsx'
// import EmailInput_03 from './EmailInput_03.jsx'
// import EmailInput_04 from './EmailInput_04.jsx'
    // import EmailInput_05 from './EmailInput_05.jsx'
    import EmailInput_06 from './EmailInput_06.jsx'
// import Counter from './Counter.jsx'
//  import EmailInput_07 from './EmailInput_07.jsx'
//  import EmailInput_08 from './EmailInput_08.jsx'
 import EmailInput_09 from './EmailInput_09.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <EmailInput_01 /> */}
      {/* <EmailInput_02 /> */}
         {/* <EmailInput_03 /> */}
         {/* <EmailInput_04 /> */}
         {/* <EmailInput_05 /> */}
         {/* <EmailInput_06 /> */}
         {/* <Counter/> */}
         {/* <EmailInput_07 /> */}
         {/* <EmailInput_08 /> */}
           <EmailInput_09 />
  </StrictMode>,
  
)
