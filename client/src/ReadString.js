import React, { useEffect, useState } from 'react'

export default function ReadString(props) {

    const [dataKey, setdataKey] = useState()
    useEffect(()=>{
        const { drizzle } = props;
        const contract = drizzle.contracts.MyStringStore;
    
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["myString"].cacheCall();
    
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
    },[])


    const { MyStringStore } = props.drizzleState.contracts;

  // using the saved `dataKey`, get the variable we're interested in
  const myString = MyStringStore.myString[dataKey];
  console.log("my string ", myString)
    return (
        <div>
            Hello read string 
            <p>My stored string: {myString && myString.value}</p>;
        </div>
    )
}
