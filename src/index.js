import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; //ES6
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


const element = <h1>hello, world!</h1>;
ReactDOM.render(element, document.getElementById('app'));

var myStyle = {
  fontSize: '26px',
  color: '#FF0000'
};

var arr = [
  <p>第一个</p>,
  <p>第二个</p>,
];

// 封装组件
// 实例中 class 定义的组件使用 props 要加 this //  this.props.name 来获取传递的数据
// function 定义的组件使用 props 不用加 this
class Clock extends React.Component {
  render () {
    return (
      <div style={myStyle}>
        <p>{1 > 0 ? 'klaklak' : '修改修改~~~'}</p>
        <p>现在是 {this.props.date.toLocaleTimeString()}.</p>
        {this.props.name}
        {/* 循环，需要加上 key */}
        {
          arr.map((name, index) => <div key={index}>{name}</div>)
        }
      </div>
    );
  }
}
// props 默认值
Clock.defaultProps = {
  name: 'props 默认值，不传递参数的时候就会使用这个默认值'
}

/* render 函数第一个参数外面只能包含一个标签 */
// 原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，
// 比如 HelloMessage 不能写成 helloMessage
// 除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错
function tick () {
  ReactDOM.render(
    <Clock date={new Date()}/>,
    document.getElementById('sec')
  );
}
setInterval(tick, 1000);

// 封装组件
// 注意，在添加属性时， class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字
function SecComponent (props) {
  return (
    <div>
      <p className="xiaobin" style={{"fontSize": "24px", "fontWeight": "700"}}>这是封装的组件; {props.name}</p>
      <p style={myStyle}>使用上面定义的样式赋值</p>
    </div>
  );
}
const elementComponent = <SecComponent name="传递的参数"/>;
ReactDOM.render(
  elementComponent,
  document.getElementById('thir'),
)


// 复合组件
// 子组件
function Name (props) {
  return <p style={{color: 'red'}}>网站名称：{props.name}</p>;
}
function Url (props) {
  return <p>网站地址：<a href={props.url} target="_blank">{props.url}</a></p>;
}
function Nickname (props) {
  return <p>网站小名：{props.nickname}</p>;
}
// 父组件
function Apps () {
  return (
  <div>
    <Name name="乐诗" />
    <Url url="https://ainyi.com" />
    <Nickname nickname="krryblog" />
  </div>
  );
}

ReactDOM.render(
   <Apps />,
  document.getElementById('example')
);


// 生命周期
class NamefromPar extends React.Component {
  render() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
}
// props 验证
NamefromPar.propTypes = {
  name: PropTypes.string,
}

class Live extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      date: new Date(),
      name: 'state 传递'
    };
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount () {
    clearInterval(this.timerID);
  }

  tick () {
    this.setState({
      date: new Date()
    });
  }
  render () {
    return (
      <div>
        <NamefromPar name={this.state.name}/>
        <h1>hello world</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Live />,
  document.getElementById('pive')
);


// 事件绑定
function ActionLink () {
  function handleClick (e) {
    e.preventDefault(); // 在 React 中不能使用返回 false 的方式阻止默认行为，必须明确的使用 preventDefault
    console.log('链接被点击');
  }
  return (
    <a href="#" onClick={handleClick} >点我</a>
  )
}

ReactDOM.render(
  <ActionLink />,
  document.getElementById('click')
);


// JSX 回调函数中的 this，类的方法默认是不会绑定 this 的
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
 
    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleClick = this.handleClick.bind(this); // 改变 handleClick 的 this 指向是 class
  }
 
  handleClick(params, e) { // 事件对象 e 要放在最后
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    console.log(params);
  }

  // 也可以使用箭头函数，不绑定this，找的是上下文 this，也就是 class 当前实例
  // 这个语法确保了 `this` 绑定在 handleClickTwo 中
  // 这里只是一个测试
  handleClickTwo = () => {
    console.log('this is:', this);
  }
 
  render() {
    return (
      <button onClick={this.handleClick.bind(this, `我是传递的参数：${this.state.isToggleOn}`)}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
 
ReactDOM.render(
  <Toggle />,
  document.getElementById('clickthis')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
