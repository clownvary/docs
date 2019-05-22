import { connect } from 'react-redux';
import Validation from '../components/Validation';

const mapStateToProps = (state) => {
  // const transaction = state.transaction;
  return {
    // data: transaction.get('data'),
    // total: transaction.get('total')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const validation = connect(mapStateToProps,mapDispatchToProps
  )(Validation);

export default validation;
