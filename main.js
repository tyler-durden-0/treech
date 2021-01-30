const usersURL = 'https://jsonplaceholder.typicode.com/users'

let baseUsernames = []

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

        //добавляю имена в массив для последующей фильтрации при поиске
        baseUsernames.push(data[iter].username)

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

//переменная в которой будет храниться результат поиска либо его отсутсвие
let find_result

//обрабатываем форму
document.querySelector('.form').addEventListener('submit',(e) => {

    //чтобы форма не отправилась
    e.preventDefault()

    let textFind = document.querySelector('.field').value

    //избегаю ситуации случайного нажатия на Find с пустым
    // запросом(чтобы не показало что ничег не найдено, а ведь никто и не искал)
    if(textFind !== "") {
        //фильтрую базу по условию идентичности введенного с тем что в массиве
        find_result = baseUsernames.filter((item) => {
            return item.toLowerCase() == textFind.toLowerCase()
        })


        let nodes = document.querySelectorAll('.container__item')

        nodes.forEach( (item) => {
            //после долгих попыток все таки получил, с моей точки зрения, эффективный метод удаления узлов
            if(item.innerText.toLowerCase().search(textFind.toLowerCase()) === -1){
                item.remove()
            }
        })

        //На случай того что ничего не найдено
        let spaceAfterSearch = document.querySelector('.container__item')

        if(spaceAfterSearch === null){
            let weDontFind = document.querySelector('.container')

            weDontFind.insertAdjacentHTML('afterbegin',
                '<div style="text-align: center; font-size: 20px; font-weight: bold; font-style: italic; margin-top: 20px;">К великому сожалению мы ничего не нашли</div>\n' +
                '<div style="margin-left:auto;margin-right:auto;margin-top: 20px;width: fit-content;">\n' +
                '  <img src="https://www.meme-arsenal.com/memes/8c46e8ff92c04a1db2ce542b8200d727.jpg" /></div>'
            )
        }


    } else{
        alert('Вы еще ничего не ввели!')
    }
})