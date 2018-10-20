class Request{

  constructor(colorsNo, customerPreferences){
    this.colorsNo = colorsNo;
    this.customerPreferences = customerPreferences;
  }

  getColorsNo(){
    return this.colorsNo;
  }

  getCustomerPreferences() {
    return this.customerPreferences;
  }
}

module.exports = Request;