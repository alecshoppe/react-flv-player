import React, { Component } from 'react';
import flvjs from './flv.min';
import PropTypes from 'prop-types';


class ReactFlvPlayer extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.flvPlayerRef = element => {
      this.flvPlayerRef = element;
    };
   this.flvPlayer = null; 
  }

  componentDidMount() {
    const {type , url, isLive, enableStashBuffer, stashInitialSize, hasAudio, hasVideo, handleError, enableWarning, enableError} = this.props;
    if (flvjs.isSupported()) {
      this.flvPlayer = flvjs.createPlayer({
        type,
        isLive,
        url,
        hasAudio,
        hasVideo
      },{
        enableStashBuffer,
        stashInitialSize
      });
      flvjs.LoggingControl.enableError = false;
      flvjs.LoggingControl.enableWarn = enableWarning;
      this.flvPlayer.attachMediaElement(this.myRef.current);
      this.flvPlayer.load();
      this.flvPlayer.play();
      this.flvPlayer.on('error', (err)=>{
        // console.log(err);
        handleError(err);
      });
    }
  }

  componentWillUnmount() {
    if(this.flvPlayer) this.flvPlayer.destroy(); 
  }

  render() {
    const { height, width, isMuted,showControls } = this.props;
    return (
      <div>
        <video
          controls={showControls}
          muted={{isMuted}}
          ref={this.myRef}
          style={{height, width}}
        />
      </div>
    );
  }
}

ReactFlvPlayer.propTypes = {
  type: PropTypes.string,
  url: PropTypes.string.isRequired,
  isLive: PropTypes.bool,
  showControls: PropTypes.bool,
  hasAudio: PropTypes.bool,
  hasVideo: PropTypes.bool,
  enableStashBuffer: PropTypes.bool,
  stashInitialSize: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  isMuted: PropTypes.bool,
  enableWarning: PropTypes.bool,
  enableError: PropTypes.bool,
  handleError: PropTypes.func
};

ReactFlvPlayer.defaultProps = {
  type: 'flv',
  isLive: true,
  hasAudio: true,
  hasVideo: true,
  showControls: true,
  enableStashBuffer: true,
  stashInitialSize: 128,
  height: '100%',
  width: '100%',
  isMuted: false,
  handleError: (err)=>{console.log(err)},
  enableWarning: false,
  enableError: false
};

export default ReactFlvPlayer;
