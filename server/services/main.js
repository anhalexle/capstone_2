require('dotenv').config()
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
const Data = require('../model/data')
const connect_to_DB = require('./connect_to_DB')
const compareData = require('./compareData')
const getDateVN = require('./updateDate')
const dataType = ['volt', 'current','frequency','pf','integral_power','instantaneous_power']
const readDataModel = {
    volt : async  () => {
        let mbData = await client.readHoldingRegisters(164,16)
        const {data:modBusData} = mbData
        return modBusData
    },
    current: async () => {
        let mbData = await client.readHoldingRegisters(180,10)
        const {data:modBusData} = mbData
        return modBusData
    },
    frequency: async () => {
        let mbData = await client.readHoldingRegisters(190,4)
        const {data:modBusData} = mbData
        return modBusData
    },
    pf: async () => {
        let mbData = await client.readHoldingRegisters(194,4)
        const {data:modBusData} = mbData
        return modBusData
    },
    integral_power: async () => {
        let mbData1 = await client.readHoldingRegisters(198,2)
        const {data:data1} = mbData1
        let mbData2 = await client.readHoldingRegisters(202,6)
        const {data:data2} = mbData2
        return data1.concat(data2)
    },
    instantaneous_power: async () => {
        let mbData1 = await client.readHoldingRegisters(238,2)
        const {data:data1} = mbData1
        let mbData2 = await client.readHoldingRegisters(242,6)
        const {data:data2} = mbData2
        return data1.concat(data2)
    }
}


const getData = async (type) => {
    try {
        const data = await Data.find({type: type}).sort({address: 'asc','createdAt':'asc'})
        return data
    } catch (err) {
        console.log(err)
    }
}

const createData = async (parameters) => {
    try {
        const newData = await Data.create(parameters)
        console.log({newData});
    } catch(err) {
        console.log(err)
    }
}
const start = async () => {
    try {
        await connect_to_DB();
    }
    catch (err) {
        console.log(err)
    }
}
start()
client.connectRTUBuffered("COM2", {baudRate: 9600});
client.setID(1)

const collectModBusData = async (type) => {
    try {
        return await readDataModel[type]()
    } catch (e) {
        console.log(e)
    }
}

const collectData = async (type) => {
    try {
        let newModBusDataArr = await collectModBusData(type);
        let oldDataArr = await getData(type);
        const addArr = compareData(oldDataArr,newModBusDataArr)
        if (addArr) {
            for (let value of addArr) {
                let newData = {
                    name: value.name,
                    type: value.type,
                    address: value.address,
                    value: value.newData,
                    created_date:getDateVN(),
                }
                await createData(newData);
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}


const main = async () => {
    try {
        for (let type of dataType) {
            await collectData(type)
        }
    }
    catch (err) {
        console.log(err)
    }
}

setInterval(main,5000)






