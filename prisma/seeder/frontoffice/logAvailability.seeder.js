const { prisma } = require("../config");

const logAvail = [
    {
        roomHistory: {
            room_1: "Septian", 
            room_2: "Septian Nugroho", 
            room_3: 0, 
            room_4: 0, 
            room_5: "Bagas", 
            room_6: "Septian", 
            room_7: "Septian", 
            room_8: "Septian", 
            room_9: "Septian", 
            room_10: "Septian", 
        },
        created_at: new Date(),
        updated_at: new Date(),
    }
]

async function LogAvailability() {
    for (let log of logAvail) {
        await prisma.logAvailability.create({
            data: log
        });
    }
}

module.exports = { LogAvailability }