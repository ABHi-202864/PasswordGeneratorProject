import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLenth] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (symbolsAllowed) str += "!@#$%^&*{}[]_+=-~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolsAllowed, setPassword]);

  // Copy to Clipboard logic here
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, symbolsAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full md:max-w-[40%] mx-auto shadow-md rounded-lg px-6 md:px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center mb-5 mt-5">Password Generator.</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-200 text-xl"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="text-lg outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-500"
          >
            copy
          </button>
        </div>

        <div className=" md:flex text-sm gap-x-2 mt-6">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLenth(e.target.value)}
              className="cursor-pointer"
            />

            <label className="text-base">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 ml-4">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="numberInput" className="text-base">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 ml-4">
            <input
              type="checkbox"
              id="characterAllowed"
              defaultChecked={symbolsAllowed}
              className="cursor-pointer"
              onChange={() => {
                setSymbolsAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="symbolsInput" className="text-base">Symbols</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
