const path = require('path');
const fs = require('fs')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  var callback = this.async();

  // 对源文件在开始添加作者信息
  var headerPath = path.resolve(__dirname, './header.js');
  this.addDependency(headerPath);

  fs.readFile(headerPath, 'utf-8', function (err, header) {
    if (err) return callback(err);

    header = header.replace(/\[name\]/g, options.name)
    header = header.replace(/\[time\]/g, getNowFormatDate())
    source = header + "\n" + source
    console.log(source)
    callback(null, source);
  });
};


function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    " " + date.getHours() + seperator2 + date.getMinutes() +
    seperator2 + date.getSeconds();
  return currentdate;
}