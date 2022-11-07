// 輸入表單初始值
const formData = {
  realname: '',
  age: 0,
  username: '',
  password: '',
  gender: 'male',
  occupation: '',
  hobbies: [],
  intro: ''
}

// 驗證規則(reg)/錯誤提示(msg)
const validators = {
  realname: (value) => ({
    reg: value.length >= 2 && value.length <= 10,
    msg: 'Realname: 2-10'
  }),
  age: (value) => ({
    reg: !isNaN(value) && Number(value) <= 100 && Number(value) > 0,
    msg: 'Age: type number and max 100(min 1)'
  }),
  username: (value) => ({
    reg: value.length >= 6,
    msg: 'Username: min 6'
  }),
  password: (value) => ({
    reg: value.length >= 6,
    msg: 'Password: min 6'
  }),
  gender: null,
  occupation: (value) => ({
    reg: value.length > 0,
    msg: 'Occupation: one must be selected'
  }),
  hobbies: (value) => ({
    reg: value.length > 0,
    msg: 'Hobbies: must select one'
  }),
  intro: (value) => ({
    reg: value.length > 10,
    msg: 'Introduction: min 10'
  })
}

// 所有input對應觸發的事件
const EVENT_MAP = {
  text: 'input',
  password: 'input',
  number: 'input',
  radio: 'click',
  checkbox: 'click',
  textarea: 'input',
  'select-one': 'change',
  submit: 'click'
}

export {
  formData,
  validators,
  EVENT_MAP
}