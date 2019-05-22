import React from 'react';
import Input from 'src/components/Input';
import { ContentView } from 'src/components/DialogBox';

class AccountView extends ContentView {

  constructor(props) {
    super(props);

    const { name, password } = this.props;

    this.state = {
      name,
      password
    };
  }

  onNameChange(value) {
    const { name, password } = this.state;

    if (name !== value) {
      const newName = value;
      this.setState({
        name: newName,
        error: ''
      });
      this.onChange({
        name: newName,
        password
      });
    }
  }

  onPasswordChange(value) {
    const { name, password } = this.state;

    if (password !== value) {
      const newPsw = value;
      this.setState({
        password: newPsw,
        error: ''
      });
      this.onChange({
        name,
        password: newPsw
      });
    }
  }

  getData() {
    const { name, password } = this.state;
    return {
      name, password
    };
  }

  onConfirm(data) {
    alert(JSON.stringify(data));
  }

  update(props) {
    const { error } = props;
    if (error) {
      this.setState({
        error
      });
    }
  }

  render() {
    const { name, password, error } = this.state;

    return (
      <div>
        {error && (<h2>{error}</h2>)}
        <div style={{ marginBottom: '10px' }} className="row row-align-center">
          <span style={{ width: '100px' }}>Name:</span>
          <Input
            defaultValue={name}
            onChange={e => this.onNameChange(e.target.value)}
          />
        </div>
        <div className="row row-align-center">
          <span style={{ width: '100px' }}>Password:</span>
          <Input
            type="password"
            defaultValue={password}
            onChange={e => this.onPasswordChange(e.target.value)}
          />
        </div>
      </div>
    );
  }
}


export default AccountView;
