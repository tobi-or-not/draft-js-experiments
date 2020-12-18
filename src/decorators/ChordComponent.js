import React from 'react';

function ChordComponent(props) {

  const styles = {
    chord: {
      backgroundColor: '#9b9bf9',
      borderRadius: '0.2rem',
      cursor: 'pointer'
    }
  };

  return (
    <span style={styles.chord} onClick={props.setSelection}>
      {props.children}
    </span>
  )
}

export default ChordComponent;
