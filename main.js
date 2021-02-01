const usersURL = 'https://jsonplaceholder.typicode.com/users'

let baseUsernames = []

function requestUsers(){
    fetch(usersURL).then(response => response.json())
        .then(data => {

            let iter = 0

            const item = document.querySelector('.container')

            //метод перебора массива
            data.forEach( () => {

                item.insertAdjacentHTML('beforeend',
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
}

requestUsers()

//меняю цвет по приколу 
const name1 = document.querySelector('.name')

name1.onclick = () => {
    if(name1.style.color === 'red'){
        name1.style.color = 'black'
    }else{
        name1.style.color = 'red'
    }
}

//переменная в которой будет храниться результат поиска либо его отсутсвие
let find_result

//обрабатываем нажатие на кнопку
document.querySelector('.find_button').addEventListener('click',(e) => {

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
                '<div class="notFoundText">\n' +
                '  <div style="text-align: center; font-size: 20px; font-weight: bold; font-style: italic; margin-top: 20px;">\n' +
                'К великому сожалению мы ничего не нашли</div>\n' +
                '\t<div style="margin-left:auto;margin-right:auto;margin-top: 20px;width: fit-content;">\n' +
                '                <img src="https://i.gifer.com/4qb.gif" />\n' +
                '\t</div>\n' +
                '</div>'
            )

            //удаляю кнопку поиска чтобы исбежать повторной обработки этого же события и появления
            //нескольких кнопок Esc
            document.querySelector('.find_button').remove()

            let weWantBack = document.querySelector('.header')

            weWantBack.insertAdjacentHTML('beforeend','<button type="submit" class="esc_button">Esc</button>')
        }
    } else{
        alert('Вы еще ничего не ввели!')
    }
})

//установил интервал для поиска момента когда появиться кнопка
//а затем добаляю ей слушателя
let findEscInterval = setInterval( () => {
    if (document.querySelector('.esc_button') !== null) {

        //прерываю интервал как только нашел кнопку esc
        //и выполнить то что в call-back функции
        clearInterval(findEscInterval)

        //добавляем слушателя события нажатия на кнопку Esc
        document.querySelector('.esc_button').addEventListener('click', (event) => {
            //удаляю Криминальное чтиво
            document.querySelector('.notFoundText').remove()

            //Удаляю содержимое поля
            document.querySelector('.field').value = ''

            //удаляю кнопку Esc
            document.querySelector('.esc_button').remove()

            //запрашиваю пользователей
            requestUsers()

            //добавляю кнопку поиска
            document.querySelector('.header').insertAdjacentHTML('beforeend',
                '<button type="submit" class="find_button">Find</button>')
        })
    }
}, 500)