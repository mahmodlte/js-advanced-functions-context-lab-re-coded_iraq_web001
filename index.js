/* Your Code Here */
let createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};
let createEmployeeRecords = (array) => {
  return array.map((record) => {
    return createEmployeeRecord(record);
  });
};
let createTimeInEvent = function (str) {
  let [date, hour] = str.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: Number(hour),
    date: date,
  });
  return this;
};
let createTimeOutEvent = function (str) {
  let [date, hour] = str.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return this;
};
let hoursWorkedOnDate = function (dateString) {
  let timeInHour = this.timeInEvents.find(function (element) {
    return element.date === dateString;
  }).hour;
  let timeOutHour = this.timeOutEvents.find(function (element) {
    return element.date === dateString;
  }).hour;
  return (timeOutHour - timeInHour) / 100;
};
const wagesEarnedOnDate = function (dateStr) {
  let result = hoursWorkedOnDate.call(this, dateStr) * this.payPerHour;
  return result;
};
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
function findEmployeeByFirstName(srcArray, firstName) {
  let finder = srcArray.find((info) => {
    if (info.firstName.startsWith(firstName)) {
      return info.firstName;
    }
  });
  return finder;
}
const calculatePayroll = (arr) => {
  return arr.reduce((accu, current) => {
    return accu + allWagesFor.call(current);
  }, 0);
};
