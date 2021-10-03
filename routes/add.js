const {Router} = require('express')
const router = Router()
const Car = require('../models/Cars')

router.get('/', async(req, res)=>{
    res.render('add', {
        title:'Add Car',
        isAdd: true,
        
    })
})

router.post('/', async (req, res)=>{

    // const car = new Car(req.body.model, req.body.price, req.body.img)
    const course = new Car({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
    })
    try{
        await course.save()// Saqlayapmiz
        res.redirect('/cars')
    }catch(e){
        console.log(e);
    }

})

module.exports = router