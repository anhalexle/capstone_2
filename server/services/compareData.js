const splitArr = require('./splitArr')

const unit = {
    'volt': 10,
    'current': 100,
    'frequency': 10,
    'pf': 1000,
    'integral_power': 1000,
    'instantaneous_power': 1000, 
}

const dataLength = {
    'volt': 8,
    'current': 5,
    'frequency': 4,
    'pf': 4,
    'integral_power': 4,
    'instantaneous_power': 4, 
}

const compareData = (oldData, newData) => {
        let addressArr = [];
        if (oldData[0].type !== 'pf' && oldData[0].type !== 'frequency') {
            newData = splitArr(newData);
        }
        if (oldData.length !== dataLength[oldData[0].type]) {
            oldData = oldData.reduce((acc,item,index,arr) => {
                    if (index < arr.length-1) {
                        acc.push(item)
                        if (item.address === arr[index+1].address) {
                            acc.pop(item)
                        }
                    }
                    if (index === arr.length - 2) {
                        if (acc[acc.length-1].address !== arr[arr.length-1].address)
                            acc.push(arr[arr.length-1])
                    }
                    return acc
            },[])
        }
        oldData.forEach((item,index)=> {
            if (item.value !== newData[index]/unit[item.type]) {
                addressArr.push({name: item.name,type: item.type,newData: newData[index]/unit[item.type], address: item.address});
            }
        })
        return addressArr
}

module.exports = compareData;