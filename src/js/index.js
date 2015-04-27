import React, { Component } from 'react';
import computeLayout from 'css-layout';

function Layout( layout ) {
  return DecoratedComponent => class LayoutContainer extends Component {
    constructor( props ) {
      super( props );
      this.layout = { style: layout };
    }

    render() {
      return (
        <DecoratedComponent
          {...this.props}
          {...this.state}
        />
      );
    }
  };
}

@Layout({
  height: 40,
  alignSelf: 'stretch'
})
class Rect extends Component {
  render() {
    const style = Object.assign({
      position: 'absolute',
      backgroundColor: this.props.color
    }, this.props.style );

    return <div style={style}>{Math.random()}</div>;
  }
}

const colors = [
  '#f00',
  '#0f0',
  '#00f'
];

class App extends Component {
  constructor() {
    super();
    this.children = [];
  }

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const layout = {
      style: {
        padding: 20,
        width: 400,
        height: 200,
        justifyContent: 'space-between'
      },
      children: this.children.map( child => child.layout )
    };

    const style = Object.assign({
      position: 'absolute',
      outline: '1px solid red'
    }, computeLayout( layout ) );

    this.children = [];

    return (
      <div className='app' style={style}>
        {colors.map( ( color, index ) =>
          <Rect
            key={index}
            color={color}
            style={style.children && style.children[ index ]}
            ref={component => this.children[ index ] = component}
          />
        )}
      </div>
    );
  }
}

React.render( <App/>, document.querySelector( '.main' ) );
