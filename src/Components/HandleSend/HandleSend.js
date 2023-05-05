import { getSelectedValue } from "../Radio";

const handleSend = () => {
    const userInput = document.getElementById("my-input").value;
    console.log(userInput);
    console.log(getSelectedValue());
    document.getElementById("my-input").value = "";
};

export default handleSend;