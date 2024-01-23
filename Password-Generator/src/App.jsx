import './index.css';
// import Background from './component/Background';
import React, { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useref
  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '~`!@#$%^&*()_-+={[}]|\\:;\'<,>.?/';
    for (let i = 0; i < length; i++) { // Use < instead of <= to avoid an extra character
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copytoclipboard = useCallback(() => {
    passwordRef.current?.select(); // 
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password); // use for copy to clipboard
  }, [password]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);

  return (
    <>
      <div className="  w-1/4 mx-auto   items-center  px-4 py-3 bg-gray-400 rounded-3xl ">
        <h1 className="text-white rounded-lg text-3xl text-center my-3">Password Generator</h1>
        <div className="flex items-center justify-center  flex-shadow mb-4 mx-auto rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="W-full outline-none py-1 px-10 rounded-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copytoclipboard} className="outline-none text-white px-3 py-1 bg-blue-700 rounded-lg">
            copy
          </button>
        </div>
        <div className="text-sm gap-x-2 flex items-center justify-center">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              className="cursor-pointer w-7"
              value={numberAllowed}
              id="numberinput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberinput">Number</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className="cursor-pointer w-7"
              id="characterinput"
              value={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterinput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
