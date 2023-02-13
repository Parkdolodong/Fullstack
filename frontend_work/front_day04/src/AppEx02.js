import React, { useState, useEffect } from 'react';

function App() {
    const [fishArr, setFishArr] = useState(["상어", "고래", "거북이"]);
    const [newFish, setNewFish] = useState("광어");
    return (
        <div>
            <h1>Hello ReactJS</h1>
            <p>
                <input 
                    type="text" 
                    value={newFish} 
                    onChange={(e)=> {
                        setNewFish(e.target.value);
                        }}
                />
                <button 
                    onClick={(e)=> {
                        setFishArr([...fishArr, newFish]);
                        // state가 변경 되면서 component가 다시 렌더링 된다.
                        setNewFish("");
                    }}>
                    추가
                </button>
            </p>
            <ul>
                {fishArr.map((fish, idx)=> {
                    return <li key={idx}>{fish}</li>;
                })}
            </ul>
        </div>
    );
}

export default App;