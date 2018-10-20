class Preference{

  constructor(color, finish){
    this.color = color;
    this.finish = finish;
    this.unique = false;
  }

  getColor(){
    return this.color;
  }

  getFinish() {
    return this.finish;
  }

  getUnique() {
    return this.unique;
  }

  setColor(color){
    return this.color = color;
  }

  setFinish(finish) {
    return this.finish = finish;
  }

  setUnique(unique){
    this.unique = unique;
  }
}

module.exports = Preference;