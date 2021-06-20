const express = require('express');
const morgan = require('morgan')
const app = express();
const ExpressError = require('./expressError');

const {convertToNumbers, getMean, getMode, getmedian, validateNumbers} = require('./helper')

app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true}));

app.get('/mean', (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('Your url must be formated as localhost:3000/mean?nums=1,2,3.', 400)
    }
    const numsQuery = req.query.nums.split(',');
    let nums = convertToNumbers(numsQuery)
    if (!validateNumbers(nums)){
        throw new ExpressError('Nums must be set to numbers', 400)
    }
    let mean = getMean(nums)
    let response = {
        operation: "mean",
        value: mean
    }
    res.json(response)
    console.log(nums)
})

app.get('/median', (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('Your url must be formated as localhost:3000/median?nums=1,2,3.', 400)
    }
    const numsQuery = req.query.nums.split(',');
    let nums = convertToNumbers(numsQuery)
    if (!validateNumbers(nums)){
        throw new ExpressError('Nums must be set to numbers', 400)
    }
    let median = getmedian(nums)
    let response = {
        operation: "median",
        value: median
    }
    res.json(response)
})

app.get('/mode', (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('Your url must be formated as localhost:3000/mode?nums=1,2,3.', 400)
      }
    const numsQuery = req.query.nums.split(',');
    let nums = convertToNumbers(numsQuery)
    if (!validateNumbers(nums)){
        throw new ExpressError('Nums must be set to numbers', 400)
    }
    let mode = getMode(nums)
    let response = {
        operation: "mode",
        value: mode
    }
    res.json(response)
})

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
    return next(err);
  });
  
 
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });

app.listen(3000, function(){
    console.log('app on port 3000')
})