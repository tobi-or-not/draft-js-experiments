import React from 'react';
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js';
import './App.css';

import ChordComponent from './decorators/ChordComponent';

class App extends React.Component {

  constructor(props) {
    super(props);
    const decorators = new CompositeDecorator([
      {
        strategy: this.chordStrategy,
        component: ChordComponent,
        props: {
          setSelection: this.setSelection.bind(this)
        }
      }
    ]);

    const content = ContentState.createFromText("Say [A]and [B] and [C]");
    this.state = { editorState: EditorState.createWithContent(content, decorators) };
    this.onChange = editorState => this.setState({editorState});

    this.updateEditorState = this.updateEditorState.bind(this);
    this.setSelection = this.setSelection.bind(this);
  }

  updateEditorState(newEditorState) {
    this.setState({editorState: newEditorState});
  }

  chordStrategy(contentBlock, callback, contentState) {

    function findWithRegex(regex, contentBlock, callback) {
      const text = contentBlock.getText();
      let matchArr, start;
      while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
      }
    }
    findWithRegex(/\[.?\]/g, contentBlock, callback);
  };



  setSelection(selectionStart, selectionEnd) {
    const selectionState = this.state.editorState.getSelection();
    const newSelectionState = selectionState.merge({
      anchorOffset: selectionStart,
      focusOffset: selectionEnd
    });

    const newEditorState = EditorState.forceSelection(this.state.editorState, newSelectionState);

    this.setState({editorState: newEditorState});
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.setSelection}>Set selection</button>
        <h1>Draft.js Experiments</h1>
        <Editor editorState={this.state.editorState} onChange={this.updateEditorState} />
      </div>
    );
  }
}

export default App;
