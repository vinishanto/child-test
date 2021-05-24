import React from 'react';
import './style.css';

function findElements(child, KeyValue, keyName = 'id') {
  let type = child.constructor.name;
  console.log('checking the child', type, child);
  switch (type) {
    case 'String':
      return false;
    case 'Array':
      for (let item of child) {
        let ele = findElements(item, KeyValue, keyName);
        if (ele) return ele;
      }
      return false;
    case 'Object':
      if (child.props[keyName] === KeyValue) return child;
      else return findElements(child.props.children, KeyValue, keyName);
    default:
      console.log('Some error occured for type', type);
      return false;
  }
  // console.log("found element", ele)
}

function Wrap(props) {
  console.log(props.children, typeof props.children);
  let ele = findElements(props.children, 'this');
  console.log('found element', ele);
  ele = React.cloneElement(ele, { ...ele.props, value: 'Hello' }, ele.children);
  return (
    <div>
      Iam parent
      {props.children}
      {ele}
    </div>
  );
}

function Para(props) {
  return <div>some props {props.value}</div>;
}

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      <Wrap>
        iam a child
        <div>
          <Para id="this">I am a grand Child </Para>
        </div>
      </Wrap>
    </div>
  );
}
