import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Dropdown from 'react-base-ui/lib/components/Dropdown';
import Input from 'react-base-ui/lib/components/Input';
import Checkbox from 'react-base-ui/lib/components/Checkbox';
import Button from 'react-base-ui/lib/components/Button';
import validate from 'shared/validate/validate';

import './Root.less';

export const fields = ['firstName', 'droplist', 'datepicker','lastName', 'age', 'email', 'sex', 'favoriteColor', 'employed', 'notes'];

const SimpleForm = React.createClass({
  displayName: 'Validation',
  propTypes: {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  },

  render() {

    const data1 = [
                    {text: 'Canada', value: 'can'},
                    {text: 'China', value: 'chs'},
                    {text: 'Japan', value: 'jap'},
                    {text: 'United States of America', value: 'usa'},
                  ];
  const {
          fields: {firstName, droplist, datepicker, lastName,age,email,sex},
          handleSubmit,
          resetForm,
          submitting
        } = this.props;

  return (
          <form onSubmit={handleSubmit(data=>{console.log(data);})}>
              <section className="validation box">
                <div className="content">

                    <div className="">
                      <span className="label label-info" for="eventName"><span className="icon required-icon"></span> First Name</span>
                      <Input  placeholder="First Name" {...firstName}/>
                      {firstName.touched && firstName.error && <div className="error">{firstName.error}</div>}
                    </div>

                    <div className="">
                      <span className="label label-info" for="eventName">Last Name</span>
                      <Input placeholder="Last Name" {...lastName}/>
                    </div>

                    <div className="">
                      <span className="label label-info" for="eventName"><span className="icon required-icon"></span>Age</span>
                      <Input placeholder="Last Name" {...age}/>
                      {age.touched && age.error && <div className="error">{age.error}</div>}
                    </div>

                    <div className="">
                      <span className="label label-info" for="eventName"><span className="icon required-icon"></span>Country</span>
                      <Dropdown  data={data1} placeholder="Choose..." className="aaui-dropdown"  {...droplist}/>
                      {droplist.touched && droplist.error && <div className="error">{droplist.error}</div>}
                    </div>

                    <div className="">
                      <span className="label label-info" for="eventName">Email</span>
                      <Input  placeholder="Email" {...email}/>
                      {email.touched && email.error && <div className="error">{email.error}</div>}
                    </div>
                    <div className="">
                      <span className="label label-info" for="eventName"><span className="icon required-icon"></span>Sex</span>
                      <Checkbox  defaultChecked={true} {...sex}>Male</Checkbox>
                      {sex.touched && sex.error && <div className="error">{sex.error}</div>}
                    </div>

                </div>
                <div className="footer">
                  <Button type="primary" disabled={submitting}>
                    {submitting ? <i/> : <i/>} Submit
                  </Button>
                  <Button type="strong" disabled={submitting} onClick={resetForm}>
                    Clear Values
                  </Button>
                </div>
              </section>
          </form>
    );
  }
});

const p = [
            {
                name: 'firstName',
                rules: ['required', 'min_length'],
                params: {min_length: 5}
            },

            {
                name: 'age',
                rules: ['required', 'integer', 'greater_than'],
                params: {greater_than: 18}
            },

            {
                name: 'email',
                rules: 'valid_email'
            },
            {
                name: 'droplist',
                rules: 'required'
            },
            {
                name: 'datepicker',
                rules: ['required','greater_than_date'],
                params: {greater_than_date: '3/20/2016'}
            },
            {
                name: 'sex',
                rules: 'required'
            }
          ];

const formValidate = values => {
  return validate(p,values);
}

export default reduxForm({
  form: 'simple',
  fields,
  touchOnChange: true,
  validate: formValidate
})(SimpleForm);
