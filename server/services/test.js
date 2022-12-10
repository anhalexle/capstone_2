// const a = [];

// console.log(a.length)
// const b = 'hello'
// const a = {
//     hello: async (name) =>  {
//         await console.log(name)
//     }
// }

// a[b]('Alex')

const obj = {
    test2: () => console.log('hello 2'),
    test: () => {console.log('hello')}
}

const {test2} = obj

test2()
