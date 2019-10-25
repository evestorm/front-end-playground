// _.join(['a', 'b', 'c', '-']);

// --------------------

// import _ from 'lodash';
// _.join(['a', 'b', 'c', '-']);

// --------------------

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }).catch(error => 'An error occurred while loading the component');
}

window.onload = function () {
  document.body.innerHTML = '点击页面显示文字';
}


// 按需加载，当点击了页面，才会引入lodash，也是单页应用路由懒加载的实现原理
window.addEventListener('click', function () {
  getComponent().then(component => {
    document.body.appendChild(component);
  })
});