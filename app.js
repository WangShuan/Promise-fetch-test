const fetch = require("node-fetch");
const cheerio = require("cheerio");
// 此 list 可放入任意數量的網址
let urls = [
  "https://google.com",
  "https://tw.yahoo.com/",
  "https://zh.javascript.info/promise-api",
  "https://courses.hexschool.com/courses/20201112/lectures/32535169",
  "https://rpg.hexschool.com/training/22/show?embedhm=xaPj6i7gT3S6c73BelV2VQ-pakQ",
];

// fetch 網址
function fetch_url(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        // 抓取各網頁的 title, 確保我們 fetch 到正確的網頁
        const $ = cheerio.load(text);
        let title = $("title").text();
        resolve(`得到了 ${title}`);
      })
      .catch(console.error);
  });
}

// 用 reduce 依序 fetch 網址 (註1)
function oneByone(urls) {
  return urls.reduce(
    (promise, item) =>
      promise
        .then(() =>
          fetch_url(item).then((result) => {
            console.log(result);
          })
        )
        .catch(console.error),
    Promise.resolve()
  );
}

oneByone(urls);

/* 註1
    [url1, url2, url3, url4].reduce(
        (pro, current) => pro.then(() => delayPromise(current)),
        Promise.resolve()
    )

    上方程式效果等同下方程式
    
    Promise.resolve()
    .then(()=>delayPromise(url1))
    .then(()=>delayPromise(url2))
    .then(()=>delayPromise(url3))
    .then(()=>delayPromise(url4))
*/
