import './App.css';
import { useState, useEffect } from 'react';
import ReadString from './ReadString'
import SetString from './SetString';
import EmergencyStop from './components/EmergencyStop';
import UPloadImage from './components/UploadImage';
import GetImage from './components/getImage';
import GetImageCount from './components/GetImageCount';

function App(props) {
  const [loading, setLoading] = useState(true)
  const [drizzleState, setdrizzleState] = useState(null)

  useEffect(() => {

    const { drizzle } = props;
    const unsubscribe = drizzle.store.subscribe(()=>{

      console.log("this is state", drizzle)
      const drizzleState = drizzle.store.getState();

      console.log("this is drizzle state", drizzleState)

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        
        setdrizzleState(drizzleState)
        setLoading(false)
        //this.setState({ loading: false, drizzleState });
      }
    })

    return ()=>{
      unsubscribe()
    }
  }, [])
  if (loading) return "Loading Drizzle...";
  
  return (
    <div className="App">
    <UPloadImage
    drizzle = {props.drizzle}
    drizzleState = {drizzleState}
    />

    <br/>
    <br/>
    <GetImage 
    drizzle = {props.drizzle}
    drizzleState = {drizzleState}
    />

    <br/>
    <br/>
    <GetImageCount 
    drizzle = {props.drizzle}
    drizzleState = {drizzleState}
    />


    
    
    <EmergencyStop
    drizzle = {props.drizzle}
    drizzleState = {drizzleState}

    ></EmergencyStop>

    </div>)
}

export default App;
