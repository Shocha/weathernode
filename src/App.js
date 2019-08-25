const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/Geocode')
const forecast=require('./utils/Forecast')


const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const newPath=path.join(__dirname,'./Templates/views')
const partialPath=path.join(__dirname,'./Templates/partials')

app.set('view engine','hbs')
app.set('views',newPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
	res.render('index',{
	title:'Weather',
	name:'Shourja'
})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		title:'Help',
		name:'Shourja',
		helptext:'This is some helptext'
	})
})

app.get('/help/*',(req,res)=>{
	res.render('error',{
		title:'404',
		name:'Shourja',
		errorMessage:'Help article not found'
	})
})


app.get('/about',(req,res)=>{
	res.render('about',{
		title:'About',
		name:'Shourja'
	})
})


app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:'No address found'
		})
	}
	
geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
	if(error){
		return res.send({error})
	}
	
	forecast(latitude,longitude,(error,forecastData)=>{
		if(error){
			return res.send({error})
		}
	

	res.send({
		forecast:forecastData,
		address:req.query.address,
		place:place
	})
})
})
	
// 	res.send({
// 		forecast:'It is raining',
// 		location:'Philadelphia'
// 	})
 })


app.get('/products',(req,res)=>{
	if(!req.query.search){
		return res.send({
			error:'You must provide a search entry'
		})
	}
	
	
	res.send({
		products:[]
	})
})

app.listen(3000,()=>{
	console.log('Server is up on port 3000')
})