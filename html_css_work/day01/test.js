let title = document.getElementById("title");
let clickBtn = document.getElementById("clickBtn");
clickBtn.onclick = function(event){
    title.innerText = "Good Bye";
    title.style.color = "blue";
    title.style.backgroundColor = "red";
}
