vm 的功能是可以在 V8 虚拟机的上下文中编译和执行 JavaScript 代码。

它比 eval、Function 更安全，而且同样很简单。

假设你有一段可执行的js代码，最简单的两种方法让它run起来：

打开浏览器 console，回车执行。
打开一个 terminal，使用 node 来执行它。
这两种都是手动、主动的执行。如果想把这个过程自动化，把目标代码放入到我的程序里呢？方法也有：

eval
Function
vm
```js
// eval(string)

console.log(eval('2 + 2'));
// expected output: 4

console.log(eval(new String('2 + 2')));
// expected output: 2 + 2
const sum = new Function('a', 'b', 'return a + b');

console.log(sum(2, 6));
// expected output: 8
```

但是却带来一些问题：首先最大的是安全性，无论如何目标代码不能影响我正常的服务，也就是说，这个执行环节得是一个沙盒环境，而eval显然并不具备这个能力。如果需要一段不信任的代码放任它执行，那么不光服务，整个服务器的文件系统、数据库都暴露了。甚至目标代码会修改eval函数原型，埋入陷阱等等。

eval 的安全性问题我们就不做更多解释了，其实在生产中，我们应该尽量避免使用它（甚至很多lint规则发现它存在都会报错）。总结来说，作为js的一个全局对象，它并没有任何沙盒的设计，这显然是无法在生产中使用的。而 Funtion 也有同样的安全问题，


vm始终提供了一个可选的作用域来实现沙盒特性，以此来隔绝沙盒内外的影响
```js
const vm = require('vm');

const x = 1;

const sandbox = { x: 2 };
vm.createContext(sandbox); // Contextify the sandbox.

const code = 'x += 40; var y = 17;';
// x and y are global variables in the sandboxed environment.
// Initially, x has the value 2 because that is the value of sandbox.x.
vm.runInContext(code, sandbox);

console.log(sandbox.x); // 42
console.log(sandbox.y); // 17

console.log(x); // 1; y is not defined.
```
比起其他实现runtime的方案，vm的速度会慢一些，因为他建立了封闭而完整的上下文环境

使用vm的模块会比eval更为安全，因为vm模块运行的脚本完全无权访问外部作用域（或自行设置一个有限的作用域）。 脚本仍在同一进程中运行，因此为了获得最佳安全性。当然你可以给上下文传入一些通用的API方便开发：
```js
vm.runInNewContext(`
  const util = require(‘util’);
  console.log(util);
`, {
  require: require,
  console: console
});
```