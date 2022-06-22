// #2 SOCKETIO
import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));

console.log(__dirname+ "/public/views");

app.get("/", (req, res) => {res.render("home");});
app.get("/*", (req, res) => {res.redirect("/");});

const handleListen = () => {console.log(`Listening on http://localhost:3000`);}

// express app 객체로 http 서버 만들기
const httpServer = http.createServer(app);
// SocketIO 서버 만들기
const ioServer = SocketIO(httpServer);

ioServer.on("connection", socket => {
    // app.js에서 socket.emit()에 사용한 이벤트명과 똑같이 해주면 해당이벤트를 처리할 수 있다.
    // done = emit에서 바인딩한 마지막 인자 = 콜백 함수.
    socket.on("enterRoom", (roomName, done) => {
        // console.log(msg.payload, id, num);
        socket.join(roomName);
        console.log(socket.rooms);  // {socket.id, roomName} 출력
        done();
    });
    // onAny() : 모든 event에 반응함
    socket.onAny((event) => {
        console.log(`Socket Event : ${event}`);
    });
});


/*
wss.on("connection", (socket) => {
    // console.log(socket);
    console.log("Connected to Browser ✔");

    sockets.push(socket);
    socket["nickname"] = "Anonymous";   
    socket.on("close", () => {
        console.log("Disconnected from Browser ❌");
    });
    socket.on("message", (message) => {
        const msg = JSON.parse(message);    //String -> Object
        switch(msg.type) {
            case "new_msg":
                sockets.forEach(sck => {
                    sck.send(`${socket.nickname} : ${msg.payload}`);
                });
                break; 
            case "nickname":
                socket.nickname = msg.payload;
        }
    });
});
const sockets = [];
*/

httpServer.listen(3000, handleListen);
