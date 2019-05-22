import React from 'react';
import { connect } from 'react-redux';
import fetchHelpLink from 'shared/actions/helpLink';
import './index.less';

class HelpLink extends React.PureComponent {

  componentDidMount() {
    const { pageName } = this.props;
    this.props.fetchHelpLink(pageName);
  }

  hanldeClick = () => {
    const { helpLink } = this.props;
    /* eslint-disable */
    RH_ShowHelp(0, helpLink.html_file_url, HH_HELP_CONTEXT, helpLink.help_context_id);
    /* eslint-disable */
  }

  render() {
    const { helpLink } = this.props;

    return (
      <div className="help-link">
        {
          helpLink.is_debug_on ?
            (<span>{helpLink.help_file_name}</span>)
          :
            (<div onClick={this.hanldeClick}>
              <span className="help-link__icon">
                <i className="icon icon-question" />
              </span>
              <span>Help</span>
            </div>)
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    helpLink: state.helpLink.get('data')
  }),
  {
    fetchHelpLink
  }
)(HelpLink);

