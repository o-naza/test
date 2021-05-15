(function () {

  // Максимальное количество видов (моделей, разновидностей, цветов и т.п.) товара в одном заказе
  var maxKinds = 1;

  // Максимальное количество товара одного вида в заказе
  var maxItems = 1;

  // Список имён "покупателей". В зависимости от оффера можно делать упор на те или иные национальности ;-)
  var names = {
    men: ['Игорь', 'Владимир', 'Антон'],
    women: ['Надежда', 'Эмилия', 'Валентина', 'Софья', 'Анна', 'Анастасия', 'Евгения', 'Нина', 'Екатерина', 'Виктория',
       'Мария', 'Кристина', 'Диана', 'Яна', 'Светлана', 'Алина', 'Наталья', 'Василиса', 'Дарья', 'Юлия', 'Татьяна', 'Ксения']
  };

  // Список товаров
  var goods = ['32 см со штативом 250 см', '26 см со штативом 250 см', '16 см со штативом 250 см', '16 см со штативом 110 см'];

  // Единица измерения товара
  var measure = 'шт.';

  // Цвет текста (и иконок) попапов
  var textColor = 'white';

  // Цвет фона попапов
  var backgroundColor = '#FC539C';

  // Скругление углов попапов
  var borderRadius = '4px';

  var html = '' +
    '<div class="notification notification--top-right js-orders">' +
    '  <div class="notification__icon">' +
    '    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  width="50px" height="50px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">' +
    '      <g>' +
    '        <path d="M990,249.3c0-15-12.5-27.6-27.6-27.6c-4,0-8,0-12,0c0,0-0.1,0-0.1,0c-33.7,0-67.5,0-101.2,0c-83.7,0-16708577A4A31"></path>' +
    '        <path d="M516.1,841.7c-2.4-39.4-34.1-70.1-74-70.9c-40.9-0.8-73.3,34.5-74.1,74.1c-0.8,40.9,34.5,73.3,74.1,74.1c39.8,0.8,71.5-32.6,74-70.9c0.1-1,0.2-2.1,0.1-3.2C516.2,843.8,516.2,842.7,516.1,841.7z"></path><path d="M847.1,841.7c-2.4-39.4-34.1-70.1-74-70.9c-40.9-0.8-73.3,34.5-74.1,74.1c-0.8,40.9,34.5,73.3,74.1,74.1c39.8,0.8,71.5-32.6,74-70.9c0.1-1,0.2-2.1,0.1-3.2C847.2,843.8,847.2,842.7,847.1,841.7z"/>' +
    '      </g>' +
    '    </svg>' +
    '  </div>' +
    '  <div class="notification__text">' +
    '    Светлана из г. Минск сделала заказ:<br/>' +
    '    Rolls-Royce Phantom - 2шт.<br/>' +
    '    Lamborghini Diablo - 5шт.<br/>' +
    '  </div>' +
    '</div>' +
    '<div class="notification notification--bottom-left js-delivery">' +
    '  <span class="notification__close" title="Закрыть">✖</span>' +
    '  <span class="notification__text">' +
    '    Действует быстрая доставка в<br>' +
    '    г. <span class="js-geo"> Москва</span>' +
    '  </span>' +
    '</div>' +
  '';

  var css = '' +
    '.notification {' +
    '  z-index: 999999;' +
    '  background-color:' + (backgroundColor ? backgroundColor : 'whitesmoke') +';' +
    '  padding:1rem 1.5rem;' +
    '  -webkit-box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, .2);' +
    '  -moz-box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, .2);' +
    '  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, .2);' +
    '  transition: opacity .3s ease-in;' +
    '  justify-content: space-between;' +
    '  display: none;' +
    '  opacity: 0;' +
    '}' +
    '@media all and (max-width: 600px) {' +
    '  .notification {' +
    '    width: 100%;' +
    '  }' +
    '}' +
    '@media all and (min-width: 601px) {' +
    '  .notification {' +
    '    -webkit-border-radius: ' + (borderRadius ? borderRadius : '2px') +';' +
    '    -moz-border-radius: ' + (borderRadius ? borderRadius : '2px') +';' +
    '    border-radius: ' + (borderRadius ? borderRadius : '2px') +';' +
    '  }' +
    '}' +
    '.notification--bottom-left {' +
    '  position: fixed;' +
    '  bottom: 0;' +
    '}' +
    '@media all and (min-width: 601px) {' +
    '  .notification--bottom-left {' +
    '    bottom: 20px;' +
    '    left: 20px;' +
    '  }' +
    '}' +
    '.notification--top-right {' +
    '  position: fixed;' +
    '  top: 0;' +
    '}' +
    '@media all and (min-width: 601px) {' +
    '  .notification--top-right {' +
    '    top: 20px;' +
    '    right: 20px;' +
    '  }' +
    '}' +
    '.notification__icon {' +
    '  margin: auto 1rem auto 0;' +
    '  fill: ' + (textColor ? textColor : 'rgba(0, 0, 0, .8)') + ';' +
    '}' +
    '@media all and (max-width: 600px) {' +
    '  .notification__icon {' +
    '    order: 50;' +
    '  }' +
    '}' +
    '.notification__text {' +
    '  color: ' + (textColor ? textColor : 'rgba(0, 0, 0, .8)') + ';' +
    '  text-shadow: none;' +
    '  font-size:.85rem;' +
    '  line-height: 1.5;' +
    '  text-align: left;' +
    '  margin: auto 0;' +
    '}' +
    '.notification__close {' +
    '  order: 99;' +
    '  margin:-0.6rem -1rem 0 .6rem;' +
    '  font-size:.75rem;' +
    '  cursor: pointer;' +
    '  color: ' + (textColor ? textColor : 'rgba(0, 0, 0, .8)') + ';' +
    '}' +
  '';

  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
  var markup = document.createElement("div");
  markup.innerHTML = html;
  document.body.appendChild(markup);

  var cities = ['Абакан', 'Абан', 'Абатский', 'Абрамовский маяк', 'Агата', 'Агаякан', 'Агзу', 'Агинское', 'Агинское',
    'Айхал', 'Акша', 'Белая глина', 'Белгород', 'Белово', 'Белогорка', 'Белогорск', 'Белозерск', 'Белый Яр', 'Белый',
    'Бродокалмак', 'Брохово', 'Брянск', 'Бугрино', 'Бугульма', 'Бугуруслан', 'Буденновск', 'Бузулук', 'Буйнакск',
    'Волгоград', 'Волжская ГМО', 'Волово', 'Вологда', 'Волоколамск', 'Волосово', 'Волчиха', 'Воньеган', 'Воркута',
    'Ворогово', 'Воронеж', 'Геленджик', 'Георгиевка', 'Гигант', 'Гижига', 'Глазов', 'Глубинное', 'Джалинда', 'Джана',
    'Джарджан', 'Заметчино', 'Зареченск', 'Заринск', 'Зашеек', 'Заярск', 'Звериноголовское', 'Здвинск', 'Зерноград', 'Зея',
    'Корф', 'Коса', 'Кослан', 'Кострома', 'Котельнич', 'Коткино', 'Котлас', 'Кочево', 'Коченёво', 'Кочки', 'Кочубей', 'Кош-Агач',
    'Мариинск', 'Марково', 'Марресаля', 'Маслянино', 'Матвеев Курган', 'Махачкала', 'Мача', 'Маячный', 'Невинномыск', 'Невьянск',
    'Оймякон', 'Октябрьская', 'Октябрьское', 'Окунев Нос', 'Ола', 'Олекминск', 'Оленек', 'Остров Спафарьева', 'Остров Харлов',
    'Понил', 'Поныри', 'Поронайск', 'Посевная', 'Поспелиха', 'Посьет', 'Пошехонье-Володарск', 'Поярково', 'Псков', 'Пугачев',
    'Саргатское', 'Саров', 'Сарыг-Сеп', 'Саскылах', 'Сасово', 'Светлоград', 'Светлолобово', 'Светлый', 'Свиягино', 'Свободный',
    'Солекуль', 'Солнечная', 'Соловьевск', 'Солонешное', 'Сопочная карга', 'Сортавала', 'Сосновка', 'Сосновка', 'Сочи (Адлер)',
    'Таганрог', 'Таежная', 'Тазовский', 'Тайга', 'Тайгонос', 'Таймылыр', 'Тайшет', 'Таксимо', 'Талая', 'Талон', 'Тальменка',
    'Убинское', 'Угино', 'Углегорск', 'Угловское', 'Угут', 'Удское', 'Уега', 'Ужаниха', 'Ужур', 'Улан-Удэ', 'Улеты',
    'Усть-Кокса', 'Усть-Кулом', 'Усть-Кут', 'Усть-Лабинск', 'Усть-Мая', 'Усть-Миль', 'Усть-Мома', 'Усть-Нюкжа',
    'Хороль', 'Хоседа-Хард', 'Хуларин', 'Хулугли', 'Цакир', 'Целина', 'Целинное', 'Целинное', 'Центральный рудник', 'Цимлянск',
    'Циммермановка', 'Чернушка', 'Чернышевский', 'Черняево', 'Черняховск', 'Черский', 'Чертково', 'Черусти', 'Чистоозерное',
    'Шелопугино', 'Шенкурск', 'Шербакуль', 'Шереметьево', 'Шилка', 'Шимановск', 'Шира', 'Шойна', 'Шумиха', 'Шумиха',
    'Юста', 'Юшкозеро', 'Ягодное', 'Яйлю', 'Яковлевка', 'Якутск', 'Якша', 'Ялуторовск', 'Ямкун', 'Янаул', 'Янискоски',
    'Янов Стан', 'Янск', 'Ярольин', 'Ярославль', 'Ярцево', 'Яшкуль', 'Яя', 'Москва', ' Санкт-Петербург'
  ];
  var showsCounter = 0;
  var userGeo;
  var script = document.createElement('script');
  script.src = '../../https@api-maps.yandex.ru/2.0-stable/@load=package.map&lang=ru-RU';
  if (script.addEventListener) {
    script.addEventListener("load", detectGeo, false);
  }
  else if (script.readyState) {
    script.onreadystatechange = detectGeo;
  }
  document.head.appendChild(script);
  function detectGeo() {
    ymaps.ready(function () {
      userGeo = ymaps.geolocation.city;
      if (userGeo) {
        var notification = document.querySelector('.js-delivery');
        notification.querySelector('.notification__close').addEventListener('click', function () {
          notification.style.display = 'none';
        }, false);
        for (var i = 0, elements = document.querySelectorAll('.js-geo'); i < elements.length; i++) {
          elements[i].innerHTML = ymaps.geolocation.city;
        }
        notification.style.display = 'flex';
        window.setTimeout(function () {
          notification.style.opacity = 1;
        }, 50);
      }
    });
  }
  function newOrder() {
    var gender = Object.keys(names)[Math.floor(Math.random() * Object.keys(names).length)];
    var name = names[gender][Math.floor(Math.random() * names[gender].length)];
    var city = cities[Math.floor(Math.random() * cities.length)];
    if ((showsCounter === 1 || showsCounter === 3 || showsCounter === 7) && userGeo) {
      city = userGeo;
    }
    var goodsInOrder = Math.floor(Math.random() * maxKinds) + 1;
    var order = [];
    var bought = [];
    for (var i = 0; i < goodsInOrder; i++) {
      var goodIndex = Math.floor(Math.random() * goods.length);
      if (bought.indexOf(goodIndex) !== -1) continue;
      var good = goods[goodIndex];
      var goodCount = Math.floor(Math.random() * maxItems) + 1;
      order.push(good + ' - ' + goodCount + ' ' + measure);
      bought.push(goodIndex);
    }
    var popupText = name + ' из г.' + city + (gender === 'men' ? ' сделал' : ' сделала') + ' заказ:<br/>';
    order.forEach(function (entry) {
      popupText += entry + '<br/>';
    });
    return popupText;
  }
  var notification = document.querySelector('.js-orders');
  function showNotification() {
    showsCounter++;
    notification.querySelector('.notification__text').innerHTML = newOrder();
    notification.style.display = 'flex';
    window.setTimeout(function () {
      notification.style.opacity = 1;
    }, 50);
    window.setTimeout(function () {
      notification.style.opacity = 0;
      window.setTimeout(function () {
        notification.style.display = 'none';
      }, 1000);
    }, 7 * 1000);
  }
  function startLoop() {
    showNotification();
    window.setTimeout(startLoop, (Math.floor(Math.random() * 60) + 30) * 1000);
  }
  window.setTimeout(startLoop, 10 * 1000);
})();