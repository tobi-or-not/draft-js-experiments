import React from 'react';

class ChordComponent extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.styles = {
      chord: {
        backgroundColor: '#9b9bf9',
        borderRadius: '0.2rem',
        cursor: 'pointer'
      }
    };

  }

  handleClick() {
    this.props.setSelection(
      this.props.start,
      this.props.end,
      this.props.blockKey
    );
  }

  render() {
    return (
      <span style={this.styles.chord} onMouseDown={this.handleClick.bind(this)}>
        {this.props.children}
      </span>
    )
  }

}

export default ChordComponent;
