const DATA_URL = 'https://api.jsonbin.io/v3/b/64e719138e4aa6225ed49281';
const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
fetch(DATA_URL)
    .then(response => response.json())
    .then(data => {
        const body = document.querySelector('body');
        body.innerHTML = `<header> 
        <h1 id = 'top'>Резюме студента</h1>        
    </header>
    <main class = "center">
        <div class = "hobby">
            <strong style = "margin-left: 50px;">Мои хобби:</strong>
        </div>
        <div class = "game">
            <strong style = "margin-left: 50px;">Мои любимые игры:</strong>
            <table>
                <tr>
                    <th>Игра</th>
                    <th>Кол-во часов</th>
                    <th>Оценка</th>
                    <th>Стаж</th>   
                </tr>
                <td colspan="4"><hr></td>         
            </table>
        </div>
        <footer>
            <form>
                <h2>Связаться со мной</h2>
                <table>
                    <tr>
                        <td id = 'name'>
                            <label>Ваше имя:<br></label>
                            <input class = "input inputName" type = "text" placeholder = "Введите ваше имя">
                        </td>
                        <td id = 'mail'>
                            <label>Ваш email:<br></label>
                            <input class = "input inputMail" type = "text" placeholder = "Введите ваш email">
                        </td>
                    </tr>            
                </table>            
                <div class="message"> 
                    <label>Ваше сообщение:<br></label>               
                    <textarea class = "inputMessage" placeholder="Введите ваше сообщение:" style="resize: none;"></textarea>
                </div>
                <a href="#top" class="scrollup"><input class = "button" type="submit" value="Отправить"></a>
            </form>
        </footer>
    </main>`;
        data = data.record;
        const main = body.querySelector('.center');
        // Таблица
        const tableAboutMe = document.createElement('table');
        tableAboutMe.className = 'head';
        // Строка
        const trAboutMe = document.createElement('tr');
        // Левая колонка
            // Аватарка
        const firstTdAboutMe = document.createElement('td');
        firstTdAboutMe.style = 'text-align: center;';
        const divAvatar = document.createElement('div');
        divAvatar.className = 'sqr';
        const avatar = document.createElement('img');
        avatar.src = data.infoAboutMe.image;
        avatar.style = 'border-radius: 50%; height: 80%; width: 80%';
        const br = document.createElement('br');
            // Контакты
        const vkRef = document.createElement('a');
        vkRef.href = data.contacts.VK;
        vkRef.target = "_blank";
        const vkImg = document.createElement('img');
        vkImg.src = data.socialPicture.VK;
        const instRef = document.createElement('a');
        instRef.href = data.contacts.INST;
        instRef.target = "_blank";
        const instImg = document.createElement('img');
        instImg.src = data.socialPicture.INST;
        const tgRef = document.createElement('a');
        tgRef.href = data.contacts.TG;
        tgRef.target = "_blank";
        const tgImg = document.createElement('img');
        tgImg.className = "ThirdElement";
        tgImg.src = data.socialPicture.TG;
        tgImg.style = "height: 40px; weight: 40px";
        const mailRef = document.createElement('a');
        mailRef.href = data.contacts.MAIL;
        mailRef.target = "_blank";
        const mailImg = document.createElement('img');
        mailImg.className = "ForthElement";
        mailImg.src = data.socialPicture.MAIL;
        mailImg.style = "height: 40px; weight: 40px";
        // Правая колонка
        const secondTdAboutMe = document.createElement('td');
        secondTdAboutMe.className = 'RightColumn';
            // ФИО
        const h4FIO = document.createElement('h4');
        h4FIO.innerHTML = 'ФИО';
        const pFIO = document.createElement('p');
        pFIO.textContent = data.infoAboutMe.name;
            // Возраст
        const h4Age = document.createElement('h4');
        h4Age.textContent = 'Возраст';
        const pAge = document.createElement('p');
        if(new Date(Date.now()).getMonth() >= new Date(data.infoAboutMe.age).getMonth() && new Date(Date.now()).getDate() >= new Date(data.infoAboutMe.age).getDate()){
            pAge.textContent = `${new Date(Date.now()).getFullYear() - new Date(data.infoAboutMe.age).getFullYear()} лет`;
        }
        else{
            pAge.textContent = `${new Date(Date.now()).getFullYear() - new Date(data.infoAboutMe.age).getFullYear() - 1} лет`;
        }
            // Обо мне
        const h4About = document.createElement('h4');
        h4About.textContent = 'О себе:';
        const pAbout = document.createElement('p');
        pAbout.textContent = `${data.infoAboutMe.about}`;
        pAbout.style = "text-align: justify;";
        // Добавление всех элементов левой колонки в таблицу
        divAvatar.append(avatar);
        divAvatar.append(br);
        vkRef.append(vkImg);
        instRef.append(instImg);
        tgRef.append(tgImg);
        mailRef.append(mailImg);
        firstTdAboutMe.append(divAvatar);
        firstTdAboutMe.append(vkRef);
        firstTdAboutMe.append(instRef);
        firstTdAboutMe.append(tgRef);
        firstTdAboutMe.append(mailRef);
        // Добавление всех элементов правой колонки в таблицу
        secondTdAboutMe.append(h4FIO);
        secondTdAboutMe.append(pFIO);
        secondTdAboutMe.append(h4Age);
        secondTdAboutMe.append(pAge);
        secondTdAboutMe.append(h4About);
        secondTdAboutMe.append(pAbout);
        // Формирование таблицы
        trAboutMe.append(firstTdAboutMe);
        trAboutMe.append(secondTdAboutMe);
        tableAboutMe.append(trAboutMe);
        // Перенос таблицы в HTML
        main.prepend(tableAboutMe);
        
        // Блок Хобби 
        const hobby = main.querySelector('.hobby')
        const listHobby = document.createElement('ol');
        
        for(let i = 0; i < data.hobby.length; i++){
            const element = document.createElement('li');
            element.innerText = data.hobby[i];
            listHobby.append(element);
        }
        hobby.append(listHobby);
        
        // Блок Игры
        const game = main.querySelector('.game');
        const tableGame = game.querySelector('table')
        for(let i = 0; i < data.game.length; i++){
            const row = document.createElement('tr');
            const gameColumn = document.createElement('td');
            const hourColumn = document.createElement('td');
            const markColumn = document.createElement('td');
            const timeColumn = document.createElement('td');   
            const ref = document.createElement('a');
            ref.href = data.game[i].ref;
            ref.target = "_blank";
            ref.innerText = data.game[i].game;
            gameColumn.append(ref);
            hourColumn.innerText = data.game[i].hour; 
            markColumn.innerText = `${data.game[i].mark}/10`;
            if(data.game[i].endTime === null){
                timeColumn.innerText = `${new Date(data.game[i].startTime).getFullYear()}-now`; 
            }
            else{
                timeColumn.innerText = `${new Date(data.game[i].startTime).getFullYear()}-${new Date(data.game[i].endTime).getFullYear()}`; 
            }
            row.append(gameColumn);
            row.append(hourColumn);
            row.append(markColumn);
            row.append(timeColumn);
        
            tableGame.append(row);
        }

        // Валидация

        const inputName = document.querySelector('.inputName');
        const inputMail = document.querySelector('.inputMail');
        const inputMessage = document.querySelector('.inputMessage');

        inputName.addEventListener('input', event => {                
            const isSpan = document.querySelector('#errorName');
                if(event.target.value.length < 4){
                    if(!isSpan){
                        const input = document.querySelector('#name');
                        const error = document.createElement('p');                        
                        error.id = 'errorName';
                        error.innerText = 'error';
                        input.append(error);
                        event.target.classList.add('error');
                    }
                }
                else{
                    if(isSpan){
                        isSpan.remove();
                        event.target.classList.remove('error');
                    }
                }  
        });

        inputMail.addEventListener('input', event => {                
            const isSpan = document.querySelector('#errorMail');
                if(!regEmail.test(event.target.value.trim())){
                    if(!isSpan){
                        const input = document.querySelector('#mail');
                        const error = document.createElement('p');                        
                        error.id = 'errorMail';
                        error.innerText = 'error';
                        input.append(error);
                        event.target.classList.add('error');
                    }
                }
                else{
                    if(isSpan){
                        isSpan.remove();
                        event.target.classList.remove('error');
                    }
                }  
        })

        inputMessage.addEventListener('input', event => {                
            const isSpan = document.querySelector('#errorMessage');
                if(event.target.value.length < 10){
                    if(!isSpan){
                        const input = document.querySelector('.message');
                        const error = document.createElement('p');                        
                        error.id = 'errorMessage';
                        error.innerText = 'error';
                        input.append(error);
                        event.target.classList.add('error');
                    }
                }
                else{
                    if(isSpan){
                        isSpan.remove();
                        event.target.classList.remove('error');
                    }
                }  
        })
        
        // Вывод сообщения об отправке
        const sendMessage = document.querySelector('.button');
        sendMessage.addEventListener('click', (event) => {
            event.preventDefault();
        
            const label = document.createElement('label');
            const header = document.querySelector('header');
            label.className = 'messageBox';
            header.prepend(label);
            const inputName = document.querySelector('.inputName').value;
            const inputMail = document.querySelector('.inputMail').value;
            const inputMessage = document.querySelector('.inputMessage').value;
            
            if(inputName.length > 3 && regEmail.test(inputMail) && inputMessage.length > 10){
                label.innerText = `${inputName}, вы получите ответ на ${inputMail}`;
                window.scrollTo({ top: 0, behavior: 'smooth' });
        
                setTimeout(() => {
                    document.querySelector('.messageBox').style.display = 'none';
                }, 5000);
            }
            else{
                alert('Не все поля заполнены!');        
                header.removeChild(label);
            }
        })
    })

