import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState("")

  // use ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789" 
    if (characters) str += "!@#$%^&*()_-+={}:<>?,./;'][" 
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, characters, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, characters])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3">Random Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly  ref={passwordRef}/>
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPasswordToClipboard}>Copy Password</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={8} max={32} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}}/>
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={number} id="numberInput" onChange={() => {
            setNumber((prev) => !prev);
          }}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={number} id="characterInput" onChange={() => {
            setCharacters((prev) => !prev);
          }}/>
          <label htmlFor="characterInput">characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
