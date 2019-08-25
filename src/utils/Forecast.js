const request=require('request')

const forecast=(latitude,longitude,callback)=>{
const url='https://api.darksky.net/forecast/9ad2f09a1a6d21377796e7d50c1b04da/'+latitude+','+longitude

request({url:url,json:true},(error,response)=>{
if(error){
	callback('unable to connect to weather services',undefined)
}
else if(response.body.error){
	callback('unable to fetch. Please try again',undefined)
}
else{
	callback(undefined, response.body.daily.data[0].summary+' It is currently ' +response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+'% chance of rain')
}
})

}
module.exports=forecast