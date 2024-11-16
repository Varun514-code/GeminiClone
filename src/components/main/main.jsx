import React, { useContext } from "react";
import './main.css'
import { assets } from "../../assets/assets";

import { Context } from "../../context/context";

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
    const handleInputChange = (event) => {
    if (event.key === 'Enter') {
      onSent();
      // Perform any additional actions here
    }
  };

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult?<>
                    <div className="greet">
                    <p><span>Hello, Varun</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Breifly summarize this concept: Urban Planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability if the followinf code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :<div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ? <div className="loader">
                            <hr/>
                            <hr/>
                            <hr/>
                            
                        </div>:<p dangerouslySetInnerHTML={{__html:resultData}}>
                            
                        </p>}
                        
                    </div>
                    
                </div>}

                
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Ask Gemini" onKeyDown={handleInputChange}/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="" onClick={() => onSent()}/>
                        </div>
                    </div>
                    <p className="bottom-info">Gemini can make mistakes, so double-check it</p>
                </div>
            </div>
        </div>
    )
}

export default Main