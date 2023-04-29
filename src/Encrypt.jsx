import React, { useState } from "react";
import aes from "crypto-js/aes";
import tripledes from "crypto-js/tripledes";
import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

const Encrypt = () => {
  const [fileText, setFileText] = useState("");
  const [fileTextTwo, setFileTextTwo] = useState("");
  const [hashedText, setHashedText] = useState();
  const [unhashedText, setUnhashedText] = useState();
  const [algoritm, setAlgoritm] = useState("aes");

  var publicKey = `
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
    FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
    xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
    gwQco1KRMDSmXSMkDwIDAQAB`;

  var privateKey = `
    MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
    WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
    aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
    AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
    xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
    m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
    8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
    z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
    rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
    V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
    aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
    psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
    uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876`;

  let encryptt = new JSEncrypt();
  let decryptt = new JSEncrypt();

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setFileText(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const showFileTwo = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setFileTextTwo(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const encrypt = async () => {
    if (algoritm == "aes") {
      setHashedText(aes.encrypt(fileText, fileTextTwo).toString());
    } else if (algoritm == "tripledes") {
      setHashedText(tripledes.encrypt(fileText, fileTextTwo).toString());
    } else {
      encryptt.setPublicKey(publicKey);
      setHashedText(encryptt.encrypt(fileText));
    }
  };
  const decrypt = async () => {
    if (algoritm == "aes") {
      setUnhashedText(
        aes.decrypt(hashedText, fileTextTwo).toString(CryptoJS.enc.Utf8)
      );
    } else if (algoritm == "tripledes") {
      setUnhashedText(
        tripledes.decrypt(hashedText, fileTextTwo).toString(CryptoJS.enc.Utf8)
      );
    } else {
      decryptt.setPrivateKey(privateKey);
      console.log(decryptt.decrypt(encryptt));
      setUnhashedText(fileText);
    }
  };
  return (
    <div>
      <div className="main">
        <h1>Шифрование</h1>
        <h2>Выберите алгоритм шифрования: </h2>
        <select onChange={(e) => setAlgoritm(e.target.value)}>
          <option value="aes">AES</option>
          <option value="tripledes">Tripledes</option>
          <option value="rsa">RSA</option>
        </select>
        <h2>Выберите файл для считывания данных: </h2>
        <input
          type="file"
          onChange={(e) => showFile(e)}
          style={{ border: "none" }}
        />
        <h2>Текст с выбранного файла: </h2>
        <input
          type="text"
          value={fileText}
          onChange={(e) => setFileText(e.target.value)}
        />
        {algoritm != "rsa" && (
          <>
            <h2 style={{ marginTop: "30px" }}>
              Выберите файл для считывания секретного ключа:{" "}
            </h2>
            <input
              type="file"
              onChange={(e) => showFileTwo(e)}
              style={{ border: "none" }}
            />
            <h2>Текст с выбранного файла: </h2>
            <input
              type="text"
              value={fileTextTwo}
              onChange={(e) => setFileTextTwo(e.target.value)}
            />
          </>
        )}
        {algoritm == "rsa" && (
          <>
            <h2>Public key:</h2>
            <p>{publicKey}</p>
            <h2>Private key:</h2>
            <p>{privateKey}</p>
          </>
        )}
        <button onClick={() => encrypt()}>Зашифровать текст</button>
        <input type="text" disabled value={hashedText} />
        <button onClick={() => decrypt()}>Дешифровать текст</button>
        <input type="text" disabled={hashedText} value={unhashedText} />
        <button
          onClick={() => {
            setHashedText("");
            setUnhashedText("");
          }}
          style={{ background: "red" }}
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

export default Encrypt;
