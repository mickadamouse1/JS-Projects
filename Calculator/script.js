var outputScreen = document.getElementById("outputScreen");
var btnNumArr = [btnNum0, btnNum1, btnNum2, btnNum3, btnNum4, btnNum5, btnNum6, btnNum7, btnNum8, btnNum9];
var btnNumObjs = [];

for (var i = 0; i < btnNumArr.length; i++) {
  btnNumArr[i] = document.getElementById("btnNum" + i);
  btnNumObjs[i] = new ButtonNum(i);
  btnNumObjs[i].include();
}

function ButtonNum(num) {
  this.num = num;
  this.include = function() {
    var that = this;
    btnNumArr[this.num].onclick = function() {
      outputScreen.value = outputScreen.value + that.num;
    }
  }
}
