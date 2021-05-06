import React, { useState } from 'react'
import ipfs from './ipfs'

export default function UPloadImage(props) {

    const [stackID, setStackID] = useState(null)
    const [_ipfsHash, set_ipfsHash] = useState()
    const [_title, set_title] = useState()
    const [_description, set_description] = useState()
    const [_tags, set_tags] = useState()


    const setValue = (_ipfsHash,_title, _description,_tags) => {
        const { drizzle, drizzleState } = props;
        const contract = drizzle.contracts.MyStringStore;
    
        // let drizzle know we want to call the `set` method with `value`
        const stackId = contract.methods["uploadImage"].cacheSend(_ipfsHash,_title, _description,_tags, {
          from: drizzleState.accounts[0]
        });
    
        // save the `stackId` for later reference
        setStackID(  stackId );
        set_ipfsHash("")
        set_title()
        set_description("")
        set_tags("")
        
      };


      const getTxStatus = () => {
        // get the transaction states from the drizzle state
        const { transactions, transactionStack } = props.drizzleState;
        
    
        // get the transaction hash using our saved `stackId`
        const txHash = transactionStack[stackID];
    
        // if transaction hash does not exist, don't display anything
        if (!txHash) return null;
    
        // otherwise, return the transaction status
        return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
      };
    
    



      var imageBugger;
      

      const captureFile = async (e)=>{
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = async ()=>{
         imageBugger = Buffer(reader.result)
          console.log("buffer",imageBugger)

        
        
        }


      }
      
      const handleSubmit = async (e)=>{
        e.preventDefault()

        await ipfs.files.add(imageBugger, (error,result)=>{
          if(error){
            console.error("error",error)
            return
          }
          set_ipfsHash(result[0].hash);
          console.log(`https://gateway.pinata.cloud/ipfs/${result[0].hash}`);
        })

      }  
      return (
        <div style={{border:"solid 2px green", width: "250px", height:"250px",margin:"auto"}}>
          <form onSubmit={handleSubmit}> <strong>Upload your file on IPFS</strong>
              <br/>
              <input type='file' onChange={captureFile}></input>
              <input type='submit'></input>
            </form>
  
            <br/>
  
            <label> Enter the Title <input value={_title} type="value"            
            onChange={({ target }) => set_title(target.value)}/></label>
  
            <br/>
  
            <label> Description <input value={_description} type="text"            
            onChange={({ target }) => set_description(target.value)}/></label>
  
            <br/>
  
            <label> Tags <input value={_tags} type="value"            
            onChange={({ target }) => set_tags(target.value)}/></label>
  
            <br/>
  
           <button
              onClick={()=>{setValue(_ipfsHash,_title,_description,_tags)
                
              }}
              >Mint</button>
  
              <div>{getTxStatus()}</div>
        </div>
      );
}
