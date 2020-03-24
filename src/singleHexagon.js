import React from 'react';
import * as hexHelper from './hexagons.js';

import ReactToolTip from 'react-tooltip';

import hover from './assets/selected.png';
import selectedOverlay from './assets/selected_transparent.png';

class SyncHexagon extends React.Component {
  constructor(props){
    super(props);

    //this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      point : hexHelper.hex_to_pixel(props.layout, props.hexCoords),

      isHovering : false,
      isSelected : props.isSelected,
    };
  }

  //Cannot just have 1 handleMouseHover() and do isHovering : !this.state.isHovering
  //May not update correctly after clicking then moving if you do.
  handleMouseHoverEnter() {
    this.setState({
      isHovering : true
    });
  }

  handleMouseHoverLeave() {
    this.setState({
      isHovering : false
    });
  }

  renderHoverOverlay(){
    if (this.state.isHovering) {
      return <img src={hover} alt="hover"/>
    }
      return
  }

  renderSelectedOverlay(){
    if (this.state.isSelected){
      return <img src={selectedOverlay} alt="select"/>
    }
    return
  }

  //Rebuild tooltip so it captures this changed grid.
  componentDidMount(){
    ReactToolTip.rebuild();
  }

  //Unused
  renderSyncLocks(image){
    if (this.props.syncLevel === 3){
      return (
        <div>
          <div className='syncLocks' style={{left:'19%'}}>
            <img src={this.state.isSelected ? '' : image} alt=''/>
          </div>
          <div className='syncLocks' style={{left:'70%'}}>
            <img src={this.state.isSelected ? '' : image} alt=''/>
          </div>
        </div>
      )
    } else if (this.props.syncLevel === 2){
      return (
        <div className='syncLocks'>
          <img src={this.state.isSelected ? '' : image} alt=''/>
        </div>
      )
    }
    return
  }

  render () {
    const infoSplit = this.props.info.split('<br/>');
    return (
      <div className='singleGrid'
        data-tip = {this.props.info}
        onClick = {() => {this.props.onClick()}}
                          //this.handleClick();}}
        onMouseEnter={() => this.handleMouseHoverEnter()}
        onMouseLeave={() => this.handleMouseHoverLeave()}
        style={
          {transform: `translate(${this.state.point.x+600}px, ${this.state.point.y+600}px)`}
        }
      >
        <div className='singleGridInfo'>
          {
            //infoSplit[0]
          }
        </div>

        <div className='selectedOverlay'>
          {this.renderSelectedOverlay()}
        </div>

        <img src={this.state.isSelected ? this.props.bgSelectedImage : this.props.bgGreyImage } 
          alt="Missing bg"/>

        <div className='boostSymbol show'>
          <img src={this.state.isSelected ? this.props.boostIconGrey : this.props.boostIcon}
           alt={this.props.hexCoords.q + ' , ' + this.props.hexCoords.r} style={{fontSize: 25}}/>
        </div>

        <div className='hoverOverlay'>
          {this.renderHoverOverlay()}
        </div>


      </div>
    );
  }
}

export default SyncHexagon;
