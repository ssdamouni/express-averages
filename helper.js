function convertToNumbers(arr){
        for (let num in arr){
            arr[num] = parseInt(arr[num])
        }
        return arr;
}

function validateNumbers(arr){
    for (let num in arr){
        if(!arr[num]){
            return false;
        }
    }
    return true;
}

function getMean(arr){
    let sum = arr.reduce((a, b) => a + b, 0)
    return sum/arr.length
}

function getMode(arr){
    let counts = {}
    for (let num in arr){
        if(!counts[arr[num]]){
            counts[arr[num]] = 1;
        } else{
            counts[arr[num]] += 1;
        }
    }
    let mode = 0;
    for (let frequency in counts){
        if (mode < counts[frequency]){
            mode = frequency
        }
    }
    return mode;
}

function getmedian(arr){
    let sortedArr = arr.sort();
    let median = sortedArr[Math.round((arr.length - 1) / 2)]
    return median
}

module.exports = {
    convertToNumbers, 
    getMean,
    getMode,
    getmedian,
    validateNumbers
}