import React, {  useState } from 'react'

export default function GetImageCount(props) {

    const [dataKey, setdataKey] = useState()
    const [myString, setmyString] = useState()
    


    const handleKey = ()=>{
        const { drizzle,drizzleState } = props;
        const contract = drizzle.contracts.MyStringStore;

        const account = drizzleState.accounts[0]
    
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["getImageCount"].cacheCall(account);
    
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
        console.log("datakey",dataKey)

     
  // using the saved `dataKey`, get the variable we're interested in

  const { MyStringStore } = props.drizzleState.contracts;

  setmyString(MyStringStore.getImageCount[dataKey])
  console.log("my string Count ", myString)

    }

    
    
    



       
      return (
        <div  style={{border:"solid 2px blue", width: "100px", height:"100px",margin:"auto"}}>
          <button
              onClick={()=>{handleKey()
                
              }}
              >Get Image Count</button>
  
        {myString &&  <p>{myString.value}</p> }
        </div>
      );
}
