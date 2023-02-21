$(document).ready(function () {
  var socket;

  socket = io.connect("http://localhost:3000");
  socket.on("connect", function () {
    console.log("socket server에 연결 됨.");
  
    socket.on("send message", function (data) {
      console.log(data);
      let newLine =
        $("div#messageView").html() + data.sender + ": " + data.msg + "<br/>";
      $("div#messageView").html(newLine);
    });
  });
  
  $("#sendBtn").click(function (e) {
    console.log("전송버튼");
    if (socket) {
      let sendData = {
        sender: $("#userId").val(),
        msg: $("#sendMsg").val(),
      };
      socket.emit("send", sendData);
    }
  });
});