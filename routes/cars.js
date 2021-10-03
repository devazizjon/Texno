const {Router} = require('express')
const router = Router()
const Car = require('../models/Cars')
const { route } = require('./card')

router.get('/', async (req, res)=>{
    const cars = await Car.find() // ma`lumotlar massiv
    res.render('cars', {
        title:'Car models',
        isCars: true,
        cars
    })
})

router.get('/:id/edit', async(req, res)=>{
    if(!req.query.allow){
        res.redirect('/')
    }
        const car = await Car.findById(req.params.id);
        res.render('car-edit', {
            title:`Car model ${car.title}`,
            car
            
        })
})

router.get('/:id', async(req, res)=>{
    const car = await Car.findById(req.params.id);
    res.render('car', {
        layout:'empty',
        title:`Car model ${car.title}`,
        car
    })
})

router.post('/edit', async (req, res)=>{
    const {id} = req.body
    delete req.body.id 
    await Car.findByIdAndUpdate(id, req.body)
    res.redirect('/cars')
})
router.post('/remove',async (req, res)=>{
    try{
          await Car.deleteOne({id: req.body.id})
          res.redirect('/cars')
    }catch(e){
        console.log(e);
    }
  
})

module.exports = router