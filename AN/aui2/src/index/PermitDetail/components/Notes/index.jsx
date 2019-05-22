import PropTypes from 'prop-types';
import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Notes from 'shared/components/Notes';

export default class NotesSection extends UIComponent {

  static propTypes = {
    saveNotes: PropTypes.func.isRequired,
    permitDetailsChanged: PropTypes.func.isRequired
  };

  render() {
    const { notes, saveNotes, permitDetailsChanged } = this.props;

    return (
      <Notes
        {
        ...{
          notes,
          saveNotes,
          permitDetailsChanged
        }}
      />
    );
  }

  componentWillMount() {
    this.props.fetchNotes();
  }
}
