import { BASE_URL } from '@/app/config/constants';

type ServiceData = {
  main: {
    products: Array<{
      image: string;
      title: string;
      description: string[];
      price: string;
      buttonText: string;
      buttonAction: 'request' | 'order';
    }>;
  };
  printing: {
    sections: Array<{
      header?: {
        title: string;
        items: string[];
        backgroundImage: string;
        height?: number;
      };
      products?: {
        title: string;
        subtitle?: string;
        subtitleColor?: 'blue' | 'black';
        description: string;
        additionalInfo: string;
        products: Array<{
          image: string;
          title: string;
          description: string[];
          price?: string;
          buttonText: string;
          buttonAction: 'request' | 'order';
        }>;
      };
      productsGrid?: {
        products: Array<{
          image: string;
          title: string;
          description: string[];
          price?: string;
          buttonText: string;
          buttonAction: 'request' | 'order';
        }>;
      };
    }>;
  };
};

export const servicesData: ServiceData = {
  main: {
    products: [
      {
        image: `${BASE_URL}/images/1085b5821a354b3c65fbc35b013ac9ae.webp`,
        title: "Визитки 100 шт",
        description: [
          "Нанесение: одностороннее",
          "Макет не входит в стоимость",
          "Размер:90х50 мм"
        ],
        price: "756₽",
        buttonText: "Заказать",
        buttonAction: "order"
      },
      {
        image: `${BASE_URL}/images/682ed895eab8f0e570982001e4176b1a.webp`,
        title: "Печать автомат.",
        description: [
          "Размер: D-38 мм",
          "Автоматическая оснастка",
          "Чернила: синие"
        ],
        price: "1590₽",
        buttonText: "Заказать",
        buttonAction: "order"
      },
      {
        image: `${BASE_URL}/images/fc149cd9b0c4f3bdb5298759e5dfd80a.webp`,
        title: "Стикеры 3 листа А3",
        description: [
          "Форма: любая",
          "Количество: max в листе А3",
          "Бумага: самоклеющаяся"
        ],
        price: "795₽",
        buttonText: "Заказать",
        buttonAction: "order"
      },
      {
        image: `${BASE_URL}/images/eb328670783e547129ad61e1c1fe5268.webp`,
        title: "Табличка улица",
        description: [
          "Материал: металл",
          "Размер: 600х200 мм",
          "Макет в подарок"
        ],
        price: "1378₽",
        buttonText: "Заказать",
        buttonAction: "order"
      }
    ]
  },
  printing: {
    sections: [
      {
        header: {
          title: "ПОЛИГРАФИЯ",
          items: [
            "Визитки",
            "Листовки",
            "Стикеры",
            "Печати",
            "Календари",
            "Таблички"
          ],
          backgroundImage: `/page2/images/68abc6e67360d73e446aed2bebae31e1.webp`
        },
        products: {
          title: "Визитки",
          subtitle: "односторонние",
          description: "*Цена указана без учета разработки макета",
          additionalInfo: "Продукция изготавливается индивидуально срок печати составляет 2-3 раб. дня после оформления заказа, внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/86430c1e47bc1f6d82f30d464d996f05.webp`,
              title: "Свой тираж",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/1085b5821a354b3c65fbc35b013ac9ae.webp`,
              title: "Визитки 100 шт",
              description: [
                "Бумага: стандарт 300 гр",
                "Нанесение: с одной стороны",
                "Размер 90х50 мм"
              ],
              price: "756₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/737ef4541d069cb9b78cecb2c3096a0f.webp`,
              title: "Визитки 300 шт",
              description: [
                "Бумага: стандарт 300 гр",
                "Нанесение: с одной стороны",
                "Размер 90х50 мм"
              ],
              price: "1908₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/5d416f45996c730deac3f4aeef07479d.webp`,
              title: "Визитки 500 шт",
              description: [
                "Бумага: стандарт 300 гр",
                "Нанесение: с одной стороны",
                "Размер 90х50 мм"
              ],
              price: "2780₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        products: {
          title: "Визитки",
          subtitle: "двухсторонние",
          description: "*Цена указана без учета разработки макета",
          additionalInfo: "Продукция изготавливается индивидуально срок печати составляет 2-3 раб. дня после оформления заказа, внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/86430c1e47bc1f6d82f30d464d996f05.webp`,
              title: "Свой тираж",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/7e0ae0b7453010044fc80947c10ac1f1.webp`,
              title: "Визитки 100 шт",
              description: [
                "Бумага: стандарт 300 гр",
                "Нанесение: с двух сторон",
                "Размер 90х50 мм"
              ],
              price: "954₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/c69adc1434563f11706381f99bd8c247.webp`,
              title: "Визитки 300 шт",
              description: [
                "Бумага: стандарт 300 гр",
                "Нанесение: с двух сторон",
                "Размер 90х50 мм"
              ],
              price: "2385₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/352e00d04804855d75b2d51dac639b33.webp`,
              title: "Визитки 500 шт",
              description: [
                "Бумага: стандарт 300 гр",
                "Нанесение: с двух сторон",
                "Размер 90х50 мм"
              ],
              price: "3750₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        products: {
          title: "Листовки",
          subtitle: "Флаер",
          subtitleColor: 'black',
          description: "*Цена указана без учета разработки макета",
          additionalInfo: "Продукция изготавливается индивидуально срок печати составляет 2-3 раб. дня после оформления заказа, внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/8a49707685d46ef058da424562e51acf.webp`,
              title: "Свой тираж",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/8585e5024158bea0902ed09256a5dd7f.webp`,
              title: "Флаер 100 шт",
              description: [
                "Бумага: стандарт 130 гр",
                "Нанесение: с одной стороны",
                "Размер 100х210 мм"
              ],
              price: "1590₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/99dbdccc1df2e63b2cb6f7cf75b4708b.webp`,
              title: "Листовка А6 100 шт",
              description: [
                "Бумага: стандарт 130 гр",
                "Нанесение: с одной стороны",
                "Размер 105х148,5 мм"
              ],
              price: "1219₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/b9c81ed96c64e8a23a40fe5fab78e975.webp`,
              title: "Листовка А5 100 шт",
              description: [
                "Бумага: стандарт 130 гр",
                "Нанесение: с одной стороны",
                "Размер 210х148,5 мм"
              ],
              price: "1696₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        products: {
          title: "Стикеры",
          description: "",
          additionalInfo: "Продукция изготавливается индивидуально срок печати составляет 3 раб. дня после оформления заказа, внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/e9f95fe2000c27453cbf732a449ff98d.webp`,
              title: "Свой тираж",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/ff27458d55a0508f58e32e95bd35a249.webp`,
              title: "Стикеры 3 листа",
              description: [
                "Бумага: самоклеющаяся",
                "Форма: любая",
                "Кол-во: max в 3 листа А3"
              ],
              price: "795₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/02ca7af492cca528a3f8a00d40159791.webp`,
              title: "Стикеры 5 листов",
              description: [
                "Бумага: самоклеющаяся",
                "Форма: любая",
                "Кол-во: max в 5 листов А3"
              ],
              price: "954₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/4fcf93f61ca538d89aa9ee31060b943d.webp`,
              title: "Стикеры 10 листов",
              description: [
                "Бумага: самоклеющаяся",
                "Форма: любая",
                "Кол-во: max в 10 листов А3"
              ],
              price: "1908₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        products: {
          title: "Печати Штампы",
          subtitle: "Факсимиле",
          subtitleColor: 'black',
          description: "",
          additionalInfo: "Продукция изготавливается индивидуально срок составляет 3 раб. дня после оформления заказа, внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/682ed895eab8f0e570982001e4176b1a.webp`,
              title: "Печать автомат.",
              description: [
                "Автоматическая оснастка",
                "Изготовление макета",
                "Чернила: синие"
              ],
              price: "1590₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/0f278cb050ee73fa0a685b3583616506.webp`,
              title: "Печать простая",
              description: [
                "Оснастка простая с гербом",
                "Изготовление макета",
                "Без чернил"
              ],
              price: "1060₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/806a314a7fff52502c23287b62c603a5.webp`,
              title: "Печать \"лягушка\"",
              description: [
                "Складная оснастка",
                "Изготовление макета",
                "Чернила синие"
              ],
              price: "1272₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/2e8b0479fb34247b7a7cd4e99761d944.webp`,
              title: "Штамп",
              description: [
                "Автоматическая оснастка",
                "Изготовление макета",
                "Чернила: синие"
              ],
              price: "1590₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/1cd64709d4060da4e2999196dd8739ff.webp`,
              title: "Факсимиле",
              description: [
                "Автоматическая оснастка",
                "Отрисовка со скана",
                "Чернила: синие"
              ],
              price: "1590₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        products: {
          title: "Календари",
          description: "*Цена указана без учета разработки макета",
          additionalInfo: "Продукция изготавливается индивидуально срок печати составляет 5 раб. дня после оформления заказа, внесения предоплаты и утверждения макета\n\nКвартальные календари изготавливаются от 1 шт",
          products: [
            {
              image: `${BASE_URL}/page2/images/86430c1e47bc1f6d82f30d464d996f05.webp`,
              title: "Свой тираж",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/9119c4db021617ef62741a7a19ec4adc.webp`,
              title: "Квартальные 50 шт",
              description: [
                "Шапка: Формат 200х300 мм",
                "Блок: офсет датированный",
                "из 3 блоков на пружине",
                "Цена за ед. 310 руб/шт"
              ],
              price: "15500₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/83ac912e51078eec1b1b6dfb8fd7c55b.webp`,
              title: "Настольные 100 шт",
              description: [
                "Календарь домик",
                "Бумага: 300 гр",
                "Размер 100х200 мм",
                "Цена за ед. 110 руб/ шт"
              ],
              price: "11000₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/e5dbbf61d90c2c12a0a199f0f99f681a.webp`,
              title: "Карманные 100 шт",
              description: [
                "Бумага: стандарт 300 гр",
                "Нанесение: с двух сторон",
                "Размер 100х70 мм",
                "Цена за ед. 7 руб/шт"
              ],
              price: "7000₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        products: {
          title: "Таблички",
          description: "",
          additionalInfo: "Продукция изготавливается индивидуально срок печати составляет 5 раб. дня после оформления заказа, внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/66545facfec6be985d466bee5dcc9fc6.webp`,
              title: "Свои характеристики",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/eb328670783e547129ad61e1c1fe5268.webp`,
              title: "Табличка улица",
              description: [
                "Размер: 600х200 мм",
                "Цвет: Любой",
                "Материал металл"
              ],
              price: "1378₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/38e4ee59726017d73c485e20a0962f35.webp`,
              title: "\"Бессмертный полк\"",
              description: [
                "Размер: 300х400 мм",
                "Материал: пластик + держатель + ламинация"
              ],
              price: "800₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/a2fccfe7578869d90da9aca0572355c3.webp`,
              title: "Табличка на дверь",
              description: [
                "Размер:300х100 мм",
                "Двусторонний скотч",
                "Материал: пластик"
              ],
              price: "320₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/5610d0d75bc8365db4affd73a3450178.webp`,
              title: "Табличка на металле",
              description: [
                "Размер: 850х600 мм",
                "Макет входит в стоимость",
                "Материал: металл"
              ],
              price: "1800₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        header: {
          title: "БРЕНДИРОВАНИЕ",
          items: [
            "Нанесение на одежду",
            "Пакеты",
            "Ручки"
          ],
          backgroundImage: `/page2/images/445b5e19ae58fbce75adc7822ebe1ac9.webp`,
          height: 350
        }
      },
      {
        products: {
          title: "Нанесение на ткань",
          description: "*Индивидуальный расчет",
          additionalInfo: "Срок нанесения оговаривается индивидуально. Заказ поступает в работу после оформления, внесения предоплаты и утверждения макета\n\nDTF печать:\n- любые лого в несколько цветов\n- печатаем даже небольшой тираж\n- высокое качество\n- ярко даже на черном !",
          products: [
            {
              image: `${BASE_URL}/page2/images/68ef1b9a75911e9cf0b719fbf2bd8da1.webp`,
              title: "Нанесение DTF на материал заказчика",
              description: [
                "Размер нанесения: индивидуально",
                "Нанесение: полноцвет",
                "Метод: DTF печать"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/c549630e741ccdb7d01700efa3f36184.webp`,
              title: "Печать на футболках",
              description: [
                "Футболка: под заказ",
                "Нанесение: полноцвет",
                "Грудь/спина"
              ],
              price: "1500₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/f21ea4333a91dd08ab5e3cd52c1a0295.webp`,
              title: "Печать на сумках заказчика 30 шт",
              description: [
                "Нанесение: 15х15 см полноцвет с двух сторон"
              ],
              price: "4500₽",
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            }
          ]
        }
      },
      {
        products: {
          title: "Пакеты ПВД",
          subtitle: "Пакеты бумажные",
          subtitleColor: 'black',
          description: "*Индивидуальный расчет",
          additionalInfo: "Продукция изготавливается индивидуально срок зависит от тиража и загруженности производства. Заказ поступает в работу после внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/58a26bee69902f6a16fe08991e3d0c2c.webp`,
              title: "Свой тираж",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/0e0b2df351c637f350211177ebf7a49f.webp`,
              title: "Пакеты ПВД 100 шт",
              description: [
                "Размер: 300х400 мм",
                "Плотность: 70 микр",
                "Нанесение в 1 цвет с одной стороны"
              ],
              price: "5000₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/b9bf64c8285e7afe06f9f8a6b014910a.webp`,
              title: "Пакеты бум. 100 шт",
              description: [
                "Размер: 300х400х120мм",
                "Плотность 200 гр",
                "Нанесение: полноцвет",
                "Цена 220 руб/шт"
              ],
              price: "22000₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/781c9dec12017469eec8000872613de1.webp`,
              title: "Пакеты бум. 100 шт",
              description: [
                "Размер: 250х350х90мм",
                "Плотность 200 гр",
                "Нанесение: полноцвет",
                "Цена 170 руб/шт"
              ],
              price: "17000₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        products: {
          title: "Ручки",
          subtitle: "Карандаши",
          subtitleColor: 'black',
          description: "*Индивидуальный расчет",
          additionalInfo: "Продукция изготавливается индивидуально срок составляет 10 раб. дней после оформления заказа, внесения предоплаты и утверждения макета",
          products: [
            {
              image: `${BASE_URL}/page2/images/a266785e68ec60f54c9bb5d132732811.webp`,
              title: "Свой тираж",
              description: [
                "Если Вас не устроил стандартный набор параметров.",
                "Отправьте запрос на расчет.",
                "Менеджер свяжется для уточнения деталей"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/c3fec9f6fe5df35270e430f07a1b6acc.webp`,
              title: "Ручки 100 шт",
              description: [
                "Нанесение: полноцвет",
                "Цвет ручки: подбор",
                "Оснастка ручки: подбор",
                "Цена за ед.: 86 руб/шт"
              ],
              price: "8600₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/70a60e4b6da2a3dd2d02a5f67316fc4d.webp`,
              title: "Ручки 200 шт",
              description: [
                "Нанесение: полноцвет",
                "Цвет ручки: подбор",
                "Оснастка ручки: подбор",
                "Цена за ед.: 72 руб/шт"
              ],
              price: "14400₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/6597416b58725d18e76e956b0fae08b9.webp`,
              title: "Карандаши 200 шт",
              description: [
                "Нанесение: в 1 цвет (черный/серебро/золото)",
                "Цвет карандаша: подбор",
                "Цена за ед.: 52 руб/шт"
              ],
              price: "10400₽",
              buttonText: "Заказать",
              buttonAction: "order"
            }
          ]
        }
      },
      {
        header: {
          title: "ШИРОКОФОРМАТНАЯ ПЕЧАТЬ",
          items: [
            "Наклейки",
            "Плакаты",
            "Баннера"
          ],
          backgroundImage: `/page2/images/84ebae0ce82f29f29af39f76b4de5995.webp`,
          height: 410
        }
      },
      {
        productsGrid: {
          products: [
            {
              image: `${BASE_URL}/page2/images/18aa2173d9be89e6e2c60046f07387cd.webp`,
              title: "Печать на пленке",
              description: [
                "Индивидуальный расчет",
                "в соответствии с размером",
                "и наличием макета"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/c169642d1a6152d10909f295c9a1fb51.webp`,
              title: "Печать на бумаге",
              description: [
                "Индивидуальный расчет",
                "в соответствии с размером",
                "и наличием макета"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/c3e6bf0c11bdb12a65f91f975353324c.webp`,
              title: "Печать на баннере",
              description: [
                "Индивидуальный расчет",
                "в соответствии с размером",
                "и наличием макета"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/d075646d81da4d78624d613b3314c676.webp`,
              title: "Плоттерная резка",
              description: [
                "Индивидуальный расчет",
                "в соответствии с размером",
                "и наличием макета"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            }
          ]
        }
      },
      {
        header: {
          title: "РЕКЛАМНЫЕ КОНСТРУКЦИИ",
          items: [
            "Стойки",
            "Roll Up/ Press Wall",
            "Вывески"
          ],
          backgroundImage: `/page2/images/5e5d7c29f9a795c3833f99356fe89a49.webp`,
          height: 410
        }
      },
      {
        productsGrid: {
          products: [
            {
              image: `${BASE_URL}/page2/images/d247a0b4a7af596b54c87494a2e8fcb8.webp`,
              title: "Стойка рекламная",
              description: [
                "Нанесение с 2х сторон",
                "Макет не входит в стоимость",
                "Размер 1.20 х 0.6"
              ],
              price: "7420₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/849b42d8b1c5f9e616512529f86ec357.webp`,
              title: "Стойка Roll Up",
              description: [
                "Полноцветная печать",
                "Макет не входит в стоимость",
                "Размер:85х200 см"
              ],
              price: "6890₽",
              buttonText: "Заказать",
              buttonAction: "order"
            },
            {
              image: `${BASE_URL}/page2/images/60686216eead850f7262c0942339222f.webp`,
              title: "Press Wall",
              description: [
                "Индивидуальный расчет",
                "в соответствии с размером",
                "и наличием макета"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            },
            {
              image: `${BASE_URL}/page2/images/b379195e0ac91bc45b878ad35f25e4a1.webp`,
              title: "Вывески\nСветовые буквы",
              description: [
                "Индивидуальный расчет",
                "в соответствии с размером/",
                "количеством букв и материалом"
              ],
              buttonText: "Запрос на расчет",
              buttonAction: "request"
            }
          ]
        }
      }
    ]
  }
}; 