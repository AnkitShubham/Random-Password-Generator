import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [includeCapitalLetters, setIncludeCapitalLetters] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(5);

  const charsetLowercase = "abcdefghijklmnopqrstuvwxyz";
  const charsetCapitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsetNumbers = "0123456789";
  const charsetSymbols = "!@#$%^&*";

  const GeneratePassword = () => {
    let charset = charsetLowercase;
    let newPassword = "";

    if (includeCapitalLetters) {
      charset += charsetCapitalLetters;
    }
    if (includeNumbers) {
      charset += charsetNumbers;
    }
    if (includeSymbols) {
      charset += charsetSymbols;
    }

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  };

  useEffect(() => {
    document.getElementById("output").value = password;
    document.getElementById("display-length").innerHTML = passwordLength;
  });

  const handlePasswordLength = (event) => {
    const length = parseInt(event.target.value);
    setPasswordLength(length);
  };

  const copyPassword = () => {
    let pass = password;
    navigator.clipboard.writeText(pass);
  };

  return (
    <div className="container">
      <div className="heading">
        <h2>Password Generator</h2>
      </div>
      <div className="display">
        <input readOnly id="output" />
        <Copy className="copy-btn" onClick={copyPassword} />
      </div>
      <div className="pwd-length-cnt">
        <div className="pwd-length">
          <label>Password length:</label>
          <p id="display-length"></p>
        </div>
        <input
          type="range"
          min="5"
          max="20"
          value={passwordLength}
          onChange={handlePasswordLength}
          id="slider"
        />
      </div>
      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={includeCapitalLetters}
            onChange={() => setIncludeCapitalLetters(!includeCapitalLetters)}
          />
          Include Capital Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include Symbols
        </label>
      </div>
      <div className="gen-pwd">
        <button className="gen-pwd-btn" onClick={GeneratePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
