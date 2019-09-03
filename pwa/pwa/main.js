let content = document.getElementById("content");

let xhr = new XMLHttpRequest();
let str = ``;
xhr.open("get", "/api/img", true);
xhr.responseType = "json";

xhr.onload = function() {
  let arr = xhr.response;
  arr.forEach(item => {
    str += `<li><img src="${item}"/></li>`;
  });
  content.innerHTML = str;
};
xhr.send();
