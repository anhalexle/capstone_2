const splitArr = (arr) => {
    const result = [];
    for (let index in arr) {
        if (index % 2 === 0)
            result.push(arr[index])
    }
    return result
}

module.exports = splitArr;