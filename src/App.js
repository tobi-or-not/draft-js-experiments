import React from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import './App.css';


import ChordComponent from './decorators/ChordComponent';

function App() {

  const decorators = new CompositeDecorator([
    {
      strategy: chordStrategy,
      component: ChordComponent,
      props: {
        setSelection
      }
    }
  ]);

  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(decorators),
  );

  function chordStrategy(contentBlock, callback, contentState) {
    findWithRegex(/\[.?\]/g, contentBlock, callback);
  };

  function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }


  function setSelection() {
    const selectionState = editorState.getSelection();
    const newSelectionState = selectionState.merge({
      anchorOffset: 3,
      focusOffset: 10
    });

    const newEditorState = EditorState.forceSelection(editorState, newSelectionState);

    setEditorState(newEditorState);
  }

  return (
    <div className="App">
      <button onClick={setSelection}>Set selection</button>
      <h1>Draft.js Experiments</h1>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default App;
