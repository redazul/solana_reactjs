import React, { useState } from 'react';
import {struct, u32, ns64} from '@solana/buffer-layout'
import * as web3 from '@solana/web3.js';

console.log(web3);
const network = "https://api.devnet.solana.com";
const connection = new web3.Connection(network);




function App() {

  const [state, setState] = useState("home");


  async function createTransaction()
  {
    let programId = new web3.PublicKey("Hm8ksu2QgER2JVMswjEBdLbYXdBZyrJq2X4NTidm7iVR");
    let pubkey = new web3.PublicKey(window.solana.publicKey.toString());
    let keys = [{isSigner:true,isWritable:true,pubkey:pubkey}]
    let recentBlockhash = await connection.getLatestBlockhash();
    let Buffer = require('buffer');
    console.log(Buffer)
    let data = Buffer.Buffer.alloc(0);
    let instructions = new web3.TransactionInstruction({data:data,programId:programId,keys:keys})


    const transaction = new web3.Transaction({
      feePayer:pubkey,
      recentBlockhash:recentBlockhash.blockhash,
      instructions:instructions
    });

    const signedTransaction = await window.solana.signTransaction(transaction);
    
    console.log(signedTransaction)


    // const { signature } = await window.solana.signAndSendTransaction(transaction);
    // await connection.confirmTransaction(signature); 
    





    // const { signature } = await window.solana.signAndSendTransaction(transaction);
    // await connection.confirmTransaction(signature);
  }

  async function phantomFlow()
  {
    console.log("here we go");
    const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if (isPhantomInstalled) {
    const resp = await window.solana.connect();
    console.log(resp.publicKey.toString())
    setState("program_id")
    document.getElementById("message_box").innerHTML = resp.publicKey.toString().slice(0,3)+"..."+resp.publicKey.toString().slice(-3);
    
  }else{
    window.open("https://phantom.app/", "_blank");
  }


  }

  if(state=="home")
  {
    

  return (

    <div style={{textAlign:"center",color:"white",marginTop:"250px",fontSize:"50px",fontFamily:"monospace"}}>

          <h1 >Solana Hello-World</h1>

          <div></div>

      <button
      onClick={phantomFlow}
      style={{marginTop:"25px"}}
      type="button"
      className="inline-flex items-center px-24 py-12 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Phantom
    </button>

    </div>


)

  }else if(state=="program_id")
  {
    return (

      <div style={{textAlign:"center",color:"white",marginTop:"250px",fontSize:"50px",fontFamily:"monospace"}}>
  
            <h1 >Solana Hello-World</h1>
            <div style={{fontSize:"20px"}}> Program Id</div>
            <div style={{fontSize:"20px"}}> Hm8ksu2QgER2JVMswjEBdLbYXdBZyrJq2X4NTidm7iVR</div>
            <h1 id="message_box"></h1>
  
      <div></div>

      <div>

        <div style={{marginTop:"45px"}} className="mt-1">
          <h4 >programId</h4>
          <input style={{color:"black",width:"500px",height:"45px",marginLeft:"auto",marginRight:"auto"}} type="email" name="email" id="email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Place programId here"></input>
        </div>
      </div>

      <button
      onClick={createTransaction}
      style={{marginTop:"100px"}}
      type="button"
      className="inline-flex items-center px-24 py-12 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Create Transaction
    </button>
  
          
  
      </div>
  
  
  )

  }


}

export default App;
