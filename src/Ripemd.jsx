import React, { useState } from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ripemd160 from "ripemd160-js/ripemd160.mjs";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Ripemd = () => {
  const [fileText, setFileText] = useState("");
  const [hashedText, setHashedText] = useState();
  const [hashedASCII, setHashedASCII] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const data = {
    labels: Array.from(Array(40).keys()),
    datasets: [
      {
        data: hashedASCII && hashedASCII,
        pointStyle: "rect",
        borderColor: "#42b4f4",
      },
    ],
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setFileText(text);
    };
    reader.readAsText(e.target.files[0]);
  };
  function toASCII(string) {
    let array = string.split("").map((char) => char.charCodeAt(0));
    setHashedASCII(array);
  }
  return (
    <div>
      <div className="main">
        <h1>Ripemd-160</h1>
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
        <button
          onClick={() =>
            ripemd160(fileText).then((text) => setHashedText(text))
          }
        >
          Зашифровать текст
        </button>
        <input type="text" disabled value={hashedText} />
        <button
          onClick={() => {
            toASCII(hashedText);
            setIsShow(!isShow);
          }}
        >
          Показать график
        </button>
      </div>
      <div className="graph">{isShow && <Line data={data} />}</div>
      {isShow && (
        <table>
          <tr>
            <td>Индекс</td>
            <td>Значение</td>
            <td>ASCII</td>
          </tr>
          {hashedASCII &&
            hashedASCII.map((item, index) => (
              <tr>
                <td>
                  <span>{index}</span>
                </td>
                <td>
                  <span>{hashedText.split("")[index]}</span>
                </td>
                <td>
                  <span>{item}</span>
                </td>
              </tr>
            ))}
        </table>
      )}
    </div>
  );
};

export default Ripemd;
