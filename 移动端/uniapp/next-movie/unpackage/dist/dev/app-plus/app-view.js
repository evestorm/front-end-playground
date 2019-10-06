var __pageFrameStartTime__ = Date.now();
var __webviewId__;
var __wxAppCode__ = {};
var __WXML_GLOBAL__ = {
  entrys: {},
  defines: {},
  modules: {},
  ops: [],
  wxs_nf_init: undefined,
  total_ops: 0
};
var $gwx;

/*v0.5vv_20190312_syb_scopedata*/window.__wcc_version__='v0.5vv_20190312_syb_scopedata';window.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _gv( )
{if( typeof( window.__webview_engine_version__) == 'undefined' ) return 0.0;
return window.__webview_engine_version__;}
function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'movie-score-wrapper data-v-5258798a'])
Z([3,'__i0__'])
Z([3,'yellow'])
Z([[7],[3,'yellowScore']])
Z([3,'star-ico data-v-5258798a'])
Z([3,'/static/icos/star-yellow.png'])
Z([3,'__i1__'])
Z([3,'gray'])
Z([[7],[3,'grayScore']])
Z(z[4])
Z([3,'/static/icos/star-gray.png'])
Z([[2,'==='],[[7],[3,'showNum']],[1,1]])
Z([3,'movie-score data-v-5258798a'])
Z([a,[[2,'+'],[[2,'+'],[1,''],[[7],[3,'innerScore']]],[1,'']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'black'])
Z([3,'__e'])
Z([3,'cover'])
Z([[4],[[5],[[4],[[5],[[5],[1,'longpress']],[[4],[[5],[[4],[[5],[[5],[1,'longPress']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'widthFix'])
Z([[7],[3,'cover']])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-205d6604'])
Z([1,true])
Z([3,'carousel data-v-205d6604'])
Z([1,1000])
Z(z[1])
Z([1,3000])
Z([3,'__i0__'])
Z([3,'item'])
Z([[7],[3,'carouselList']])
Z([3,'movieId'])
Z([3,'data-v-205d6604'])
Z([3,'swiper-item-image data-v-205d6604'])
Z([[6],[[7],[3,'item']],[3,'image']])
Z([3,'super-hot page-block data-v-205d6604'])
Z([3,'hot-title-wrapper data-v-205d6604'])
Z([3,'hot-ico data-v-205d6604'])
Z([3,'../../static/icos/hot.png'])
Z([3,'hot-title data-v-205d6604'])
Z([3,'热门超英'])
Z([3,'page-block hot data-v-205d6604'])
Z([3,'true'])
Z([3,'__i1__'])
Z(z[7])
Z([[7],[3,'hotSuperheroList']])
Z([3,'id'])
Z([3,'single-poster data-v-205d6604'])
Z([3,'poster-wrapper data-v-205d6604'])
Z([3,'poster data-v-205d6604'])
Z([[6],[[7],[3,'item']],[3,'cover']])
Z([3,'movie-name data-v-205d6604'])
Z([a,[[2,'+'],[[2,'+'],[1,''],[[6],[[7],[3,'item']],[3,'name']]],[1,'']]])
Z([3,'__l'])
Z(z[10])
Z([[6],[[7],[3,'item']],[3,'score']])
Z([1,1])
Z([[2,'+'],[1,'1-'],[[7],[3,'__i1__']]])
Z(z[13])
Z(z[14])
Z(z[15])
Z([3,'../../static/icos/interest.png'])
Z(z[17])
Z([3,'热门预告'])
Z([3,'hot-movies page-block data-v-205d6604'])
Z([3,'__i2__'])
Z(z[7])
Z([[7],[3,'hotTrailerList']])
Z(z[24])
Z([3,'__e'])
Z([3,'hot-movie-single data-v-205d6604'])
Z([[4],[[5],[[4],[[5],[[5],[1,'play']],[[4],[[5],[[4],[[5],[[5],[1,'meIsPlaying']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[6],[[7],[3,'item']],[3,'id']])
Z(z[50])
Z([[6],[[7],[3,'item']],[3,'poster']])
Z([[6],[[7],[3,'item']],[3,'trailer']])
Z(z[13])
Z(z[14])
Z(z[15])
Z([3,'../../static/icos/guess-u-like.png'])
Z(z[17])
Z([3,'猜你喜欢'])
Z([3,'guess-u-like page-block data-v-205d6604'])
Z([3,'gIndex'])
Z(z[7])
Z([[7],[3,'guessULikeList']])
Z(z[24])
Z([3,'single-like-movie data-v-205d6604'])
Z([3,'movie-poster data-v-205d6604'])
Z(z[28])
Z([3,'movie-desc data-v-205d6604'])
Z([3,'movie-title data-v-205d6604'])
Z([a,[[6],[[7],[3,'item']],[3,'name']]])
Z(z[31])
Z(z[10])
Z(z[33])
Z([1,0])
Z([[2,'+'],[1,'2-'],[[7],[3,'gIndex']]])
Z([3,'movie-info data-v-205d6604'])
Z([a,[[6],[[7],[3,'item']],[3,'basicInfo']]])
Z(z[76])
Z([a,[[6],[[7],[3,'item']],[3,'releaseDate']]])
Z(z[47])
Z([3,'movie-oper data-v-205d6604'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'praiseMe']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'gIndex']])
Z([3,'praise-ico data-v-205d6604'])
Z([3,'../../static/icos/praise.png'])
Z([3,'praise-me data-v-205d6604'])
Z([3,'点赞'])
Z([[6],[[7],[3,'animationDataList']],[[7],[3,'gIndex']]])
Z([3,'praise-me animation-opacity data-v-205d6604'])
Z([3,'+1'])
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page page-fill data-v-cc342e50'])
Z([3,'header data-v-cc342e50'])
Z([[7],[3,'userIsLogin']])
Z([3,'data-v-cc342e50'])
Z([3,'face data-v-cc342e50'])
Z([[6],[[7],[3,'userInfo']],[3,'faceImage']])
Z(z[3])
Z(z[4])
Z([3,'/static/icos/108x108.png'])
Z(z[2])
Z([3,'info-wrapper data-v-cc342e50'])
Z([3,'nickname data-v-cc342e50'])
Z([a,[[6],[[7],[3,'userInfo']],[3,'nickname']]])
Z([3,'nav-info data-v-cc342e50'])
Z([a,[[2,'+'],[1,'ID: '],[[6],[[7],[3,'userInfo']],[3,'id']]]])
Z(z[3])
Z(z[3])
Z([3,'../registLogin/registLogin'])
Z([3,'nickname regist-login data-v-cc342e50'])
Z([3,'注册/登录'])
Z(z[2])
Z([3,'set-wrapper data-v-cc342e50'])
Z([3,'__e'])
Z([3,'settings data-v-cc342e50'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'goToMeInfo']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'/static/icos/settings.png'])
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page page-fill'])
Z([3,'page-block info-list'])
Z([3,'__e'])
Z([3,'item-wapper face-upbottom-top face-line'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'operator']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'info-words'])
Z([3,'头像'])
Z([3,'right-wapper'])
Z([3,'face'])
Z([[6],[[7],[3,'globalUser']],[3,'faceImage']])
Z([3,'arrow-block'])
Z([3,'arrow-ico'])
Z([3,'/static/icos/left-gray-arrow.png'])
Z(z[2])
Z([3,'item-wapper face-upbottom face-line'])
Z(z[4])
Z(z[5])
Z([3,'昵称'])
Z(z[7])
Z([3,'gray-fields'])
Z([a,[[6],[[7],[3,'globalUser']],[3,'nickname']]])
Z(z[10])
Z(z[11])
Z(z[12])
Z(z[2])
Z(z[14])
Z(z[4])
Z(z[5])
Z([3,'生日'])
Z(z[7])
Z(z[19])
Z([a,[[6],[[7],[3,'globalUser']],[3,'birthday']]])
Z(z[10])
Z(z[11])
Z(z[12])
Z(z[2])
Z([3,'item-wapper face-upbottom'])
Z(z[4])
Z(z[5])
Z([3,'性别'])
Z(z[7])
Z(z[19])
Z([[2,'=='],[[6],[[7],[3,'globalUser']],[3,'sex']],[1,1]])
Z([3,'男'])
Z([[2,'=='],[[6],[[7],[3,'globalUser']],[3,'sex']],[1,0]])
Z([3,'女'])
Z([3,'请选择'])
Z(z[10])
Z(z[11])
Z(z[12])
Z([3,'foot-wapper'])
Z(z[2])
Z([3,'footer-words'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'clearCache']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'清理缓存'])
Z(z[2])
Z(z[52])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'logout']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'margin-top:4px;'])
Z([3,'退出登录'])
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page page-fill'])
Z([3,'pending-wapper'])
Z([3,'pending-face'])
Z([3,'face'])
Z([3,'scaleToFill'])
Z([[7],[3,'tempFace']])
Z([3,'notice'])
Z([3,'notice-words'])
Z([3,'* 请从相册中选择等比宽高的图片噢～'])
Z([3,'footer-opertor'])
Z([3,'__e'])
Z([3,'opertor-words'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'changePedingFace']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'重新上传'])
Z(z[10])
Z(z[11])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'uploadFace']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'确定上传'])
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-f1e9858c'])
Z([3,'player data-v-f1e9858c'])
Z([3,'movie data-v-f1e9858c'])
Z([3,'myTrailer'])
Z([[6],[[7],[3,'trailerInfo']],[3,'poster']])
Z([[6],[[7],[3,'trailerInfo']],[3,'trailer']])
Z([3,'movie-info data-v-f1e9858c'])
Z([3,'data-v-f1e9858c'])
Z([[2,'+'],[1,'../cover/cover?cover\x3d'],[[6],[[7],[3,'trailerInfo']],[3,'cover']]])
Z([3,'cover data-v-f1e9858c'])
Z([3,'aspectFit'])
Z([[6],[[7],[3,'trailerInfo']],[3,'cover']])
Z([3,'movie-desc data-v-f1e9858c'])
Z([3,'title data-v-f1e9858c'])
Z([a,[[6],[[7],[3,'trailerInfo']],[3,'name']]])
Z([3,'basic-info data-v-f1e9858c'])
Z([a,[[6],[[7],[3,'trailerInfo']],[3,'basicInfo']]])
Z(z[15])
Z([a,[[6],[[7],[3,'trailerInfo']],[3,'originalName']]])
Z(z[15])
Z([a,[[6],[[7],[3,'trailerInfo']],[3,'totalTime']]])
Z(z[15])
Z([a,[[6],[[7],[3,'trailerInfo']],[3,'releaseDate']]])
Z([3,'score-block data-v-f1e9858c'])
Z([3,'big-score data-v-f1e9858c'])
Z([3,'score-words data-v-f1e9858c'])
Z([3,'综合评分'])
Z([3,'movie-score data-v-f1e9858c'])
Z([a,[[6],[[7],[3,'trailerInfo']],[3,'score']]])
Z([3,'score-stars data-v-f1e9858c'])
Z([[2,'>'],[[6],[[7],[3,'trailerInfo']],[3,'score']],[1,0]])
Z(z[7])
Z([3,'__l'])
Z(z[7])
Z([[6],[[7],[3,'trailerInfo']],[3,'score']])
Z([3,'0'])
Z([3,'1'])
Z([3,'prise-counts data-v-f1e9858c'])
Z([a,[[2,'+'],[[6],[[7],[3,'trailerInfo']],[3,'prisedCounts']],[1,' 人点赞']]])
Z([3,'line-wrapper data-v-f1e9858c'])
Z([3,'line data-v-f1e9858c'])
Z([3,'plots-block data-v-f1e9858c'])
Z([3,'plots-title data-v-f1e9858c'])
Z([3,'剧情介绍'])
Z([3,'plots-desc data-v-f1e9858c'])
Z([a,[[6],[[7],[3,'trailerInfo']],[3,'plotDesc']]])
Z([3,'scroll-block data-v-f1e9858c'])
Z(z[42])
Z([3,'演职人员'])
Z([3,'scroll-list data-v-f1e9858c'])
Z([3,'staffIndex'])
Z([3,'director'])
Z([[7],[3,'directorArray']])
Z([3,'staffId'])
Z([3,'actor-wrapper data-v-f1e9858c'])
Z([3,'__e'])
Z([3,'single-actor data-v-f1e9858c'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'lookStaffs']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'staffIndex']])
Z(z[10])
Z([[6],[[7],[3,'director']],[3,'photo']])
Z([3,'actor-name data-v-f1e9858c'])
Z([a,[[6],[[7],[3,'director']],[3,'name']]])
Z([3,'actor-role data-v-f1e9858c'])
Z([a,[[6],[[7],[3,'director']],[3,'actName']]])
Z([3,'actorIndex'])
Z([3,'actor'])
Z([[7],[3,'actorArray']])
Z(z[53])
Z(z[54])
Z(z[55])
Z(z[56])
Z(z[57])
Z([[2,'+'],[[7],[3,'actorIndex']],[[6],[[7],[3,'directorArray']],[3,'length']]])
Z(z[10])
Z([[6],[[7],[3,'actor']],[3,'photo']])
Z(z[61])
Z([a,[[6],[[7],[3,'actor']],[3,'name']]])
Z(z[63])
Z([a,[[6],[[7],[3,'actor']],[3,'actName']]])
Z(z[46])
Z(z[42])
Z([3,'剧照'])
Z(z[49])
Z([3,'imgIndex'])
Z([3,'img'])
Z([[7],[3,'plotPicsArray']])
Z(z[84])
Z(z[55])
Z([3,'plot-image data-v-f1e9858c'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'lookMe']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'imgIndex']])
Z([3,'aspectFill'])
Z([[7],[3,'img']])
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'body data-v-5e26d440'])
Z([3,'__e'])
Z([3,'data-v-5e26d440'])
Z([[4],[[5],[[4],[[5],[[5],[1,'submit']],[[4],[[5],[[4],[[5],[[5],[1,'formSubmit']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'face-wapper data-v-5e26d440'])
Z([3,'face data-v-5e26d440'])
Z([3,'../../static/icos/default-face.png'])
Z([3,'info-wapper data-v-5e26d440'])
Z([3,'words-lbl data-v-5e26d440'])
Z([3,'账号'])
Z([3,'input data-v-5e26d440'])
Z([3,'username'])
Z([3,'请输入用户名'])
Z([3,'graywords'])
Z([3,'text'])
Z([3,''])
Z(z[7])
Z(z[8])
Z([3,'密码'])
Z(z[10])
Z([3,'password'])
Z([3,'true'])
Z([3,'请输入密码'])
Z(z[13])
Z(z[14])
Z(z[15])
Z([3,'loginbutton data-v-5e26d440'])
Z([3,'submit'])
Z([3,'primary'])
Z([3,'注册登录'])
Z([3,'third-wapper data-v-5e26d440'])
Z([3,'third-line data-v-5e26d440'])
Z([3,'single-line data-v-5e26d440'])
Z([3,'line data-v-5e26d440'])
Z([3,'third-words data-v-5e26d440'])
Z([3,'第三方账号登录'])
Z(z[32])
Z(z[33])
Z([3,'third-icons-wapper data-v-5e26d440'])
Z(z[1])
Z([3,'third-icon data-v-5e26d440'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'appOAuthLogin']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'weixin'])
Z([3,'/static/icos/weixin.png'])
Z(z[1])
Z(z[40])
Z(z[41])
Z([3,'qq'])
Z([3,'/static/icos/QQ.png'])
Z(z[1])
Z(z[40])
Z(z[41])
Z([3,'sinaweibo'])
Z([3,'/static/icos/weibo.png'])
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
function gz$gwx_9(){
if( __WXML_GLOBAL__.ops_cached.$gwx_9)return __WXML_GLOBAL__.ops_cached.$gwx_9
__WXML_GLOBAL__.ops_cached.$gwx_9=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'page data-v-2437d258'])
Z([3,'search-block data-v-2437d258'])
Z([3,'search-ico-wrapper data-v-2437d258'])
Z([3,'search-ico data-v-2437d258'])
Z([3,'../../static/icos/search.png'])
Z([3,'__e'])
Z([3,'search-text data-v-2437d258'])
Z([3,'search'])
Z([[4],[[5],[[4],[[5],[[5],[1,'confirm']],[[4],[[5],[[4],[[5],[[5],[1,'searchMovie']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'10'])
Z([3,'搜索预告'])
Z([3,'movie-list page-block data-v-2437d258'])
Z([3,'__i0__'])
Z([3,'item'])
Z([[7],[3,'trailerList']])
Z([3,'id'])
Z([3,'movie-wrapper data-v-2437d258'])
Z(z[5])
Z([3,'poster data-v-2437d258'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'showTrailer']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[6],[[7],[3,'item']],[3,'id']])
Z([[6],[[7],[3,'item']],[3,'cover']])
})(__WXML_GLOBAL__.ops_cached.$gwx_9);return __WXML_GLOBAL__.ops_cached.$gwx_9
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./components/trailerStars.wxml','./pages/cover/cover.wxml','./pages/index/index.wxml','./pages/me/me.wxml','./pages/meInfo/meInfo.wxml','./pages/meface/meface.wxml','./pages/movie/movie.wxml','./pages/registLogin/registLogin.wxml','./pages/search/search.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
var oB=_n('view')
_rz(z,oB,'class',0,e,s,gg)
var oD=_v()
_(oB,oD)
var fE=function(hG,cF,oH,gg){
var oJ=_mz(z,'image',['mode',-1,'class',4,'src',1],[],hG,cF,gg)
_(oH,oJ)
return oH
}
oD.wxXCkey=2
_2z(z,3,fE,e,s,gg,oD,'yellow','__i0__','')
var lK=_v()
_(oB,lK)
var aL=function(eN,tM,bO,gg){
var xQ=_mz(z,'image',['mode',-1,'class',9,'src',1],[],eN,tM,gg)
_(bO,xQ)
return bO
}
lK.wxXCkey=2
_2z(z,8,aL,e,s,gg,lK,'gray','__i1__','')
var xC=_v()
_(oB,xC)
if(_oz(z,11,e,s,gg)){xC.wxVkey=1
var oR=_n('view')
_rz(z,oR,'class',12,e,s,gg)
var fS=_oz(z,13,e,s,gg)
_(oR,fS)
_(xC,oR)
}
xC.wxXCkey=1
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
var hU=_n('view')
_rz(z,hU,'class',0,e,s,gg)
var oV=_mz(z,'image',['bindlongpress',1,'class',1,'data-event-opts',2,'mode',3,'src',4],[],e,s,gg)
_(hU,oV)
_(r,hU)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
var oX=_n('view')
_rz(z,oX,'class',0,e,s,gg)
var lY=_mz(z,'swiper',['autoplay',1,'class',1,'duration',2,'indicatorDots',3,'interval',4],[],e,s,gg)
var aZ=_v()
_(lY,aZ)
var t1=function(b3,e2,o4,gg){
var o6=_n('swiper-item')
_rz(z,o6,'class',10,b3,e2,gg)
var f7=_mz(z,'image',['class',11,'src',1],[],b3,e2,gg)
_(o6,f7)
_(o4,o6)
return o4
}
aZ.wxXCkey=2
_2z(z,8,t1,e,s,gg,aZ,'item','__i0__','movieId')
_(oX,lY)
var c8=_n('view')
_rz(z,c8,'class',13,e,s,gg)
var h9=_n('view')
_rz(z,h9,'class',14,e,s,gg)
var o0=_mz(z,'image',['mode',-1,'class',15,'src',1],[],e,s,gg)
_(h9,o0)
var cAB=_n('view')
_rz(z,cAB,'class',17,e,s,gg)
var oBB=_oz(z,18,e,s,gg)
_(cAB,oBB)
_(h9,cAB)
_(c8,h9)
_(oX,c8)
var lCB=_mz(z,'scroll-view',['class',19,'scrollX',1],[],e,s,gg)
var aDB=_v()
_(lCB,aDB)
var tEB=function(bGB,eFB,oHB,gg){
var oJB=_n('view')
_rz(z,oJB,'class',25,bGB,eFB,gg)
var fKB=_n('view')
_rz(z,fKB,'class',26,bGB,eFB,gg)
var cLB=_mz(z,'image',['mode',-1,'class',27,'src',1],[],bGB,eFB,gg)
_(fKB,cLB)
var hMB=_n('view')
_rz(z,hMB,'class',29,bGB,eFB,gg)
var oNB=_oz(z,30,bGB,eFB,gg)
_(hMB,oNB)
_(fKB,hMB)
var cOB=_mz(z,'trailer-stars',['bind:__l',31,'class',1,'innerScore',2,'showNum',3,'vueId',4],[],bGB,eFB,gg)
_(fKB,cOB)
_(oJB,fKB)
_(oHB,oJB)
return oHB
}
aDB.wxXCkey=4
_2z(z,23,tEB,e,s,gg,aDB,'item','__i1__','id')
_(oX,lCB)
var oPB=_n('view')
_rz(z,oPB,'class',36,e,s,gg)
var lQB=_n('view')
_rz(z,lQB,'class',37,e,s,gg)
var aRB=_mz(z,'image',['mode',-1,'class',38,'src',1],[],e,s,gg)
_(lQB,aRB)
var tSB=_n('view')
_rz(z,tSB,'class',40,e,s,gg)
var eTB=_oz(z,41,e,s,gg)
_(tSB,eTB)
_(lQB,tSB)
_(oPB,lQB)
_(oX,oPB)
var bUB=_n('view')
_rz(z,bUB,'class',42,e,s,gg)
var oVB=_v()
_(bUB,oVB)
var xWB=function(fYB,oXB,cZB,gg){
var o2B=_mz(z,'video',['controls',-1,'bindplay',47,'class',1,'data-event-opts',2,'data-playingIndex',3,'id',4,'poster',5,'src',6],[],fYB,oXB,gg)
_(cZB,o2B)
return cZB
}
oVB.wxXCkey=2
_2z(z,45,xWB,e,s,gg,oVB,'item','__i2__','id')
_(oX,bUB)
var c3B=_n('view')
_rz(z,c3B,'class',54,e,s,gg)
var o4B=_n('view')
_rz(z,o4B,'class',55,e,s,gg)
var l5B=_mz(z,'image',['mode',-1,'class',56,'src',1],[],e,s,gg)
_(o4B,l5B)
var a6B=_n('view')
_rz(z,a6B,'class',58,e,s,gg)
var t7B=_oz(z,59,e,s,gg)
_(a6B,t7B)
_(o4B,a6B)
_(c3B,o4B)
_(oX,c3B)
var e8B=_n('view')
_rz(z,e8B,'class',60,e,s,gg)
var b9B=_v()
_(e8B,b9B)
var o0B=function(oBC,xAC,fCC,gg){
var hEC=_n('view')
_rz(z,hEC,'class',65,oBC,xAC,gg)
var oFC=_mz(z,'image',['mode',-1,'class',66,'src',1],[],oBC,xAC,gg)
_(hEC,oFC)
var cGC=_n('view')
_rz(z,cGC,'class',68,oBC,xAC,gg)
var oHC=_n('view')
_rz(z,oHC,'class',69,oBC,xAC,gg)
var lIC=_oz(z,70,oBC,xAC,gg)
_(oHC,lIC)
_(cGC,oHC)
var aJC=_mz(z,'trailer-stars',['bind:__l',71,'class',1,'innerScore',2,'showNum',3,'vueId',4],[],oBC,xAC,gg)
_(cGC,aJC)
var tKC=_n('view')
_rz(z,tKC,'class',76,oBC,xAC,gg)
var eLC=_oz(z,77,oBC,xAC,gg)
_(tKC,eLC)
_(cGC,tKC)
var bMC=_n('view')
_rz(z,bMC,'class',78,oBC,xAC,gg)
var oNC=_oz(z,79,oBC,xAC,gg)
_(bMC,oNC)
_(cGC,bMC)
_(hEC,cGC)
var xOC=_mz(z,'view',['bindtap',80,'class',1,'data-event-opts',2,'data-gIndex',3],[],oBC,xAC,gg)
var oPC=_mz(z,'image',['mode',-1,'class',84,'src',1],[],oBC,xAC,gg)
_(xOC,oPC)
var fQC=_n('view')
_rz(z,fQC,'class',86,oBC,xAC,gg)
var cRC=_oz(z,87,oBC,xAC,gg)
_(fQC,cRC)
_(xOC,fQC)
var hSC=_mz(z,'view',['animation',88,'class',1],[],oBC,xAC,gg)
var oTC=_oz(z,90,oBC,xAC,gg)
_(hSC,oTC)
_(xOC,hSC)
_(hEC,xOC)
_(fCC,hEC)
return fCC
}
b9B.wxXCkey=4
_2z(z,63,o0B,e,s,gg,b9B,'item','gIndex','id')
_(oX,e8B)
_(r,oX)
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
var oVC=_n('view')
_rz(z,oVC,'class',0,e,s,gg)
var lWC=_n('view')
_rz(z,lWC,'class',1,e,s,gg)
var aXC=_v()
_(lWC,aXC)
if(_oz(z,2,e,s,gg)){aXC.wxVkey=1
var b1C=_n('view')
_rz(z,b1C,'class',3,e,s,gg)
var o2C=_mz(z,'image',['class',4,'src',1],[],e,s,gg)
_(b1C,o2C)
_(aXC,b1C)
}
else{aXC.wxVkey=2
var x3C=_n('view')
_rz(z,x3C,'class',6,e,s,gg)
var o4C=_mz(z,'image',['class',7,'src',1],[],e,s,gg)
_(x3C,o4C)
_(aXC,x3C)
}
var tYC=_v()
_(lWC,tYC)
if(_oz(z,9,e,s,gg)){tYC.wxVkey=1
var f5C=_n('view')
_rz(z,f5C,'class',10,e,s,gg)
var c6C=_n('view')
_rz(z,c6C,'class',11,e,s,gg)
var h7C=_oz(z,12,e,s,gg)
_(c6C,h7C)
_(f5C,c6C)
var o8C=_n('view')
_rz(z,o8C,'class',13,e,s,gg)
var c9C=_oz(z,14,e,s,gg)
_(o8C,c9C)
_(f5C,o8C)
_(tYC,f5C)
}
else{tYC.wxVkey=2
var o0C=_n('view')
_rz(z,o0C,'class',15,e,s,gg)
var lAD=_mz(z,'navigator',['class',16,'url',1],[],e,s,gg)
var aBD=_n('view')
_rz(z,aBD,'class',18,e,s,gg)
var tCD=_oz(z,19,e,s,gg)
_(aBD,tCD)
_(lAD,aBD)
_(o0C,lAD)
_(tYC,o0C)
}
var eZC=_v()
_(lWC,eZC)
if(_oz(z,20,e,s,gg)){eZC.wxVkey=1
var eDD=_n('view')
_rz(z,eDD,'class',21,e,s,gg)
var bED=_mz(z,'image',['bindtap',22,'class',1,'data-event-opts',2,'src',3],[],e,s,gg)
_(eDD,bED)
_(eZC,eDD)
}
aXC.wxXCkey=1
tYC.wxXCkey=1
eZC.wxXCkey=1
_(oVC,lWC)
_(r,oVC)
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
var xGD=_n('view')
_rz(z,xGD,'class',0,e,s,gg)
var oHD=_n('view')
_rz(z,oHD,'class',1,e,s,gg)
var fID=_mz(z,'view',['bindtap',2,'class',1,'data-event-opts',2],[],e,s,gg)
var cJD=_n('view')
_rz(z,cJD,'class',5,e,s,gg)
var hKD=_oz(z,6,e,s,gg)
_(cJD,hKD)
_(fID,cJD)
var oLD=_n('view')
_rz(z,oLD,'class',7,e,s,gg)
var cMD=_mz(z,'image',['class',8,'src',1],[],e,s,gg)
_(oLD,cMD)
var oND=_n('view')
_rz(z,oND,'class',10,e,s,gg)
var lOD=_mz(z,'image',['class',11,'src',1],[],e,s,gg)
_(oND,lOD)
_(oLD,oND)
_(fID,oLD)
_(oHD,fID)
var aPD=_mz(z,'view',['bindtap',13,'class',1,'data-event-opts',2],[],e,s,gg)
var tQD=_n('view')
_rz(z,tQD,'class',16,e,s,gg)
var eRD=_oz(z,17,e,s,gg)
_(tQD,eRD)
_(aPD,tQD)
var bSD=_n('view')
_rz(z,bSD,'class',18,e,s,gg)
var oTD=_n('view')
_rz(z,oTD,'class',19,e,s,gg)
var xUD=_oz(z,20,e,s,gg)
_(oTD,xUD)
_(bSD,oTD)
var oVD=_n('view')
_rz(z,oVD,'class',21,e,s,gg)
var fWD=_mz(z,'image',['class',22,'src',1],[],e,s,gg)
_(oVD,fWD)
_(bSD,oVD)
_(aPD,bSD)
_(oHD,aPD)
var cXD=_mz(z,'view',['bindtap',24,'class',1,'data-event-opts',2],[],e,s,gg)
var hYD=_n('view')
_rz(z,hYD,'class',27,e,s,gg)
var oZD=_oz(z,28,e,s,gg)
_(hYD,oZD)
_(cXD,hYD)
var c1D=_n('view')
_rz(z,c1D,'class',29,e,s,gg)
var o2D=_n('view')
_rz(z,o2D,'class',30,e,s,gg)
var l3D=_oz(z,31,e,s,gg)
_(o2D,l3D)
_(c1D,o2D)
var a4D=_n('view')
_rz(z,a4D,'class',32,e,s,gg)
var t5D=_mz(z,'image',['class',33,'src',1],[],e,s,gg)
_(a4D,t5D)
_(c1D,a4D)
_(cXD,c1D)
_(oHD,cXD)
var e6D=_mz(z,'view',['bindtap',35,'class',1,'data-event-opts',2],[],e,s,gg)
var b7D=_n('view')
_rz(z,b7D,'class',38,e,s,gg)
var o8D=_oz(z,39,e,s,gg)
_(b7D,o8D)
_(e6D,b7D)
var x9D=_n('view')
_rz(z,x9D,'class',40,e,s,gg)
var o0D=_n('view')
_rz(z,o0D,'class',41,e,s,gg)
var fAE=_v()
_(o0D,fAE)
if(_oz(z,42,e,s,gg)){fAE.wxVkey=1
var cBE=_n('view')
var hCE=_oz(z,43,e,s,gg)
_(cBE,hCE)
_(fAE,cBE)
}
else{fAE.wxVkey=2
var oDE=_v()
_(fAE,oDE)
if(_oz(z,44,e,s,gg)){oDE.wxVkey=1
var cEE=_n('view')
var oFE=_oz(z,45,e,s,gg)
_(cEE,oFE)
_(oDE,cEE)
}
else{oDE.wxVkey=2
var lGE=_n('view')
var aHE=_oz(z,46,e,s,gg)
_(lGE,aHE)
_(oDE,lGE)
}
oDE.wxXCkey=1
}
fAE.wxXCkey=1
_(x9D,o0D)
var tIE=_n('view')
_rz(z,tIE,'class',47,e,s,gg)
var eJE=_mz(z,'image',['class',48,'src',1],[],e,s,gg)
_(tIE,eJE)
_(x9D,tIE)
_(e6D,x9D)
_(oHD,e6D)
_(xGD,oHD)
var bKE=_n('view')
_rz(z,bKE,'class',50,e,s,gg)
var oLE=_mz(z,'view',['bindtap',51,'class',1,'data-event-opts',2],[],e,s,gg)
var xME=_oz(z,54,e,s,gg)
_(oLE,xME)
_(bKE,oLE)
var oNE=_mz(z,'view',['bindtap',55,'class',1,'data-event-opts',2,'style',3],[],e,s,gg)
var fOE=_oz(z,59,e,s,gg)
_(oNE,fOE)
_(bKE,oNE)
_(xGD,bKE)
_(r,xGD)
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
var hQE=_n('view')
_rz(z,hQE,'class',0,e,s,gg)
var oRE=_n('view')
_rz(z,oRE,'class',1,e,s,gg)
var cSE=_mz(z,'image',['class',2,'id',1,'mode',2,'src',3],[],e,s,gg)
_(oRE,cSE)
_(hQE,oRE)
var oTE=_n('view')
_rz(z,oTE,'class',6,e,s,gg)
var lUE=_n('view')
_rz(z,lUE,'class',7,e,s,gg)
var aVE=_oz(z,8,e,s,gg)
_(lUE,aVE)
_(oTE,lUE)
_(hQE,oTE)
var tWE=_n('view')
_rz(z,tWE,'class',9,e,s,gg)
var eXE=_mz(z,'view',['bindtap',10,'class',1,'data-event-opts',2],[],e,s,gg)
var bYE=_oz(z,13,e,s,gg)
_(eXE,bYE)
_(tWE,eXE)
var oZE=_mz(z,'view',['bindtap',14,'class',1,'data-event-opts',2],[],e,s,gg)
var x1E=_oz(z,17,e,s,gg)
_(oZE,x1E)
_(tWE,oZE)
_(hQE,tWE)
_(r,hQE)
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
var f3E=_n('view')
_rz(z,f3E,'class',0,e,s,gg)
var c4E=_n('view')
_rz(z,c4E,'class',1,e,s,gg)
var h5E=_mz(z,'video',['controls',-1,'class',2,'id',1,'poster',2,'src',3],[],e,s,gg)
_(c4E,h5E)
_(f3E,c4E)
var o6E=_n('view')
_rz(z,o6E,'class',6,e,s,gg)
var c7E=_mz(z,'navigator',['class',7,'url',1],[],e,s,gg)
var o8E=_mz(z,'image',['class',9,'mode',1,'src',2],[],e,s,gg)
_(c7E,o8E)
_(o6E,c7E)
var l9E=_n('view')
_rz(z,l9E,'class',12,e,s,gg)
var a0E=_n('view')
_rz(z,a0E,'class',13,e,s,gg)
var tAF=_oz(z,14,e,s,gg)
_(a0E,tAF)
_(l9E,a0E)
var eBF=_n('view')
_rz(z,eBF,'class',15,e,s,gg)
var bCF=_oz(z,16,e,s,gg)
_(eBF,bCF)
_(l9E,eBF)
var oDF=_n('view')
_rz(z,oDF,'class',17,e,s,gg)
var xEF=_oz(z,18,e,s,gg)
_(oDF,xEF)
_(l9E,oDF)
var oFF=_n('view')
_rz(z,oFF,'class',19,e,s,gg)
var fGF=_oz(z,20,e,s,gg)
_(oFF,fGF)
_(l9E,oFF)
var cHF=_n('view')
_rz(z,cHF,'class',21,e,s,gg)
var hIF=_oz(z,22,e,s,gg)
_(cHF,hIF)
_(l9E,cHF)
var oJF=_n('view')
_rz(z,oJF,'class',23,e,s,gg)
var cKF=_n('view')
_rz(z,cKF,'class',24,e,s,gg)
var oLF=_n('view')
_rz(z,oLF,'class',25,e,s,gg)
var lMF=_oz(z,26,e,s,gg)
_(oLF,lMF)
_(cKF,oLF)
var aNF=_n('view')
_rz(z,aNF,'class',27,e,s,gg)
var tOF=_oz(z,28,e,s,gg)
_(aNF,tOF)
_(cKF,aNF)
_(oJF,cKF)
var ePF=_n('view')
_rz(z,ePF,'class',29,e,s,gg)
var bQF=_v()
_(ePF,bQF)
if(_oz(z,30,e,s,gg)){bQF.wxVkey=1
var oRF=_mz(z,'trailer-stars',['bind:__l',32,'class',1,'innerScore',2,'showNum',3,'vueId',4],[],e,s,gg)
_(bQF,oRF)
}
var xSF=_n('view')
_rz(z,xSF,'class',37,e,s,gg)
var oTF=_oz(z,38,e,s,gg)
_(xSF,oTF)
_(ePF,xSF)
bQF.wxXCkey=1
bQF.wxXCkey=3
_(oJF,ePF)
_(l9E,oJF)
_(o6E,l9E)
_(f3E,o6E)
var fUF=_n('view')
_rz(z,fUF,'class',39,e,s,gg)
var cVF=_n('view')
_rz(z,cVF,'class',40,e,s,gg)
_(fUF,cVF)
_(f3E,fUF)
var hWF=_n('view')
_rz(z,hWF,'class',41,e,s,gg)
var oXF=_n('view')
_rz(z,oXF,'class',42,e,s,gg)
var cYF=_oz(z,43,e,s,gg)
_(oXF,cYF)
_(hWF,oXF)
var oZF=_n('view')
_rz(z,oZF,'class',44,e,s,gg)
var l1F=_oz(z,45,e,s,gg)
_(oZF,l1F)
_(hWF,oZF)
_(f3E,hWF)
var a2F=_n('view')
_rz(z,a2F,'class',46,e,s,gg)
var t3F=_n('view')
_rz(z,t3F,'class',47,e,s,gg)
var e4F=_oz(z,48,e,s,gg)
_(t3F,e4F)
_(a2F,t3F)
var b5F=_mz(z,'scroll-view',['scrollX',-1,'class',49],[],e,s,gg)
var o6F=_v()
_(b5F,o6F)
var x7F=function(f9F,o8F,c0F,gg){
var oBG=_n('view')
_rz(z,oBG,'class',54,f9F,o8F,gg)
var cCG=_mz(z,'image',['bindtap',55,'class',1,'data-event-opts',2,'data-staffIndex',3,'mode',4,'src',5],[],f9F,o8F,gg)
_(oBG,cCG)
var oDG=_n('view')
_rz(z,oDG,'class',61,f9F,o8F,gg)
var lEG=_oz(z,62,f9F,o8F,gg)
_(oDG,lEG)
_(oBG,oDG)
var aFG=_n('view')
_rz(z,aFG,'class',63,f9F,o8F,gg)
var tGG=_oz(z,64,f9F,o8F,gg)
_(aFG,tGG)
_(oBG,aFG)
_(c0F,oBG)
return c0F
}
o6F.wxXCkey=2
_2z(z,52,x7F,e,s,gg,o6F,'director','staffIndex','staffId')
var eHG=_v()
_(b5F,eHG)
var bIG=function(xKG,oJG,oLG,gg){
var cNG=_n('view')
_rz(z,cNG,'class',69,xKG,oJG,gg)
var hOG=_mz(z,'image',['bindtap',70,'class',1,'data-event-opts',2,'data-staffIndex',3,'mode',4,'src',5],[],xKG,oJG,gg)
_(cNG,hOG)
var oPG=_n('view')
_rz(z,oPG,'class',76,xKG,oJG,gg)
var cQG=_oz(z,77,xKG,oJG,gg)
_(oPG,cQG)
_(cNG,oPG)
var oRG=_n('view')
_rz(z,oRG,'class',78,xKG,oJG,gg)
var lSG=_oz(z,79,xKG,oJG,gg)
_(oRG,lSG)
_(cNG,oRG)
_(oLG,cNG)
return oLG
}
eHG.wxXCkey=2
_2z(z,67,bIG,e,s,gg,eHG,'actor','actorIndex','staffId')
_(a2F,b5F)
_(f3E,a2F)
var aTG=_n('view')
_rz(z,aTG,'class',80,e,s,gg)
var tUG=_n('view')
_rz(z,tUG,'class',81,e,s,gg)
var eVG=_oz(z,82,e,s,gg)
_(tUG,eVG)
_(aTG,tUG)
var bWG=_mz(z,'scroll-view',['scrollX',-1,'class',83],[],e,s,gg)
var oXG=_v()
_(bWG,oXG)
var xYG=function(f1G,oZG,c2G,gg){
var o4G=_mz(z,'image',['bindtap',88,'class',1,'data-event-opts',2,'data-imageIndex',3,'mode',4,'src',5],[],f1G,oZG,gg)
_(c2G,o4G)
return c2G
}
oXG.wxXCkey=2
_2z(z,86,xYG,e,s,gg,oXG,'img','imgIndex','imgIndex')
_(aTG,bWG)
_(f3E,aTG)
_(r,f3E)
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
var o6G=_n('view')
_rz(z,o6G,'class',0,e,s,gg)
var l7G=_mz(z,'form',['bindsubmit',1,'class',1,'data-event-opts',2],[],e,s,gg)
var a8G=_n('view')
_rz(z,a8G,'class',4,e,s,gg)
var t9G=_mz(z,'image',['class',5,'src',1],[],e,s,gg)
_(a8G,t9G)
_(l7G,a8G)
var e0G=_n('view')
_rz(z,e0G,'class',7,e,s,gg)
var bAH=_n('label')
_rz(z,bAH,'class',8,e,s,gg)
var oBH=_oz(z,9,e,s,gg)
_(bAH,oBH)
_(e0G,bAH)
var xCH=_mz(z,'input',['class',10,'name',1,'placeholder',2,'placeholderClass',3,'type',4,'value',5],[],e,s,gg)
_(e0G,xCH)
_(l7G,e0G)
var oDH=_n('view')
_rz(z,oDH,'class',16,e,s,gg)
var fEH=_n('label')
_rz(z,fEH,'class',17,e,s,gg)
var cFH=_oz(z,18,e,s,gg)
_(fEH,cFH)
_(oDH,fEH)
var hGH=_mz(z,'input',['class',19,'name',1,'password',2,'placeholder',3,'placeholderClass',4,'type',5,'value',6],[],e,s,gg)
_(oDH,hGH)
_(l7G,oDH)
var oHH=_mz(z,'button',['class',26,'formType',1,'type',2],[],e,s,gg)
var cIH=_oz(z,29,e,s,gg)
_(oHH,cIH)
_(l7G,oHH)
_(o6G,l7G)
var oJH=_n('view')
_rz(z,oJH,'class',30,e,s,gg)
var lKH=_n('view')
_rz(z,lKH,'class',31,e,s,gg)
var aLH=_n('view')
_rz(z,aLH,'class',32,e,s,gg)
var tMH=_n('view')
_rz(z,tMH,'class',33,e,s,gg)
_(aLH,tMH)
_(lKH,aLH)
var eNH=_n('view')
_rz(z,eNH,'class',34,e,s,gg)
var bOH=_oz(z,35,e,s,gg)
_(eNH,bOH)
_(lKH,eNH)
var oPH=_n('view')
_rz(z,oPH,'class',36,e,s,gg)
var xQH=_n('view')
_rz(z,xQH,'class',37,e,s,gg)
_(oPH,xQH)
_(lKH,oPH)
_(oJH,lKH)
var oRH=_n('view')
_rz(z,oRH,'class',38,e,s,gg)
var fSH=_mz(z,'image',['bindtap',39,'class',1,'data-event-opts',2,'data-logintype',3,'src',4],[],e,s,gg)
_(oRH,fSH)
var cTH=_mz(z,'image',['bindtap',44,'class',1,'data-event-opts',2,'data-logintype',3,'src',4],[],e,s,gg)
_(oRH,cTH)
var hUH=_mz(z,'image',['bindtap',49,'class',1,'data-event-opts',2,'data-logintype',3,'src',4],[],e,s,gg)
_(oRH,hUH)
_(oJH,oRH)
_(o6G,oJH)
_(r,o6G)
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m8=function(e,s,r,gg){
var z=gz$gwx_9()
var cWH=_n('view')
_rz(z,cWH,'class',0,e,s,gg)
var oXH=_n('view')
_rz(z,oXH,'class',1,e,s,gg)
var lYH=_n('view')
_rz(z,lYH,'class',2,e,s,gg)
var aZH=_mz(z,'image',['class',3,'src',1],[],e,s,gg)
_(lYH,aZH)
_(oXH,lYH)
var t1H=_mz(z,'input',['focus',-1,'bindconfirm',5,'class',1,'confirmType',2,'data-event-opts',3,'maxlength',4,'placeholder',5],[],e,s,gg)
_(oXH,t1H)
_(cWH,oXH)
var e2H=_n('view')
_rz(z,e2H,'class',11,e,s,gg)
var b3H=_v()
_(e2H,b3H)
var o4H=function(o6H,x5H,f7H,gg){
var h9H=_n('view')
_rz(z,h9H,'class',16,o6H,x5H,gg)
var o0H=_mz(z,'image',['bindtap',17,'class',1,'data-event-opts',2,'data-trailer-id',3,'src',4],[],o6H,x5H,gg)
_(h9H,o0H)
_(f7H,h9H)
return f7H
}
b3H.wxXCkey=2
_2z(z,14,o4H,e,s,gg,b3H,'item','__i0__','id')
_(cWH,e2H)
_(r,cWH)
return r
}
e_[x[8]]={f:m8,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
window.__wxml_comp_version__=0.02
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
if(typeof(window.__webview_engine_version__)!='undefined'&&window.__webview_engine_version__+1e-6>=0.02+1e-6&&window.__mergeData__)
{
env=window.__mergeData__(env,dd);
}
try{
main(env,{},root,global);
_tsd(root)
if(typeof(window.__webview_engine_version__)=='undefined'|| window.__webview_engine_version__+1e-6<0.01+1e-6){return _ev(root);}
}catch(err){
console.log(err)
}
return root;
}
}
}


var BASE_DEVICE_WIDTH = 750;
var isIOS=navigator.userAgent.match("iPhone");
var deviceWidth = window.screen.width || 375;
var deviceDPR = window.devicePixelRatio || 2;
var checkDeviceWidth = window.__checkDeviceWidth__ || function() {
var newDeviceWidth = window.screen.width || 375
var newDeviceDPR = window.devicePixelRatio || 2
var newDeviceHeight = window.screen.height || 375
if (window.screen.orientation && /^landscape/.test(window.screen.orientation.type || '')) newDeviceWidth = newDeviceHeight
if (newDeviceWidth !== deviceWidth || newDeviceDPR !== deviceDPR) {
deviceWidth = newDeviceWidth
deviceDPR = newDeviceDPR
}
}
checkDeviceWidth()
var eps = 1e-4;
var transformRPX = window.__transformRpx__ || function(number, newDeviceWidth) {
if ( number === 0 ) return 0;
number = number / BASE_DEVICE_WIDTH * ( newDeviceWidth || deviceWidth );
number = Math.floor(number + eps);
if (number === 0) {
if (deviceDPR === 1 || !isIOS) {
return 1;
} else {
return 0.5;
}
}
return number;
}
var setCssToHead = function(file, _xcInvalid, info) {
var Ca = {};
var css_id;
var info = info || {};
var _C= [[[2,1],],[".",[1],"page { width: 100%; height: 100%; background-color: #f7f7f7; }\n.",[1],"page-block { background-color: #fff; }\n",],];
function makeup(file, opt) {
var _n = typeof(file) === "number";
if ( _n && Ca.hasOwnProperty(file)) return "";
if ( _n ) Ca[file] = 1;
var ex = _n ? _C[file] : file;
var res="";
for (var i = ex.length - 1; i >= 0; i--) {
var content = ex[i];
if (typeof(content) === "object")
{
var op = content[0];
if ( op == 0 )
res = transformRPX(content[1], opt.deviceWidth) + "px" + res;
else if ( op == 1)
res = opt.suffix + res;
else if ( op == 2 ) 
res = makeup(content[1], opt) + res;
}
else
res = content + res
}
return res;
}
var rewritor = function(suffix, opt, style){
opt = opt || {};
suffix = suffix || "";
opt.suffix = suffix;
if ( opt.allowIllegalSelector != undefined && _xcInvalid != undefined )
{
if ( opt.allowIllegalSelector )
console.warn( "For developer:" + _xcInvalid );
else
{
console.error( _xcInvalid + "This wxss file is ignored." );
return;
}
}
Ca={};
css = makeup(file, opt);
if ( !style ) 
{
var head = document.head || document.getElementsByTagName('head')[0];
window.__rpxRecalculatingFuncs__ = window.__rpxRecalculatingFuncs__ || [];
style = document.createElement('style');
style.type = 'text/css';
style.setAttribute( "wxss:path", info.path );
head.appendChild(style);
window.__rpxRecalculatingFuncs__.push(function(size){
opt.deviceWidth = size.width;
rewritor(suffix, opt, style);
});
}
if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
if ( style.childNodes.length == 0 )
style.appendChild(document.createTextNode(css));
else 
style.childNodes[0].nodeValue = css;
}
}
return rewritor;
}
setCssToHead([])();setCssToHead([[2,0]],undefined,{path:"./app.wxss"})();

__wxAppCode__['app.wxss']=setCssToHead([[2,0]],undefined,{path:"./app.wxss"});    
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['components/trailerStars.wxss']=setCssToHead([".",[1],"movie-score-wrapper.",[1],"data-v-5258798a { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n.",[1],"movie-score-wrapper .",[1],"star-ico.",[1],"data-v-5258798a { width: ",[0,20],"; height: ",[0,20],"; margin-top: ",[0,6],"; }\n.",[1],"movie-score-wrapper .",[1],"star-score.",[1],"data-v-5258798a { font-size: 12px; color: dimgrey; margin-left: ",[0,8],"; }\n",],undefined,{path:"./components/trailerStars.wxss"});    
__wxAppCode__['components/trailerStars.wxml']=$gwx('./components/trailerStars.wxml');

__wxAppCode__['pages/cover/cover.wxss']=setCssToHead([".",[1],"black { background-color: #000000; width: 100%; height: 100%; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; position: fixed; }\n.",[1],"cover { -webkit-align-self: center; -ms-flex-item-align: center; align-self: center; }\n",],undefined,{path:"./pages/cover/cover.wxss"});    
__wxAppCode__['pages/cover/cover.wxml']=$gwx('./pages/cover/cover.wxml');

__wxAppCode__['pages/index/index.wxss']=setCssToHead([".",[1],"carousel.",[1],"data-v-205d6604 { width: 100%; height: ",[0,440],"; }\n.",[1],"carousel .",[1],"swiper-item-image.",[1],"data-v-205d6604 { width: 100%; }\n.",[1],"super-hot.",[1],"data-v-205d6604 { margin-top: ",[0,12],"; padding: ",[0,20],"; }\n.",[1],"super-hot .",[1],"hot-title-wrapper.",[1],"data-v-205d6604 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; }\n.",[1],"super-hot .",[1],"hot-title-wrapper .",[1],"hot-ico.",[1],"data-v-205d6604 { width: ",[0,30],"; height: ",[0,30],"; margin-top: ",[0,15],"; }\n.",[1],"super-hot .",[1],"hot-title-wrapper .",[1],"hot-title.",[1],"data-v-205d6604 { font-size: 20px; margin-left: ",[0,20],"; font-weight: bold; }\n.",[1],"hot.",[1],"data-v-205d6604 { width: 100%; white-space: nowrap; }\n.",[1],"hot .",[1],"single-poster.",[1],"data-v-205d6604 { display: inline-block; margin-left: ",[0,20],"; }\n.",[1],"hot .",[1],"single-poster .",[1],"poster-wrapper.",[1],"data-v-205d6604 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n.",[1],"hot .",[1],"single-poster .",[1],"poster-wrapper .",[1],"poster.",[1],"data-v-205d6604 { width: ",[0,200],"; height: ",[0,270],"; }\n.",[1],"hot .",[1],"single-poster .",[1],"poster-wrapper .",[1],"movie-name.",[1],"data-v-205d6604 { width: ",[0,200],"; margin-top: ",[0,10],"; font-size: 14px; font-weight: bold; white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n.",[1],"hot-movies.",[1],"data-v-205d6604 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; padding: 0 ",[0,20]," ",[0,20],"; }\n.",[1],"hot-movies .",[1],"hot-movie-single.",[1],"data-v-205d6604 { width: ",[0,350],"; height: ",[0,220],"; margin-top: ",[0,10],"; }\n.",[1],"guess-u-like.",[1],"data-v-205d6604 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n.",[1],"guess-u-like .",[1],"single-like-movie.",[1],"data-v-205d6604 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; padding: ",[0,30]," ",[0,20],"; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-poster.",[1],"data-v-205d6604 { width: ",[0,180],"; height: ",[0,240],"; border-radius: 3%; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-desc.",[1],"data-v-205d6604 { width: ",[0,340],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-desc .",[1],"movie-title.",[1],"data-v-205d6604 { white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-desc .",[1],"movie-info.",[1],"data-v-205d6604 { color: #808080; font-size: 14px; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-oper.",[1],"data-v-205d6604 { width: ",[0,140],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; border-left: dashed 2px #808080; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-oper .",[1],"praise-ico.",[1],"data-v-205d6604 { width: ",[0,40],"; height: ",[0,40],"; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-oper .",[1],"praise-me.",[1],"data-v-205d6604 { font-size: 14px; color: #feab2a; -webkit-align-self: center; -ms-flex-item-align: center; align-self: center; }\n.",[1],"guess-u-like .",[1],"single-like-movie .",[1],"movie-oper .",[1],"animation-opacity.",[1],"data-v-205d6604 { font-weight: bold; opacity: 0; }\n",],undefined,{path:"./pages/index/index.wxss"});    
__wxAppCode__['pages/index/index.wxml']=$gwx('./pages/index/index.wxml');

__wxAppCode__['pages/me/me.wxss']=setCssToHead([".",[1],"page-fill.",[1],"data-v-cc342e50 { width: 100%; height: 100%; }\n.",[1],"page-fill .",[1],"header.",[1],"data-v-cc342e50 { padding: ",[0,120]," ",[0,30]," ",[0,40]," ",[0,30],"; background-color: #ffd655; background: url(http://122.152.205.72:88/group1/M00/00/03/CpoxxFwu_1OAYFAIAAAzO_Q1tPg693.png) repeat; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; }\n.",[1],"page-fill .",[1],"header .",[1],"face.",[1],"data-v-cc342e50 { width: ",[0,120],"; height: ",[0,120],"; border-radius: 50%; -webkit-flex-shrink: 0; -ms-flex-negative: 0; flex-shrink: 0; }\n.",[1],"page-fill .",[1],"header .",[1],"info-wrapper.",[1],"data-v-cc342e50 { width: 80%; margin-left: ",[0,40],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; }\n.",[1],"page-fill .",[1],"header .",[1],"info-wrapper .",[1],"nickname.",[1],"data-v-cc342e50 { color: #6a5018; font-size: 18px; font-weight: bold; }\n.",[1],"page-fill .",[1],"header .",[1],"info-wrapper .",[1],"nav-info.",[1],"data-v-cc342e50 { color: #a38eb2; font-size: 14px; margin-top: ",[0,10],"; }\n.",[1],"page-fill .",[1],"header .",[1],"set-wrapper.",[1],"data-v-cc342e50 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: end; -webkit-justify-content: flex-end; -ms-flex-pack: end; justify-content: flex-end; width: 15%; }\n.",[1],"page-fill .",[1],"header .",[1],"set-wrapper .",[1],"settings.",[1],"data-v-cc342e50 { width: ",[0,40],"; height: ",[0,40],"; }\n.",[1],"page-fill .",[1],"header .",[1],"regist-login.",[1],"data-v-cc342e50 { margin-left: ",[0,60],"; margin-top: ",[0,30],"; }\n",],undefined,{path:"./pages/me/me.wxss"});    
__wxAppCode__['pages/me/me.wxml']=$gwx('./pages/me/me.wxml');

__wxAppCode__['pages/meface/meface.wxss']=setCssToHead([".",[1],"page-fill { width:100%; height: 100%; position: absolute; background: black; }\n.",[1],"pending-wapper { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; margin-top: ",[0,40],"; }\n.",[1],"pending-face { width: ",[0,600],"; height: ",[0,600],"; }\n.",[1],"notice { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: end; -webkit-justify-content: flex-end; -ms-flex-pack: end; justify-content: flex-end; }\n.",[1],"notice-words { color: gray; font-size: 13px; margin-top: ",[0,30],"; width: ",[0,600],"; }\n.",[1],"footer-opertor { position: fixed; bottom: 0; border-top: #515050 solid 1px; width: 100%; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; padding: ",[0,30],"; }\n.",[1],"opertor-words { color: #e8e5e5; font-size: 16px; width: ",[0,200],"; }\n",],undefined,{path:"./pages/meface/meface.wxss"});    
__wxAppCode__['pages/meface/meface.wxml']=$gwx('./pages/meface/meface.wxml');

__wxAppCode__['pages/meInfo/meInfo.wxss']=setCssToHead([".",[1],"page { }\n.",[1],"page-fill { width:100%; height: 100%; position: absolute; }\n.",[1],"info-list { padding: 0px ",[0,20],"; }\n.",[1],"item-wapper { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; }\n.",[1],"face-line{ border-bottom: solid 1px #EAEAEA; }\n.",[1],"face-upbottom { margin-top: ",[0,10],"; padding-top: ",[0,10],"; padding-bottom: ",[0,10],"; }\n.",[1],"face-upbottom-top { margin-top: ",[0,20],"; padding-top: ",[0,20],"; padding-bottom: ",[0,20],"; }\n.",[1],"info-words { color: #333333; font-size: 16px; width: 25%; line-height: ",[0,80],"; }\n.",[1],"right-wapper { width: 80%; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: end; -webkit-justify-content: flex-end; -ms-flex-pack: end; justify-content: flex-end; }\n.",[1],"face { width: ",[0,80],"; height: ",[0,80],"; border-radius: 50%; }\n.",[1],"arrow-block { margin-left: ",[0,10],"; line-height: ",[0,86],"; }\n.",[1],"arrow-ico { width: ",[0,30],"; height: ",[0,30],"; }\n.",[1],"gray-fields { color: gray; margin-top: ",[0,15],"; }\n.",[1],"foot-wapper { position: fixed; bottom: 0; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; width: 100%; }\n.",[1],"footer-words { text-align: center; background-color: white; padding: ",[0,20],"; }\n",],undefined,{path:"./pages/meInfo/meInfo.wxss"});    
__wxAppCode__['pages/meInfo/meInfo.wxml']=$gwx('./pages/meInfo/meInfo.wxml');

__wxAppCode__['pages/movie/movie.wxss']=setCssToHead([".",[1],"player.",[1],"data-v-f1e9858c { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; background-color: black; }\n.",[1],"player .",[1],"movie.",[1],"data-v-f1e9858c { width: 100%; height: ",[0,440],"; }\n.",[1],"movie-info.",[1],"data-v-f1e9858c { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; background-color: #f7f4f9; padding: ",[0,40]," ",[0,20],"; }\n.",[1],"movie-info .",[1],"cover.",[1],"data-v-f1e9858c { width: ",[0,280],"; height: ",[0,380],"; }\n.",[1],"movie-info .",[1],"movie-desc.",[1],"data-v-f1e9858c { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; margin-left: ",[0,30],"; width: ",[0,400],"; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"title.",[1],"data-v-f1e9858c { font-size: 30px; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"basic-info.",[1],"data-v-f1e9858c { color: darkgray; font-size: 13px; line-height: ",[0,36],"; white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"score-block.",[1],"data-v-f1e9858c { background-color: white; margin-top: ",[0,20],"; width: ",[0,360],"; height: ",[0,90],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; padding: ",[0,20],"; -webkit-box-shadow: 3px 2px 10px #dedede; box-shadow: 3px 2px 10px #dedede; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"score-block .",[1],"big-score.",[1],"data-v-f1e9858c { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"score-block .",[1],"big-score .",[1],"score-words.",[1],"data-v-f1e9858c { font-size: 12px; color: gray; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"score-block .",[1],"big-score .",[1],"movie-score.",[1],"data-v-f1e9858c { font-size: 24px; font-weight: bold; margin-left: ",[0,8],"; color: orange; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"score-block .",[1],"score-stars.",[1],"data-v-f1e9858c { margin-left: ",[0,10],"; }\n.",[1],"movie-info .",[1],"movie-desc .",[1],"score-block .",[1],"score-stars .",[1],"prise-counts.",[1],"data-v-f1e9858c { font-size: 12px; color: gray; line-height: ",[0,44],"; }\n.",[1],"line-wrapper.",[1],"data-v-f1e9858c { padding: 0px ",[0,20],"; }\n.",[1],"line-wrapper .",[1],"line.",[1],"data-v-f1e9858c { height: 1px; background-color: #DBDBDA; }\n.",[1],"plots-block.",[1],"data-v-f1e9858c { background-color: #f7f4f9; padding: ",[0,20]," ",[0,40],"; }\n.",[1],"plots-block .",[1],"plots-title.",[1],"data-v-f1e9858c { font-size: 14px; color: gray; }\n.",[1],"plots-block .",[1],"plots-desc.",[1],"data-v-f1e9858c { margin-top: ",[0,10],"; font-size: 16px; }\n.",[1],"scroll-block.",[1],"data-v-f1e9858c { background-color: #f7f4f9; padding: ",[0,20]," ",[0,40],"; }\n.",[1],"scroll-block .",[1],"scroll-list.",[1],"data-v-f1e9858c { width: 100%; white-space: nowrap; margin-top: ",[0,20],"; }\n.",[1],"scroll-block .",[1],"scroll-list .",[1],"actor-wrapper.",[1],"data-v-f1e9858c { display: inline-block; }\n.",[1],"scroll-block .",[1],"scroll-list .",[1],"actor-wrapper .",[1],"single-actor.",[1],"data-v-f1e9858c { width: ",[0,170],"; height: ",[0,240],"; margin-right: ",[0,10],"; }\n.",[1],"scroll-block .",[1],"scroll-list .",[1],"actor-wrapper .",[1],"actor-name.",[1],"data-v-f1e9858c { width: ",[0,170],"; font-size: ",[0,15],"; text-align: center; white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n.",[1],"scroll-block .",[1],"scroll-list .",[1],"actor-wrapper .",[1],"actor-role.",[1],"data-v-f1e9858c { width: ",[0,170],"; font-size: ",[0,13],"; color: #A9A9A9; text-align: center; white-space: nowrap; overflow: hidden; -o-text-overflow: ellipsis; text-overflow: ellipsis; }\n.",[1],"scroll-block .",[1],"scroll-list .",[1],"plot-image.",[1],"data-v-f1e9858c { width: ",[0,220],"; height: ",[0,320],"; margin-right: ",[0,10],"; }\n",],undefined,{path:"./pages/movie/movie.wxss"});    
__wxAppCode__['pages/movie/movie.wxml']=$gwx('./pages/movie/movie.wxml');

__wxAppCode__['pages/registLogin/registLogin.wxss']=setCssToHead([".",[1],"body.",[1],"data-v-5e26d440 { border-top: solid 1px #DBDBDA; padding: 0 ",[0,40],"; }\n.",[1],"face-wapper.",[1],"data-v-5e26d440 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; margin-top: ",[0,120],"; margin-bottom: ",[0,120],"; }\n.",[1],"face.",[1],"data-v-5e26d440 { width: ",[0,120],"; height: ",[0,120],"; }\n.",[1],"info-wapper.",[1],"data-v-5e26d440 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; border-bottom: solid 1px #DBDBDA; padding-bottom: ",[0,20],"; margin-top: ",[0,40],"; }\n.",[1],"words-lbl.",[1],"data-v-5e26d440 { color: #808080; }\n.",[1],"input.",[1],"data-v-5e26d440 { width: ",[0,500],"; margin-left: ",[0,20],"; }\n.",[1],"graywords.",[1],"data-v-5e26d440 { color: #EAEAEA; }\n.",[1],"loginbutton.",[1],"data-v-5e26d440 { margin-top: 60px; width: 90%; }\nwx-button.",[1],"data-v-5e26d440::after { border: none; }\n.",[1],"third-wapper.",[1],"data-v-5e26d440 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; margin-top: ",[0,60],"; }\n.",[1],"third-line.",[1],"data-v-5e26d440 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n.",[1],"single-line.",[1],"data-v-5e26d440 { padding: ",[0,25]," ",[0,20],"; -webkit-box-align: center; -webkit-align-items: center; -ms-flex-align: center; align-items: center; width: 25%; }\n.",[1],"line.",[1],"data-v-5e26d440 { height: 1px; background-color: #A9A9A9; }\n.",[1],"third-words.",[1],"data-v-5e26d440 { color: #A9A9A9; font-size: 13px; }\n.",[1],"third-icons-wapper.",[1],"data-v-5e26d440 { margin-top: ",[0,30],"; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }\n.",[1],"third-icon.",[1],"data-v-5e26d440 { width: ",[0,60],"; height: ",[0,60],"; }\n.",[1],"third-btn-ico.",[1],"data-v-5e26d440 { background-image: url(http://122.152.205.72:88/group1/M00/00/05/CpoxxFxFO-yAOjTaAAATCIZEzRU503.png); width: ",[0,60],"; height: ",[0,60],"; background-color: white; background-size: ",[0,60]," ",[0,60],"; background-repeat: no-repeat; border: none; padding: 0; }\n",],undefined,{path:"./pages/registLogin/registLogin.wxss"});    
__wxAppCode__['pages/registLogin/registLogin.wxml']=$gwx('./pages/registLogin/registLogin.wxml');

__wxAppCode__['pages/search/search.wxss']=setCssToHead([".",[1],"search-block.",[1],"data-v-2437d258 { position: fixed; top: 100; z-index: 9999; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; padding: 0 ",[0,20]," ",[0,20]," ",[0,20],"; background-color: #f8f8f8; }\n.",[1],"search-block .",[1],"search-ico-wrapper.",[1],"data-v-2437d258 { background-color: #eaeaea; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; padding: 0 ",[0,10],"; }\n.",[1],"search-block .",[1],"search-ico-wrapper .",[1],"search-ico.",[1],"data-v-2437d258 { width: ",[0,40],"; height: ",[0,40],"; }\n.",[1],"search-block .",[1],"search-text.",[1],"data-v-2437d258 { font-size: 14px; background-color: #eaeaea; height: ",[0,60],"; width: ",[0,650],"; }\n.",[1],"movie-list.",[1],"data-v-2437d258 { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-box-pack: start; -webkit-justify-content: flex-start; -ms-flex-pack: start; justify-content: flex-start; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; padding: ",[0,100]," ",[0,10]," 0 ",[0,10],"; }\n.",[1],"movie-list .",[1],"movie-wrapper.",[1],"data-v-2437d258 { padding: ",[0,10]," ",[0,20],"; }\n.",[1],"movie-list .",[1],"movie-wrapper .",[1],"poster.",[1],"data-v-2437d258 { width: ",[0,200],"; height: ",[0,270],"; }\n",],undefined,{path:"./pages/search/search.wxss"});    
__wxAppCode__['pages/search/search.wxml']=$gwx('./pages/search/search.wxml');

;var __pageFrameEndTime__ = Date.now();
(function() {
        window.UniLaunchWebviewReady = function(isWebviewReady){
          // !isWebviewReady && console.log('launchWebview fallback ready')
          plus.webview.postMessageToUniNView({type: 'UniWebviewReady-' + plus.webview.currentWebview().id}, '__uniapp__service');
        }
        UniLaunchWebviewReady(true);
})();
