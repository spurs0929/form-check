import FormCheck from './FormCheck';
import { formData, validators } from './config';

FormCheck.create('#userForm', '.user-form', {
  formData,
  validators,
  pass(key, value){
    console.log('pass: ', key, value);
  },
  fail(key, value, error){
    console.log('fail: ', key, value, error);
  },
  handleSubmit(formData){
    console.log(formData);
  }
});
