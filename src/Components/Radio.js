import { useEffect, useState } from "react";
import "./Radio.css";

function getSelectedValue() {
  const checkedRadio = document.querySelector('input[name="algorithm"]:checked');
  if (checkedRadio) {
    return checkedRadio.value;
  }
}

export { getSelectedValue };

function Radio() {
  const [selectedValue, setSelectedValue] = useState("kmp");

  useEffect(() => {
    const checkedRadio = document.querySelector('input[name="algorithm"]:checked');
    if (checkedRadio) {
      setSelectedValue(checkedRadio.value);
    }
  }, []);

  function handleRadioChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <div className="user-radio-button">
      <input type="radio" id="kmp" name="algorithm" value="kmp" checked={selectedValue === "kmp"} onChange={handleRadioChange} />
      <label htmlFor="kmp">KMP</label>
      <input type="radio" id="bm" name="algorithm" value="bm" checked={selectedValue === "bm"} onChange={handleRadioChange} />
      <label htmlFor="bm">BM</label>
      {/* <p>Selected value: {selectedValue}</p> */}
    </div>
  );
}

export default Radio;