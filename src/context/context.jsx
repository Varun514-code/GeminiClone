import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayePara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord)
    },75*index)


}

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response ;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }else {
            setPreviousPrompts(prev => [...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        
       
       let responseArr = response.split("**");
       let newResponse = "";
       for(let i = 0; i <responseArr.length; i++){
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArr[i];
            }else {
                newResponse += `<b>${responseArr[i]}</b>`;
            }

       }
       let newResponse2 = newResponse.split("*").join("</br>")
       let newResponseArray = newResponse2.split(" ");
       for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayePara(i,`${nextWord} `)
        
       }
       setLoading(false)
       setInput("")
    }

    
    const contextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}



export default ContextProvider