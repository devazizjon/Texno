const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)
class Card{
   static async add(car){
    const card = await Card.fetch()     
    const idx = card.cars.findIndex(c =>c.id === car.id)
    const condidate = card.cars[idx]

    if(condidate){
        // korzinada bor , uni sonini 1ga oshiramiz
        condidate.count++
        card.cars[idx] = condidate
    }else{
        //demak korzinada yoq
        car.count = 1 
        card.cars.push(car)
    }

    card.price += +car.price
    // card.price + = +car.price

    return new Promise ((resolve, reject)=>{
        fs.writeFile(p, JSON.stringify(card), (err)=>{
            if(err){
                reject()
            }else{
                resolve()
            }
        })
    })
}

   static fetch(){ // Korzinadagi malumotlarni oqidi
        return new Promise((resolve, reject)=>{
            fs.readFile(
                p,
                'utf-8',
                (err, connect)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(JSON.parse(connect)) // malumot oqiw
                    }
                })
        })
    }
static async remove(id){
    const card = await Card.fetch() //
    const idx = card.cars.findIndex(c => c.id === id)
    const car = card.cars[idx]

    if(car.count === 1){
        //demak 1ta ochirib karzinadan ochirib yuboramiz 
        card.cars = card.cars.filter(c => c.id !== id)
    }else{

        card.cars[idx].count--
    }
    card.price -= car.price

    return new Promise((resolve, reject)=>{
        fs.writeFile(p, JSON.stringify(card), (err)=>{
            if(err){
                reject(err)
            }else{
                resolve(card)
            }
        })
    })
}
}

module.exports = Card