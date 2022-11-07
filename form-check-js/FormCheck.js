import { EVENT_MAP } from "./config";

export default class FormCheck{
  constructor(el, elClass, {
    formData,
    validators,
    pass,
    fail,
    handleSubmit
  }){
    this.oFormElements = document.querySelector(el).querySelectorAll(elClass);
    this.formData = this.proxyFormData(formData);
    this.validators = validators;
    this.pass = pass;
    this.fail = fail;
    this.handleSubmit = handleSubmit;
    this.result = {};

    this.init(formData);
  }

  // 初始化
  init(formData){
    this.addResult(formData);
    this.bindEvent();
  }

  // 綁定事件
  bindEvent(){
    this.oFormElements.forEach(el => {
      // 對所有input綁定對應事件
      el.addEventListener(EVENT_MAP[el.type], this.setValue.bind(this, el), false)
    });
  }

  // 事件處理函數
  setValue(el){
    const { type, name, value } = el;

    switch(type){
      case 'submit':
        this.handleSubmitClick();
        break;
      case 'checkbox':
        if(this.formData[name].includes(value)){
          this.formData[name] = this.formData[name].filter(item => item !== value);
        }else{
          this.formData[name] = [...this.formData[name], value];
        }
        break;
      default:
        this.formData[name] = value;
        break;    
    }
  }

  // 處理submit事件
  handleSubmitClick(){
    const falseIndex = Object.values(this.result).findIndex(item => !item);

    if(falseIndex !== -1){
      const falseKey = Object.keys(this.result)[falseIndex];
      const { msg } = this.validators[falseKey](this.formData[falseKey]);
      this.fail(falseKey, this.formData[falseKey], msg);
      return;
    }

    this.handleSubmit(JSON.parse(JSON.stringify(this.formData)));
  }

  // 攔截formData資料
  proxyFormData(data){
    return new Proxy(data, {
      get: (obj, key) => {
        return Reflect.get(obj, key);
      },
      set: (obj, key, value) => {
        this.validate(key, value);
        return Reflect.set(obj, key, value);
      }
    });
  }

  // 驗證
  validate(key, value){
    const keyValidator = this.validators[key];
    
    if(keyValidator){
      const { reg, msg } = keyValidator(value);

      if(!reg){
        this.setResult(key, false);
        this.fail(key, value, msg);
        return;
      }  
      
      this.setResult(key, true);
      this.pass(key, value);
    }
  }
 
  // 將所有結果設為false
  addResult(data){
    for(let key in data){
      if(this.validators[key]){
        this.result[key] = false;
      }
    }
  }

  // 設定結果
  setResult(key, bool){
    this.result[key] = bool;
  }

  static create(el, elClass, {
    formData,
    validators,
    pass,
    fail,
    handleSubmit
  }){
    new FormCheck(el, elClass, {
      formData,
      validators,
      pass,
      fail,
      handleSubmit
    });
  }
}