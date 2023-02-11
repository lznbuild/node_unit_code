## readline 
内容输入
```js
const readline=require('readline')
const r = readline.createInterface({
  put:process.stdout,
  input:process.stdin
})

r.question('今晚吃啥',(answer)=> {
  console.log('答复：',answer)
  r.close()
})

r.on('close',()=>{
  process.exit(0)
})
```

日志读取
比如我们有如下日志文件access.log，我们想要提取“访问时间+访问地址”，借助readline可以很方便的完成日志分析的工作。

[2016-12-09 13:56:48.407] [INFO] access - ::ffff:127.0.0.1 - - "GET /oc/v/account/user.html HTTP/1.1" 200 213125 "http://www.example.com/oc/v/account/login.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
[2016-12-09 14:00:10.618] [INFO] access - ::ffff:127.0.0.1 - - "GET /oc/v/contract/underlying.html HTTP/1.1" 200 216376 "http://www.example.com/oc/v/account/user.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
[2016-12-09 14:00:34.200] [INFO] access - ::ffff:127.0.0.1 - - "GET /oc/v/contract/underlying.html HTTP/1.1" 200 216376 "http://www.example.com/oc/v/account/user.html" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36"
代码如下：

```js
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('./access.log')
});

rl.on('line', (line) => {
    const arr = line.split(' '); 
    console.log('访问时间：%s %s，访问地址：%s', arr[0], arr[1], arr[13]);
});
```

自动完成，代码提示
```js
const readline = require('readline');
const fs = require('fs');

function completer(line) {
    const command = 'npm';
    const subCommands = ['help', 'init', 'install'];

    // 输入为空，或者为npm的一部分，则tab补全为npm
    if(line.length < command.length){
        return [command.indexOf(line) === 0 ? [command] : [], line];
    }

    // 输入 npm，tab提示 help init install
    // 输入 npm in，tab提示 init install
    let hits = subCommands.filter(function(subCommand){ 
        const lineTrippedCommand = line.replace(command, '').trim();
        return lineTrippedCommand && subCommand.indexOf( lineTrippedCommand ) === 0;
    })

    if(hits.length === 1){
        hits = hits.map(function(hit){
            return [command, hit].join(' ');
        });
    }
  
    return [hits.length ? hits : subCommands, line];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  completer: completer
});

rl.prompt();
```

npm init 功能模仿
```js
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> '
});

const preHint = `
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help json\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`;

console.log(preHint);

// 问题
let questions = [ 'name', 'version', 'author'];

// 默认答案
let defaultAnswers = [ 'name', '1.0.0', 'none' ];

// 用户答案
let answers = [];
let index = 0;

function createPackageJson(){
    var map = {};
    questions.forEach(function(question, index){
        map[question] = answers[index];
    });

    fs.writeFileSync('./package.json', JSON.stringify(map, null, 4));
}

function runQuestionLoop() {

    if(index === questions.length) {
        createPackageJson();
        rl.close();
        return;
    }
    
    let defaultAnswer = defaultAnswers[index];
    let question = questions[index] + ': (' + defaultAnswer +') ';
    
    rl.question(question, function(answer){
        answers.push(answer || defaultAnswer);
        index++;
        runQuestionLoop();
    });
}

runQuestionLoop();
```