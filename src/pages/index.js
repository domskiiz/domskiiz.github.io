import React from 'react'
import ReactLoading from 'react-loading'

import '../styles/styles.scss'

class IndexPage extends React.Component {
  constructor() {
    super();

    this.state = {
      x: 0,
      y: 0,
      screenX: 1,
      screenY: 1,
      spotifyData: [],
      isLoading: true
    };
  }

  componentDidMount = () => {
    fetch(process.env.SPOTIFY_URL + '/refresh_token')
    fetch(process.env.SPOTIFY_URL + '/getSongs')
      .then(res => res.json())
      .then(data => {
        this.setState({ spotifyData: data.items }, () => {
          setTimeout(() => {
            this.setState({ isLoading: false })
          }, 2400)
        })
      })
    this._handleResize()
    window.addEventListener('resize', this._handleResize.bind(this))
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this._handleResize.bind(this));
  }

  _handleResize = () => {
    this.setState({
      screenX: window.innerWidth,
      screenY: window.innerHeight,
      x: this.state.x >= window.innerWidth - 40 ? window.innerWidth : this.state.x,
      y: this.state.x >= window.innerHeight - 40 ? window.innerHeight : this.state.y,
    })
  }

  _handleMouseMove = (e) => {
    if (this.state.screenX <= 414) {
      return;
    }
    this.setState({ x: e.clientX, y: e.clientY });
  }

  _interpolateColors = (first, second, delta) => {
    let ah = parseInt(first.replace(/#/g, ''), 16),
      ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
      bh = parseInt(second.replace(/#/g, ''), 16),
      br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
      rr = ar + delta * (br - ar),
      rg = ag + delta * (bg - ag),
      rb = ab + delta * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
  }

  _parseTrackData = (spotifyItem) => {
    let title = spotifyItem.track.name
    let artists = [], artistsString
    spotifyItem.track.artists.forEach((artist) => artists.push(artist.name))
    if (artists.length === 1) {
      artistsString = artists[0]
    } else if (artists.length === 2) {
      artistsString = artists.join(' and ')
    } else {
      let lastArtist = artists[artists.length - 1]
      let extractedLast = artists.slice(0, artists.length - 1)
      artistsString = extractedLast.join(', ')
      artistsString += ', and ' + lastArtist
    }

    return title + ' by ' + artistsString
  }


  render = () => (
    !this.state.isLoading
    ?
      <div style={{ 'backgroundColor': this._interpolateColors('#F1F2F6', '#1e272e', this.state.x / this.state.screenX) }}
           onPointerMove={(e) => this._handleMouseMove(e)}
           className="main_container">
        <div className="main_info">
          <div className="main_greeting">Hey, I'm Alissa.</div>
          <div className="main_subtext">I'm a third year computer science major @ UCLA.</div>
          <div className="main_subtext">I'm also an organizational nerd, poke enthusiast, and part time (somewhat) professional&nbsp;
            <a href="https://instagram.com/hairbydomskiiz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX )}}>
                hairdresser
              </a>
          .
          </div>
          <div className="main_subtext">Currently building frontend for&nbsp;
            <a href="https://helloyumi.com"
               target="_blank"
               rel="noopener noreferrer"
               style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX )}}>
              Yumi
            </a>
            .
          </div>
          <div className="main_subtext">The last three songs I’ve listened to are&nbsp;
            <a href={this.state.spotifyData[0].track.external_urls.spotify} target="_blank" rel="noopener noreferrer"
              style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX) }}>
              {this._parseTrackData(this.state.spotifyData[0])}
            </a>,&nbsp;
            <a href={this.state.spotifyData[1].track.external_urls.spotify} target="_blank" rel="noopener noreferrer"
              style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX) }}>
              {this._parseTrackData(this.state.spotifyData[1])}
            </a>, and&nbsp;
            <a href={this.state.spotifyData[2].track.external_urls.spotify} target="_blank" rel="noopener noreferrer"
              style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX) }}>
              {this._parseTrackData(this.state.spotifyData[2])}
            </a>
            .
          </div>
        </div>
        <div className="main_links">
          <div className="link">Github:&nbsp;
            <a style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX) }}
               href="https://github.com/domskiiz"
               rel="noopener noreferrer"
               target="_blank">
              @domskiiz
            </a>
          </div>
          <div className="link">LinkedIn:&nbsp;
            <a style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX)  }}
               href="https://www.linkedin.com/in/alissaniewiadomski/"
               rel="noopener noreferrer"
               target="_blank">
              alissaniewiadomski
            </a>
          </div>
          <div className="link">Spotify:&nbsp;
            <a style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX)  }}
               href="https://open.spotify.com/user/22plzasmdhnhu5rz3dbp6doui"
               rel="noopener noreferrer"
               target="_blank">
              Alissa Niewiadomski
            </a>
          </div>
          <div className="link">Instagram:&nbsp;
            <a style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX) }}
               href="https://www.instagram.com/domskiiz/"
               rel="noopener noreferrer"
               target="_blank">
              @domskiiz
            </a>
          </div>
          <div className="link">Contact:&nbsp;
            <a style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX) }}
               rel="noopener noreferrer"
               href="mailto:aniewiadomski@ucla.edu">
              aniewiadomski@ucla.edu
            </a>
          </div>
          <div className="link">Resume&nbsp;
            <a
              style={{ 'color': this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX) }}
              href='AlissaNiewiadomski-Resume.pdf' target="_blank" rel="noopener noreferrer">
              here
            </a>
          </div>
        </div>
      </div>
    : <div style={{ 'backgroundColor': this._interpolateColors('#F1F2F6', '#1e272e', this.state.x / this.state.screenX) }}
            onPointerMove={(e) => this._handleMouseMove(e)}
            className="main_container_loading">
      <ReactLoading color={this._interpolateColors('#5352ed', '#ff4757', this.state.x / this.state.screenX)} height={100} width={100} />
    </div>
  )
}


export default IndexPage
