import React from 'react';
import { findDOMNode } from 'react-dom';
import isArray from 'lodash/isArray';
import UIComponent from 'shared/components/UIComponent';
import Table from 'react-base-ui/lib/components/Table';
import decodeHtmlStr from 'react-base-ui/lib/utils/decodeHtmlStr';
import CollapsePanel from 'react-base-ui/lib/components/CollapsePanel';
import createColResizable from 'react-base-ui/lib/helper/colResizable';
import './index.less';

const renderQuestionCell = (content, row) => {
  const level = row.data.parentQuestionIDs;
  if (level && level.length > 0) {
    return (
      <div
        className="sub-question-icon"
        style={{ paddingLeft: `${(20 * level.length) - 2}px` }}
      >
        <i className="icon icon-moon-new" />
        <p>{decodeHtmlStr(row.data.question)}</p>
      </div>
    );
  }
  return decodeHtmlStr(content);
};

const renderAnswerCell = (content, row) => row.data.answers.map((answer, index) => (
  <div key={`${index}`}>{decodeHtmlStr(answer)}</div>));

export const answerSorter = ({ value: a }, { value: b }) => {
  const sa = isArray(a) && a.length > 0 ? a[0].toLowerCase() : '';
  const sb = isArray(a) && b.length > 0 ? b[0].toLowerCase() : '';
  if (sa < sb) {
    return -1;
  }
  if (sa > sb) {
    return 1;
  }
  return 0;
};

class CustomerQuestionAnswer extends UIComponent {

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  questionAnswerToRows = questionAnswers =>
    questionAnswers.map(qa => ({
      data: qa,
      extraRows: qa.subQuestions.map(q => ({
        data: q,
        className: 'sub-question'
      }))
    }));

  tableProps = (columns, rows) => ({
    sortable: true,
    rowSeperator: true,
    striped: false,
    columns,
    rows,
    className: 'question-table',
    ariaLableExpand: 'Expand detail clickable arrow',
    ariaLableCollapse: 'Collapse detail clickable arrow'
  });

  questionAnswerColumns = [
    { title: 'QUESTION', keyName: 'question', className: 'format-question', render: renderQuestionCell, sorter: true, minWidth: 117 },
    { title: 'ANSWER', keyName: 'answers', className: 'format-answer', render: renderAnswerCell, sorter: answerSorter, minWidth: 95 }
  ];

  toggleState = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { questionAnswers } = this.props;
    const title = 'Custom Questions';
    const ariaLabel = `${title} ${this.state.expanded ? 'collapse' : 'expand'} detail clickable arrow`;
    return (
      <CollapsePanel
        title={title}
        ariaLabel={ariaLabel}
        expanded={this.state.expanded}
        className="section-container question-answer"
        onExpand={() => { createColResizable(findDOMNode(this._refs.table)); this.toggleState(); }}
        onCollapse={this.toggleState}
      >
        <Table
          ref={(t) => { this._refs.table = t; }}
          {
            ...this.tableProps(this.questionAnswerColumns,
              this.questionAnswerToRows(questionAnswers))
          }
        />
      </CollapsePanel>
    );
  }
}

export default CustomerQuestionAnswer;
