import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import Modal from 'react-modal'
import a11y from 'react-a11y'
import Masonry from 'masonry-layout'

a11y(React)

import './styles.scss'


class Gif extends Component {
  constructor() {
    super()
    this.state = { modalIsVisible: false }
  }

  componentDidMount() {
    const imageObj = this.props.images.fixed_width_small_still
    const image = new Image(imageObj.width, imageObj.height)
    const colorThief = new ColorThief()
    image.addEventListener('load', () => {
      this.setState({ dominantColor: colorThief.getColor(image) })
    })
    image.crossOrigin = 'Anonymous'
    image.src = imageObj.url
  }

  closeModal() {
    this.setState({ modalIsVisible: false })
  }

  openModal() {
    this.setState({ modalIsVisible: true })
  }

  render() {
    const { className, images, source } = this.props
    const image = images.original
    const { modalIsVisible } = this.state

    const buttonStyle = {
      border: 0,
      background: 'none'
    }

    const width = Math.min(400, image.width)
    const height = image.height * (width / image.width)

    const c = this.state.dominantColor
    const imageStyle = (!c) ? {} : {
      border: `8px solid rgb(${c[0]}, ${c[1]}, ${c[2]})`
    }

    return (
      <div className={`${className} inline`}>
        <button className="Button--plain" onClick={this.openModal.bind(this)}>
          <img
            src={image.webp}
            width={width / 2}
            height={height / 2}
            alt={`Trending from ${source}`}
            style={imageStyle}
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

  initMasonry(grid) {
    const masonry = new Masonry(grid, {
      itemSelector: '.masonry-item'
    })
  }

  render() {
    return (
      <div ref={this.initMasonry.bind(this)}>
        {this.state.gifs.map((gif) => <Gif className="masonry-item" key={gif.id} {...gif} />)}
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
