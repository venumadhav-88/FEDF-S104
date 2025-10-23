import { use } from 'react';


import {useState , useEffect} from 'react';
function Timer(){
  const [seconds , setseconds] = useState(0);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setseconds(prevSeconds => prevSeconds + 1);
    },1000);

    return () => clearInterval(interval);
  },[]); 
  return <h2>Timeer: {seconds} seconds</h2>;
}


export default Timer;



export default App;