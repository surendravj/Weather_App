const express=require('express');

const request=require('request');

const bodyparser=require('body-parser');

const app=express();

const port=process.env.PORT || 5000;

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(__dirname +'/public'));

app.set('view engine','ejs');

var selectcity = 'Hyderbad'
app.post('/', (req, res) => {
    selectcity=req.body.city
    console.log(selectcity)
    res.redirect('/');
})

app.get('/',(req,res)=>{
    var city = selectcity;
    var url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=976101ec8daa4c2e9ac5ab47cc45d33b`;
    request(url,(err,response,body)=>{
        if(err){
            res.redirect('/');
            return
        }
        if(!response){
            console.log('no response');
        }
        var data=JSON.parse(body)
        var usedData=data.data[0];
        var document={
            country:usedData.country_code,
            timeZone:usedData.timezone,
            city:usedData.city_name,
            windSpeed:usedData.wind_spd,
            windDirection:usedData.wind_cdir_full,
            snow:usedData.snow,
            weatherIcon:usedData.weather.icon,
            weatherDescription: usedData.weather.description,
            temp:usedData.temp,
            date: usedData.datetime
        }
        // console.log(document)
        var weatherdata={weather:document}
        res.render('index',weatherdata);
    })
})

app.listen(port,()=>{
    console.log(`server is started at ${port}`);
})


// 976101 ec8daa4c2e9ac5ab47cc45d33b

