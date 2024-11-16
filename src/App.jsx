import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(6)
  const [password, setPassword] = useState("")
  const [number, setNumber] = useState(false)
  const [character, setCharecter] = useState(false)
  //useReff hook

  const passwordReff = useRef(null)
  const passwordGeneretor = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+='0123456789'
    if(character) str+='!@#$%^&*()_+~`'
    for(let i=0; i<count; i++){
      let char = Math.floor(Math.random()*str.length)
      pass += str[char] 
    }
    setPassword(pass)
  }, [count, number, character, setPassword])

  const copyPassword = useCallback(()=>{
    passwordReff.current.select()
    // passwordReff.current.setSelectionRange(0,5) 
    //direct
    window.navigator.clipboard.writeText(password)
  }
  ,[password])

  useEffect(()=>{passwordGeneretor()}, [count, number, character, setPassword])

  return (
    <>
      <div className='body_0'>
        <div>
          <p style={{color:'black'}}><strong>Password generator</strong></p>
        <input style={{margin:'5px','padding':'5px'}} placeholder='password' className='passwordInput' value={password} readOnly 
        ref={passwordReff}/>
        <button style={{'margin':'5px','padding':'5px'}} onClick={copyPassword}>copy</button>
        </div>
        <div> 
        <div style={{margin:'10px'}}>
        <input type='range'  min={6} max={40} value={count} onChange={(e)=>{setCount(e.target.value)}} />
        <label style={{color:'black'}}>{count}</label>
        <input type='checkbox'  defaultChecked={number} onChange={()=>{setNumber(prev=>!prev)}}/>
        <label style={{color:'black'}}>Number</label>
        <input type='checkbox' defaultChecked={character} onChange={()=>{setCharecter(prev=>!prev)}}/>
        <label style={{color:'black'}}>Character</label>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
