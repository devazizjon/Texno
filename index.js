const express = require ('express')
const path = require ('path')
const mongoose = require('mongoose')
const exhbs = require ('express-handlebars')



// routes 
const homeRouter = require('./routes/home')
const carRouter = require('./routes/cars')
const addRouter = require('./routes/add')
const cardRouter = require('./routes/card')
const app = express()


// hbs ulash jarayoni
const hbs = exhbs.create({
    defaultLayout:'main',
    extname:'hbs',
    runtimeOptions:{
        allowProtoMethodsByDefault:true,
        allowProtoPropertiesByDefault:true
    }
})

app.engine('hbs', hbs.engine) // Ro'yhatdan o'tkazdik
app.set('view engine', 'hbs')   // Texnologiyasini aytdik
app.set('views', 'views') // ikkinchi parametr bu papka nomi

// Pablic ulash jarayoni
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

//post methodni registr qildik


app.use('/', homeRouter)
app.use('/cars', carRouter)
app.use('/add', addRouter)
app.use('/card', cardRouter)

const port = process.env.PORT || 3000

async function start (){
    try{
        const uri = 'mongodb+srv://yoldoshev:Pt6Uuo1lKP9bXRvA@cluster0.uccek.mongodb.net/shop'
        await mongoose.connect(uri, {
            useNewUrlParser: true,
        })
    
        app.listen(port, ()=>{
        console.log(`Express working on ${port} port`);
    })
    }catch(e){
        console.log(e);
    }

}
start()


