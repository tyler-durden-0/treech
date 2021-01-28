const usersURL = 'https://jsonplaceholder.typicode.com/users'

fetch(usersURL).then(response => response.json())
.then(data => {
    //клонирование необходимого узла из DOM
    const item = document.querySelector('.container__item')

    for(let iter = 0; iter < 9; iter++){
        clone = item.cloneNode(true)
        //Вставка после item
        item.after(clone)
    }

    for(let iter = 0 ; iter < data.length; iter++)
    {
        let userName = document.querySelectorAll('.user_name')[iter]
        userName.innerHTML = data[iter].username
    }

    console.log(data)
})

//меняю цвет по приколу 
const name1 = document.querySelector('.name')

name1.onclick = () => {
    if(name1.style.color === 'black'){
        name1.style.color = 'red'
    }else{
        name1.style.color = 'black'
    }
}

//меняю DOM(пример)
let userName = document.querySelector('.user_name')
let userBio = document.querySelector('.user_bio')
let userPosts = document.querySelector('.user_posts')
userName.innerHTML = 'Ivan'
userBio.innerHTML = "<strong>HI!</strong> I'm 19"
userPosts.innerHTML = 'I have 10 <strong>amasing</strong> POSTS!!!'


//метод поиска подходящего блока
//userName = document.querySelectorAll('.user_name')[1]
//userName.innerHTML = 'Vladimir'


//клонирование необходимого узла из DOM
// const item = document.querySelector('.container__item')

// for(let iter = 0; iter < 10; iter++){
//     clone = item.cloneNode(true)
//     //Вставка после item
//     item.after(clone)
// }