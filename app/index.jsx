import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import Modal from 'react-modal'
import a11y from 'react-a11y'

a11y(React)

import './styles.scss'


class Gif extends Component {
  render() {
    const { images, source } = this.props
    const stillImage = images.fixed_width_still

    return (
      <img
        src={stillImage.url}
        width={stillImage.width}
        height={stillImage.height}
        alt={`Trending from ${source}`}
      />
    )
  }
}


class Gifs extends Component {
  constructor() {
    super()

    this.state = {
      gifs: window._initial.data
    }
  }

  render() {
    return (
      <div>
        {this.state.gifs.map((gif) => <Gif key={gif.id} {...gif} />)}
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Gifs} />
    </Route>
  </Router>
), document.getElementById('app'))