var express = require('express');
const app = express();

//콜백함수를 만드는 이유
//비동기로 동작하는 함수들을 동기적으로 동작하게 하고 싶을 때
app.get('/', function (req, res) {
    console.log('111');
    setTimeout(() => {
        console.log('call');
    }, 3000);
    console.log('222');
    res.send('root')
});

function test() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Hello World'), 3000);
    });
}
//기본적인 프로미스와 catch 와 err처리
//TODO:에러출력해보기
app.get('/api', function (req, res) {
    console.log(test());
    test()
        .then(result => console.log(result))
        .catch(function (err) {
            console.log(err);
        })
});

function test2(sign) {
    return new Promise(function (resolve, reject) {
        let data = 100;
        if (sign) {
            resolve(data);
        } else {
            reject('false');
        }
    })
}
//에러처리
app.get('/api2', function (req, res) {
    console.log(test2(true));
    console.log(test2(false));
    test2(false)
        .then(result => console.log(result))
        .catch(function (err) {
            console.log(err);
            console.log('대실패');
        })
});

//여러 프로미스를 연결하기
app.get('/call', function (req, res) {
    console.log(test());
    test()
        .then(result => {
            console.log(result);
            return result + 10;
        })
        .then(result => {
            console.log(result);
        });
});

app.get('/count', function (req, res) {

    const f1 = () => new Promise(res => (
        setTimeout(() => {
          console.log(1);
          // 비동기 함수(setTimeout)의 콜백 함수 안에서
          // resolve 시켜줘야 순서를 보장할 수 있음.
          // 이 res 부분부터 then 안에 구문이 실행된다고 보면 된다.
          res();
        }, 1000)
      ));
      const f2 = () => new Promise(res => (
        setTimeout(() => {
          console.log(2);
          res();
        }, 1000)
      ));
      const f3 = () => new Promise(res => (
        setTimeout(() => {
          console.log(3);
          res();
        }, 1000)
      ));
      const f4 = () => new Promise(res => (
        setTimeout(() => {
          console.log(4);
          res();
        }, 1000)
      ));
      const f5 = () => new Promise(res => (
        setTimeout(() => {
          console.log(5);
          res();
        }, 1000)
      ));
      const f6 = () => new Promise(res => (
        setTimeout(() => {
          console.log(6);
          res();
        }, 1000)
      ));
      const f7 = () => new Promise(res => (
        setTimeout(() => {
          console.log(7);
          res();
        }, 1000)
      ));
      const f8 = () => new Promise(res => (
        setTimeout(() => {
          console.log(8);
          res();
        }, 1000)
      ));
      const f9 = () => new Promise(res => (
        setTimeout(() => {
          console.log(9);
          res();
        }, 1000)
      ));
      // 후속 함수에게 Promise를 리턴해주므로 thenable해서 계속 체이닝이 가능.
      f1()       // 1
      .then(f2)  // 2
      .then(f3)  // 3
      .then(f4)  // 4
      .then(f5)  // 5
      .then(f6)  // 6
      .then(f7)  // 7
      .then(f8)  // 8
      .then(f9); // 9
});



app.listen(3000, function () {
    console.log('express server has started on port 3000');
});