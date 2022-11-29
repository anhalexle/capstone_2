// const a = [];

// console.log(a.length)
// const b = 'hello'
// const a = {
//     hello: async (name) =>  {
//         await console.log(name)
//     }
// }

// a[b]('Alex')


let a = [1,2,3,4,5]

a = a.reduce((acc,data)=> {
	acc.push(data)
},[])

console.log(a)