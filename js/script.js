/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      'Логан',
      'Лига справедливости',
      'Ла-ла лэнд',
      'Одержимость',
      'Скотт Пилигрим против...',
    ],
  };

  // document.querySelector('.promo__adv').remove();
  // document.querySelector('.promo__genre').textContent = 'драма';
  // document.querySelector('.promo__bg').style.background = 'url(../img/bg.jpg) center center/cover no-repeat';

  const adv = document.querySelectorAll('.promo__adv img');
  const poster = document.querySelector('.promo__bg');
  const genre = poster.querySelector('.promo__genre');
  const movieList = document.querySelector('.promo__interactive-list');
  const addForm = document.querySelector('form.add');
  const addInput = addForm.querySelector('.adding__input');
  const checkBox = addForm.querySelector('[type=checkbox]');
  // 1) Удалить все рекламные блоки со страницы (правая часть сайта)

  const deleteAdv = (arr) => {
    arr.forEach((item) => {
        item.remove();
    });
  }
  deleteAdv(adv);

  const makeChanges = () => {
    // 2) Изменить жанр фильма, поменять "комедия" на "драма"
    genre.textContent = 'Драма';

    // 3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.Реализовать только при помощи JS
    poster.style.background =
      'url(../img/bg.jpg) center center/cover no-repeat';
  }
  makeChanges();

  // 4) Список фильмов на странице сформировать на основании данных из этого JS файла. Отсортировать их по алфавиту
  // 5) Добавить нумерацию выведенных фильмов

  const sortArr = (arr) => {
    arr.sort();
  }



  function createMovieList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);

    films.forEach((film, i) => {
      parent.innerHTML += `
        <li class="promo__interactive-item">
            ${i + 1}. ${film} 
            <div class="delete"></div>
        </li>`;
    });
    // 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
            createMovieList(films, parent);
        })
    });
  }

  createMovieList(movieDB.movies, movieList);


  addForm.addEventListener('submit', (event) => {
    // 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
    // новый фильм добавляется в список. Страница не должна перезагружаться.
    // Новый фильм должен добавляться в movieDB.movies.
    // Для получения доступа к значению input - обращаемся к нему как input.value;
    // P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkBox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        // 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
        newFilm = `${newFilm.substring(0, 22)}...`;
      }

      if(favorite) {
        console.log('Любимый фильм');
      }

      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);

      createMovieList(movieDB.movies, movieList);
    }

    addForm.reset();
  });




});

