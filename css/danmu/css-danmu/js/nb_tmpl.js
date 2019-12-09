/*
 * 这是一个模版js,
 * 1.tmpl('<span><%= name %></span>',{name:'nb'})
 * 2.tmpl('<%for(var i=0;i<students.length;i++){%><span><%=students[i].name%></span><%}%>',{students:[{name:'a'},{name:'b'}]})
 * 3,var t=tmpl('<span></span>');
 * t({name:'ab'})
 * t({name:'def'})
 */
(function(){
  var cache = {};
 
  var htmlEncode=function (html){
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement ("div");
        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
   };
 
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",'htmlEncode',
        "var p=[],_print=function(){for(var i=0;i<arguments.length;i++){p.push(arguments[i])}};print=function(){for(var i=0;i<arguments.length;i++){p.push(htmlEncode(arguments[i]))}};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
//        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/((^|%>)[^\t]*)/g, function($0,$1){return $1.replace(/'/g,'\r')})
          .replace(/\t=(.*?)%>/g, "',htmlEncode($1),'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ,htmlEncode) : function(param){return fn(param,htmlEncode);};
  };
  
})();