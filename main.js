const usersURL = 'https://jsonplaceholder.typicode.com/users'

fetch(usersURL).then(response => response.json())
.then(data => {

    let iter = 0

    //метод перебора массива
    data.forEach( () => {
        const item = document.querySelectorAll('.container__item')[iter]

        item.insertAdjacentHTML('afterend',
                '            <div class="container__item">\n' +
                '                <div class="card">\n' +
                '                    <div class="user_name">User</div>\n' +
                '                    <div class="user_bio">Info: </div>\n' +
                '                    <div class="user_posts">Posts: </div>\n' +
                '                </div>\n' +
                '            </div>')

        let userName = document.querySelectorAll('.user_name')[iter]
        userName.innerHTML = data[iter].username
        let userBio = document.querySelectorAll('.user_bio')[iter]
        userBio.innerHTML = data[iter].email
        iter++
    })

    //удаление последней лишней карточки
    let deleteItem = document.querySelectorAll('.container__item')[data.length]
    deleteItem.remove()//работает корректно
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

//обрабатываем форму
your_dirty_history = []

document.querySelector('.form').addEventListener('submit',(e) => {
    //чтобы форма не отправилась
    e.preventDefault()
    let item = document.querySelector('.field').value
    your_dirty_history.push(item)
    console.log(your_dirty_history)
    console.log("Ты ввел:\t\t\t", item)
})
