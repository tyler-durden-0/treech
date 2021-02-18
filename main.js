const usersURL = 'https://jsonplaceholder.typicode.com/users'
const postsURL = 'https://jsonplaceholder.typicode.com/posts'
const commentsURL = 'https://jsonplaceholder.typicode.com/comments'

let FLAG = 0

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
                    `                <div class="card">\n` +
                    '                    <div class="user_name">User</div>\n' +
                    '                    <div class="user_bio">Info: </div>\n' +
                    '                    <div class="user_albums">Albums: <a class="albums_ref" href="">See albums</a></div>\n' +
                    `                    <div class="user_posts">Posts: <a class="posts_ref" href="" data-userid=${data[iter].id}>See posts</a></div>\n` +
                    '                </div>\n' +
                    '            </div>')
                //добавляю имена в массив для последующей фильтрации при поиске
                baseUsernames.push(data[iter].username)

                const userName = document.querySelectorAll('.user_name')[iter]
                userName.innerHTML = data[iter].username
                const userBio = document.querySelectorAll('.user_bio')[iter]
                userBio.innerHTML = data[iter].email
                iter++
            })

        }
    )
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

function clickOnButtonFind() {
    //обрабатываем нажатие на кнопку
    document.querySelector('.find_button').addEventListener('click',(e) => {

        const textFind = document.querySelector('.field').value

        //избегаю ситуации случайного нажатия на Find с пустым
        // запросом(чтобы не показало что ничег не найдено, а ведь никто и не искал)
        if(textFind !== "") {

            const nodes = document.querySelectorAll('.container__item')

            nodes.forEach( (item) => {
                //после долгих попыток все таки получил, с моей точки зрения, эффективный метод удаления узлов
                if(item.innerText.toLowerCase().search(textFind.toLowerCase()) === -1){
                    item.remove()
                }
            })

            //На случай того что ничего не найдено
            const spaceAfterSearch = document.querySelector('.container__item')

            if(spaceAfterSearch === null){

                const weDontFind = document.querySelector('.container')

                weDontFind.insertAdjacentHTML('afterbegin',
                    '<div class="notFoundText">\n' +
                    '  <div style="text-align: center; font-size: 20px; font-weight: bold; font-style: italic; margin-top: 20px;">\n' +
                    `К великому сожалению, по Вашему запросу "<strong>${textFind}</strong>", мы ничего не нашли</div>\n` +
                    '\t<div style="margin-left:auto;margin-right:auto;margin-top: 20px;width: fit-content;">\n' +
                    '                <img src="https://i.gifer.com/4qb.gif" />\n' +
                    '\t</div>\n' +
                    '</div>'
                )

                //удаляю кнопку поиска чтобы исбежать повторной обработки этого же события и появления
                //нескольких кнопок Esc
                document.querySelector('.find_button').remove()

                //после удаления кнопки ОПУСКАЮ флаг (0)
                FLAG--

                const weWantBack = document.querySelector('.header')

                weWantBack.insertAdjacentHTML('beforeend','<button type="submit" class="esc_button">Esc</button>')
            }
        } else{
            alert('Вы еще ничего не ввели!')
        }
    })
}

function clickOnButtonEsc() {

    //добавляем слушателя события нажатия на кнопку Esc
    document.querySelector('.esc_button').addEventListener('click', (event) => {
        //удаляю Криминальное чтиво
        document.querySelector('.notFoundText').remove()

        //Удаляю содержимое поля
        document.querySelector('.field').value = ''

        //удаляю кнопку Esc
        document.querySelector('.esc_button').remove()
        //после удаления кнопки ОПУСКАЮ флаг (0)
        FLAG--

        //запрашиваю пользователей
        requestUsers()

        //добавляю кнопку поиска
        document.querySelector('.header').insertAdjacentHTML('beforeend', '<button type="submit" class="find_button">Find</button>')
    })
}

//ОЧЕНЬ ВАЖНО!!!!
//установил интервал для поиска момента когда появяться кнопки
//а затем добаляю им слушателя и глвное условие по одному разу
let findEscInterval = setInterval( () => {
    if (document.querySelector('.esc_button') !== null && FLAG === 0) {
        //НАЖАЛ НА КНОПКУ - ПОДНЯЛ ФЛАГ
        FLAG++
        clickOnButtonEsc()
        document.querySelector('.esc_button').removeEventListener('click', clickOnButtonEsc)
    }
    if(document.querySelector('.find_button') !== null && FLAG === 0){
        //НАЖАЛ НА КНОПКУ - ПОДНЯЛ ФЛАГ
        FLAG++
        clickOnButtonFind()
        document.querySelector('.find_button').removeEventListener('click', clickOnButtonFind)
    }

}, 500)

var numberOfUser
document.querySelector('.main').addEventListener('click', (event) => {
    //отменяю дефолтное поведение
    event.preventDefault()

    if(event.target.dataset.userid !== undefined){
        numberOfUser = event.target.dataset.userid
        console.log(numberOfUser)
        document.querySelector('.header').remove()
        document.querySelector('.container').remove()
        document.querySelector('.body').insertAdjacentHTML('afterbegin',
       '<nav>\n' +
            '    <a href="file:///D:/JS/Wall/index.html">Back home</a>\n' +
            '</nav>\n'
       )

        //обрабатываю данные с запроса по юзеру
        fetch(postsURL+`?userId=${numberOfUser}`).then(response => response.json()).then(data => {

            let iter = 0

            const item = document.querySelector('.main')
            item.classList.add("posts")

            data.forEach( () => {

                item.insertAdjacentHTML('beforeend',
                    '    <div class="post_item">\n' +
                    '        <div class="post_title"></div>\n' +
                    '        <div class="post_content"></div>\n' +
                    '        <div class="comments_prev">\n' +
                    `            <a href="#" data-comments=${data[iter].id} data-number="${iter}">See comments:</a>\n` +
                    '        </div>\n' +
                    '    </div>\n'
                )

                const postTitle = document.querySelectorAll('.post_title')[iter]
                postTitle.innerHTML = data[iter].title
                const postContent = document.querySelectorAll('.post_content')[iter]
                postContent.innerHTML = data[iter].body
                iter++
               }
            )
        })
    } else if(event.target.dataset.comments !== undefined) {
        fetch(commentsURL + `?postId=${event.target.dataset.comments}`).then(response => response.json()).then(data => {

            const item = document.querySelectorAll('.comments_prev a')[event.target.dataset.number]
            item.style.display= 'none'

            const place_for_comments = document.querySelectorAll('.comments_prev')[event.target.dataset.number]
            data.forEach(el => {
                place_for_comments.insertAdjacentHTML('beforeend',`<div class="comment">${el.body}</div>`)
            })
        })
    }
})