import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import Modal from 'react-modal'
import a11y from 'react-a11y'

a11y(React)

import './styles.scss'


class Gif extends Component {
  constructor() {
    super()
    this.state = { modalIsVisible: false }
  }

  closeModal() {
    this.setState({ modalIsVisible: false })
  }

  openModal() {
    this.setState({ modalIsVisible: true })
  }

  render() {
    const { images, source } = this.props
    const image = images.original
    const { modalIsVisible } = this.state

    const buttonStyle = {
      border: 0,
      background: 'none'
    }

    return (
      <div className="inline">
        <button className="Button--plain" onClick={this.openModal.bind(this)}>
          <img
            src={image.webp}
            width={image.width / 2}
            height={image.height / 2}
            alt={`Trending from ${source}`}
          />
        </button>

        <Modal
          onRequestClose={this.closeModal.bind(this)}
          isOpen={modalIsVisible}>

          <img
            src={images.original.webp}
            width={images.original.width}
            height={images.original.height}
          />

        </Modal>
      </div>
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
