import React, { useState } from 'react';
import "./App.css";

function ItemRow({item, removeItem, checkItem}) {
    return (
        <li>
            <p>
                <input type="checkbox"
                    onClick={(e)=> {
                        checkItem(item.done, item.no);
                    }
                }/>
                <input 
                    type="text" 
                    disabled
                    className={item.done ? "checkItem" : "none"}
                    value={item.title}
                />
                <button 
                    onClick={(e)=> {
                        removeItem(item.no);
                    }
                }>
                    삭제
                </button>
            </p>
        </li>
    );
}

function InputItem({appendItem}) {
    // input의 value로 사용 할 경우 초기값 필수
    const [newWork, setNewWork] = useState("");
    return (
        <div>
            할일 : 
            <input 
                type="text" 
                value={newWork} 
                onChange={(e)=> {
                    setNewWork(e.target.value);
                }}
            />
            <button 
                onClick={(e)=> {
                    appendItem(newWork);
                }
            }>
                추가
            </button>
        </div>
    );
}

// Redux를 이용하면 해결된다
function TodoList({todoList, removeItem, checkItem}) {
    return (
        <div>
            <ul>
                {todoList.map((item, idx)=> {
                    return <ItemRow key={item.no} item={item} removeItem={removeItem} checkItem={checkItem}/>;
                })}
            </ul>
        </div>
    );
}

function App() {
    // 과제 1: 취소선 기능 추가
    // 과제 2 : todoList 데이터를 LocalStorage에 저장.
    const [todoList, setTodoList] = useState([
        {no: 1, title: "점심 먹기", done: false},
        {no: 2, title: "산책 하기", done: false},
        {no: 3, title: "배운 것 복습하기", done: false},
        {no: 4, title: "내일 수업 예습하기", done: false}
    ]);
    const [noCount, setNoCount] = useState(5);

    function appendItem(newItem) {
        console.log(noCount);
        setTodoList([...todoList, {no: noCount, title: newItem, done: false}]);
        setNoCount(noCount + 1);
        localStorage.setItem("todoList", JSON.stringify([...todoList, {no: noCount, title: newItem, done: false}]));
    }

    function removeItem(no) {
        const newList = todoList.filter((item, idx)=> {
            console.log("item.no: ", item.no, "no: ", no);
            return item.no !== no;
        });
        setTodoList(newList);
        localStorage.setItem("todoList", JSON.stringify(newList));
    }

    function checkItem(done, no) {
        const newList = todoList.map((item, idx)=> {
            if(item.no === no) {
                return {...item, done: item.done ? false : true};
            }
            return item;
        });
        setTodoList(newList);
        localStorage.setItem("todoList", JSON.stringify(newList));
    }

    return (
        <div>
            <h1>Tdoo List</h1>
            <InputItem appendItem={appendItem} />
            <hr />
            <TodoList todoList={todoList} removeItem={removeItem} checkItem={checkItem}/>
        </div>
    );
}

export default App;