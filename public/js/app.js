console.log('User side js file loaded')

const getWeatherInfo= (city,callback)=>{
fetch('/weather?address='+city).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            callback(data.error, undefined)
        }
        else{
            callback(undefined, data)
        }
       
    })
})
}

const weatherForm= document.querySelector('form');
const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    const msg1 = document.getElementById('msg1')
    const msg2 = document.getElementById('msg2')
    msg1.textContent = 'Loading...'
e.preventDefault()
if(!search.value){
    msg1.textContent = "Please enter city name."
}
else{
    getWeatherInfo(search.value,(error,data)=>{
        if(error){
            msg1.textContent = error
        }
        else{
            msg1.textContent = data.forecast
            msg2.textContent = data.location
        }
    })
}
})