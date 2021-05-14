/*
    @ Doc : johnny-five : http://johnny-five.io/api/

    @ NodeJS 설정
    1. npm init
    2. npm i -s johnny-five
    3. 실행 테스트 코드 입력

    @ Arduino Uno
    1. 'Firmata' 라이브러리 추가
    2. 예제 코드 적용 : 'Firmata -> StandardFirmata'

    @@ 실행 테스트
    1. PC(MacOS || Windows)에 보드를 연결
    2. Terminal > node <FileName>.js

    **** 실행 테스트 코드 ************************
    const { Board, Led } = require("johnny-five");
    const board = new Board();

    board.on("ready", () => {
    const led = new Led(13);
    led.blink(500);
    });

    @ NodeJS(Express) 를 통해 제어하는 Arduino
    * 주의, 보드 로드 후 서버 실행 **************
        var startServer = _ => app.listen(port, () => console.log(port));
        board.on('ready', startServer);
*/

// USB 통신 : Serial
// N : 1 : 1
console.log("START SERVER 🍑");

var express = require('express'),
    path = require('path'),
    cmd = require('node-cmd'),
    mainRouter = require('./routers/main.js'),
    app = express(),
    { Board } = require("johnny-five"),
    board = new Board(),
    port = process.env.PORT || 3000,
    connectListen = _ => {
        if(board.isReady) return console.log(`Connect Sucess ! & NodeJS port - ${port}`);
    },
    startServer = _ => app.listen(port, () => console.log(port));

app.use('/', mainRouter);
app.use("/views", express.static(path.join(__dirname, '/views')));

process.addListener('uncaughtException', _ => { 
    console.log("NodeJS Throw 🤔");
    process.exit();
});
process.on('exit', _ => {
    console.log("exit - Bye! 👨‍💻");
    // var check = cmd.runSync('npm start');
    var check = cmd.runSync('pwd');
    console.log(`pwd : ${check.data}`);
});

board.on('connect', connectListen);
board.on('ready', startServer);