let moment = require('moment')

// let date = new Date()
// let months = ['Jan', 'Feb']
// console.log(date.getMonth());


let date = moment();
// MMM returns the month
// YYYY will return the years
// for more setups, view the docs on moment js
date.add(1, 'years')
console.log(date.format('MMM Do, YYYY'))

let createApp = 1234
let date2 = moment(createApp)
console.log(date2.format('h:mma'));


let date3 = moment().valueOf()
console.log(date3);
