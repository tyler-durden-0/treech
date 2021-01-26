const usersURL = 'https://jsonplaceholder.typicode.com/users'

fetch(usersURL).then(response => response.json()).then(data => console.log(data))

const name1 = document.getElementById('name')

name1.onclick = () => {
    if(name1.style.color === 'black'){
        name1.style.color = 'red'
    }else{
        name1.style.color = 'black'
    }
}