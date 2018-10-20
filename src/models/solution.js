class Solution{

  constructor(solution){
    this.colorsNo = solution.colorsNo;
    this.customers = solution.customers;
  }

  getColorsNo(){
    return this.colorsNo;
  }

  getCustomers() {
    return this.customers;
  }
}

module.exports = Solution;