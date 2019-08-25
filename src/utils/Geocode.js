const request=require('request')
	
const geocode=(address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmVva3VydCIsImEiOiJjanh1dDA0MzkweGpmM21wam8wYWdrbTQ4In0.AlHbTeENV5iNx59vL9ZN5g'

request({url:url,json:true},(error,response)=>{
if(error){
	callback('unable to find location. Try another search')
}
else if(response.body.features.length===0){
	callback('unable to find location try another search')
}
else{
	callback(undefined,{
		 latitude:response.body.features[0].center[1],
		 longitude:response.body.features[0].center[0],
		 place:response.body.features[0].place_name
	})
}
})
}


module.exports=geocode