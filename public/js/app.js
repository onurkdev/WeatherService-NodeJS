



const weatherForm = document.querySelector('form')
const searchquery = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const location = searchquery.value
    console.log(location)
    message1.textContent="Loading..."
    message2.textContent=""
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
               message1.textContent=data.error
            } else {
                message1.textContent=data.forecastdata.city
                message2.textContent=data.forecast
            }
        })
    })


})