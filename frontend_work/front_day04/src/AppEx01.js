import {useState} from "react";
import Car from "./app_ex01.ex/Car";
import Hello from "./app_ex01.ex/Hello";

// 콤포넌트 선언
// function Car(props) {
//   return (
//     <h2>
//       I am a {props.brand} {props.name}
//     </h2>
//   );
// }

// 구조분해 할당 - 객체나 리스트의 요소를 바로 끄집에 내어서 사용
// function Hello({name, address, changeName}) {
//   return (
//     <h1>
//       Hello {name} in {address}
//       <br />
//       <button onClick={function() {
//         changeName("철수");
//       }}>
//         이름 바꾸기
//       </button>
//     </h1>
//   );
// }


function AppEx01() {
  // state 선언
  const [brand, setBrand] = useState("KIA");
  const [carName, setCarName] = useState("K7");
  const [user, setUser] = useState("길동");

  function _changeName(newName) {
    console.log("changeName() 호출!");
    setUser(newName);
  }

  function assignTest() {
    console.log("assignTest() 호출");
    const target = {a: 1, b: 2};
    const source = {b: 4, c: 5};

    const returnedTarget = Object.assign(target, source);
    console.log(target);
    console.log(returnedTarget);
    console.log((target) === returnedTarget);
  }

  function assignTest2() {
    console.log("assignTest2() 호출");
    const target = {a:1, b:2};
    const source = [
      {b: 4, c: 5},
      {b: 6, c: 7, d: 8},
      {b: 9, c: 10, d: 14, e: 15}
    ];

    Object.assign(target, ...source);
    console.log(target);
  }

  function testSpread() {
    console.log("testSpread() 호출 ...");
    const arr = [{name: "kim"}, {name: "lee"}, {name: "park"}];

    const newArr = [...arr, {name: "kang"}];
    console.log(arr);
    console.log(newArr);
  }


  return (
    <div>
      {/* 콤포넌트 생성 */}
      <Car brand={brand} name={carName}></Car>
      <hr />
      <Hello name={user} address="Seoul" changeName={_changeName}></Hello>
      <hr />
      <button 
        onClick={(event) => {
          assignTest();
        }
      }>
        assign 테스트
      </button>
      <hr />
      <button
        onClick={(evnet)=> {
          assignTest2();
        }
      }>
        assign 테스트 2
      </button>
      <hr />
      <button onClick={testSpread}>spreed 테스트</button>
    </div>
  );
}

export default AppEx01;