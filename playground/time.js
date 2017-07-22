var moment = require('moment');

//  jan 1st 1970 00:00:00 am
// -1000 milliseconds, 1 second, always use milliseconds

//var date = new Date();
//var months = ['Jan', 'Feb']
//console.log(date.getMonth());

//var date = moment();
//date.add(1, 'year');
//console.log(date.format('MMM Do, YYYY'));

//moment().valueOf();
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('k:mm'))