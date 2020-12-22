import React from 'react';

function ChordComponent(props) {

  const styles = {
    chord: {
      backgroundColor: '#9b9bf9',
      borderRadius: '0.2rem',
      cursor: 'pointer'
    }
  };


  function handleClick() {
    props.setSelection(
      props.start,
      props.end,
      props.blockKey
    );
  }

  return (
    <span style={styles.chord} onMouseDown={handleClick}>
      {props.children}
    </span>
  )

}

export default ChordComponent;
