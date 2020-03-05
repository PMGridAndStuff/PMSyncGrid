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
      //Used by hover to determine what to render
      info : props.info,
      syncLevel: props.syncLevel,

      gridNumber : props.gridNumber,
      layout : props.layout,
      coords : props.hexCoords,
      point : hexHelper.hex_to_pixel(props.layout, props.hexCoords),

      bgSelectedImage: props.bgSelectedImage,
      bgGreyImage : props.bgGreyImage,

      boostIcon : props.boostIcon,
      boostIconGrey: props.boostIconGrey,

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

  handleClick() {
    this.setState({
      isSelected : !this.state.isSelected
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
    return (
      <div className='singleGrid'
        data-tip = {this.state.info}
        onClick = {() => {this.props.onClick();
                          this.handleClick();}}
        onMouseEnter={() => this.handleMouseHoverEnter()}
        onMouseLeave={() => this.handleMouseHoverLeave()}
        style={
          {transform: `translate(${this.state.point.x}px, ${this.state.point.y}px)`}
        }
      >
        <div className='selectedOverlay'>
          {this.renderSelectedOverlay()}
        </div>

        <img src={this.state.isSelected ? this.state.bgSelectedImage : this.state.bgGreyImage } 
          alt="Missing bg"/>

        <div className='boostSymbol'>
          <img src={this.state.isSelected ? this.state.boostIconGrey : this.state.boostIcon}
           alt={this.state.coords.q + ' , ' + this.state.coords.r} style={{fontSize: 25}}/>
        </div>

        <div className='hoverOverlay'>
          {this.renderHoverOverlay()}
        </div>


      </div>
    );
  }
}

export default SyncHexagon;
