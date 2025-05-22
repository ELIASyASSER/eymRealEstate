import prisma from "./lib/prisma.js";
import { faker } from "@faker-js/faker";
const properites = ["appartment","duplix","house","villa"]
const types = ["buy","rent"]
import { ObjectId } from "mongodb";
// const ids = ["67a4b5f6fc23ccf48377e51d"]
const generateRealEstateFakeData =(count = 30)=>{
    let items = []
    for (let i = 0; i < count; i++) {
        items.push({
            title:faker.lorem.words(5),
            price:parseInt(faker.commerce.price({min:30000,max:10000000,dec:0})),
            address:faker.location.streetAddress(),
            city:faker.location.city(),
            bedroom:faker.number.int({min:1,max:10}),
            bathroom:faker.number.int({min:1,max:3}),
            property:faker.helpers.arrayElement(properites),
            latitude:faker.location.latitude({min:20,max:30}),
            longitude:faker.location.longitude({min:20,max:30}),
            images:Array.from({length:4},()=>faker.image.urlPicsumPhotos()),
            type:faker.helpers.arrayElement(types),
            userId:new ObjectId(faker.helpers.arrayElement(["67a4b5f6fc23ccf48377e51d"])),
            postDetail:{
                create:{

                    desc:faker.lorem.paragraphs({min:3,max:6}),
                    utility:faker.helpers.arrayElement(["owner","tenant","shared"]),
                    pet:faker.helpers.arrayElement(["allowed","not-allowed"]),
                    fees:faker.commerce.price({min:100,max:10000,dec:0,symbol:"$"}),
                    size:faker.number.int({min:60,max:600}),
                    school:faker.number.int({min:10,max:10000}),
                    bus:faker.number.int({min:10,max:10000}),
                    restaurant:faker.number.int({min:10,max:10000}),
                }
            }
        })
    }
    return items
}

const seeds = async ()=>{
    try {
        await prisma.postDetail.deleteMany();
        await prisma.post.deleteMany();
        console.log('database cleared ')
        console.log('start seeding')
        const items = generateRealEstateFakeData()
        for (const item of items) {
            await prisma.post.create({data:item})
        }

        console.log("seeding done ")
    } catch (error) {
        console.log('seeding failed')
        console.log(error)
        
    }finally{
        await prisma.$disconnect()
    }
}
seeds()