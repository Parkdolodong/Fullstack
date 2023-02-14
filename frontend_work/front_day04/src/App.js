import React, { useEffect, useState } from "react";
import "./App.css";

function ItemRow({ item, removeItem, updateItem }) {
  const [mode, setMode] = useState(false);
  const [title, setTitle] = useState(item.title);
  return (
    <ul className="list-group mb-0">
      <li className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
        <div className="d-flex align-items-center">
          <input
            checked={item.done ? "checked" : ""}
            type="checkbox"
            className="form-check-input me-2"
            onChange={(e) => {
              item.done = e.target.checked;
              updateItem(item);
            }}
          />
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className={item.done ? "done" : "not-done"}
            type="text"
            disabled={mode ? "" : "disabled"}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                item.title = title;
                updateItem(item);
                setMode(!mode);
              }
            }}
          />
        </div>
        <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
          <i className="fas fa-times text-primary"></i>
        </a>
        <div>
          <button
            onClick={(e) => {
              removeItem(item.no);
            }}
            type="submit"
            className="btn btn-primary btn-lg ms-2"
            style={{
              backgroundColor: "red",
              border: "none",
            }}
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              setMode(!mode);
              if (mode) {
                item.title = title;
                updateItem(item);
              }
            }}
            type="submit"
            className="btn btn-primary btn-lg ms-2"
          >
            {mode ? "change finish" : "change"}
          </button>
        </div>
      </li>
    </ul>
  );
}

function InputItem({ appendItem }) {
  // input의 value로 사용 할 경우 초기값 필수.
  const [newWork, setNewWork] = useState("");
  return (
    <div>
      <form className="d-flex justify-content-center align-items-center mb-4">
        <div className="form-outline flex-fill">
          <input
            type="text"
            value={newWork}
            onChange={(e) => {
              setNewWork(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                appendItem(newWork);
                setNewWork("");
              }
            }}
            id="form3"
            className="form-control form-control-lg"
          />
          <label className="form-label" htmlFor="form3">
            What do you need to do today?
          </label>
        </div>
        <button
          onClick={(e) => {
            appendItem(newWork);
            setNewWork("");
          }}
          type="submit"
          className="btn btn-primary btn-lg ms-2"
        >
          Add
        </button>
      </form>
    </div>
  );
}

// Redux를 이용하면 해결된다.
function TodoList({ todoList, removeItem, updateItem }) {
  return (
    <div>
      <ol>
        {todoList.map((item, idx) => {
          return (
            <ItemRow
              key={item.no}
              item={item}
              removeItem={removeItem}
              updateItem={updateItem}
            />
          );
        })}
      </ol>
    </div>
  );
}

function App(props) {
  const [todoList, setTodoList] = useState([]);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    // LocalStorage에 데이터가 있으면 로드한다.
    // 저장은 문자열로 한다.
    const localStorageData = localStorage.getItem("todoListData");
    if (localStorageData) {
      let objData = JSON.parse(localStorageData);
      setTodoList(objData.todoList);
      setNoCount(objData.noCount);
      console.log(">>>>> data load 완료");
    }
  }, []);

  function saveLocalStorage(newList, noCnt) {
    localStorage.setItem(
      "todoListData",
      JSON.stringify({ todoList: newList, noCount: noCnt })
    );
    console.log(">>>>> localStorage에 저장 완료");
  }

  function appendItem(newItem) {
    let newList = [
      ...todoList,
      { no: noCount + 1, title: newItem, done: false },
    ];
    let noCnt = noCount + 1;
    setTodoList(newList);
    setNoCount(noCnt);
    saveLocalStorage(newList, noCnt);
  }
  function removeItem(no) {
    var newList = todoList.filter((item, idx) => {
      return item.no !== no;
    });
    setTodoList(newList);
    saveLocalStorage(newList, noCount);
  }

  function updateItem(item) {
    //console.dir("updateItem: " + JSON.stringify(item)) ;
    const idx = todoList.findIndex((todo, idx) => {
      return todo.no === item.no;
    });
    todoList[idx] = item;
    console.log(item);
    const newList = [...todoList];
    setTodoList(newList);
    saveLocalStorage(newList, noCount);
  }

  return (
    <>
      <h6 className="mb-3">Todo List</h6>
      <InputItem appendItem={appendItem} />
      <TodoList
        todoList={todoList}
        removeItem={removeItem}
        updateItem={updateItem}
      />
    </>
  );
}
export default App;
