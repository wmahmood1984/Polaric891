import React, {  useState } from 'react'

export default function GetImage(props) {

    const [dataKey, setdataKey] = useState()
    const [_index, set_index] = useState()
    


    const handleKey = (_index)=>{
        const { drizzle,drizzleState } = props;
        const contract = drizzle.contracts.MyStringStore;

        const account = drizzleState.accounts[0]
    
        // let drizzle know we want to watch the `myString` method
        const dataKey = contract.methods["getImage"].cacheCall(account,_index);
    
        // save the `dataKey` to local component state for later reference
        setdataKey( dataKey );
    }


    const { MyStringStore } = props.drizzleState.contracts;

  // using the saved `dataKey`, get the variable we're interested in
  const myString = MyStringStore.getImage[dataKey];
  console.log("my string ", myString)
    
    



       
      return (
        <div style={{border:"solid 2px red", minWidth: "300px", minHeight:"200px",margin:"auto"}}>
          <label> Index <input value={_index} type="number"            
            onChange={({ target }) => set_index(target.value)}/></label>
  
            <br/>
  
           <button
              onClick={()=>{handleKey(_index)

                
              }}
              >Get Image</button>
      <br/>
      <br/>
      {myString &&  <img style={{width : "300px", height: "300px"}} alt="140x140" data-src="holder.js/140x140" 
      src={`https://gateway.pinata.cloud/ipfs/${myString.value[0]}`} 
      data-holder-rendered="true"></img> }
        </div>
      );
}
