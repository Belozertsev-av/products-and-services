export const useFakeData = () => {
  const user = (hashedPassword) => ({
    login: "admin",
    password: hashedPassword,
    firstName: "Райан",
    lastName: "Гослинг",
  })

  const company = () => ({
    name: "Наследие",
    phoneNumber: "+7 (951) 669-21-54",
    img: "company_logo.webp",
    description:
      "Копкой занимаемся 15 лет. Всеначалось с хобби и плавно переросло в любимую работу. Работаем с профессиональной техникой.",
    address: "Ростов на Дону, Воронежская ул., 42А корп. 1",
    coordinates: [39.668408, 47.244099],
    schedule: {
      mon: ["09:00", "21:00"],
      tue: ["09:00", "21:00"],
      wed: ["09:00", "21:00"],
      thu: ["09:00", "21:00"],
      fri: ["09:00", "21:00"],
      sat: ["12:00", "20:00"],
      sun: ["12:00", "20:00"],
    },
    premium: true,
  })

  const agents = (companyId) => [
    {
      firstName: "Дмитрий",
      lastName: "Хитрый",
      avatar: "Img-1.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
      rate: 4.3,
      reviewCount: 19,
      premium: true,
      companyId: companyId,
    },
    {
      id: 2,
      firstName: "Апполинарий",
      lastName: "Землеперекопский",
      avatar: "Img-2.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
      rate: null,
      reviewCount: null,
      premium: true,
    },
    {
      id: 3,
      firstName: "Федор",
      lastName: "Сумкин",
      avatar: "Img-3.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
      rate: 5,
      reviewCount: 22,
      premium: false,
    },
    {
      id: 4,
      firstName: "Василий",
      lastName: "Копушин",
      avatar: "Img-4.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
      rate: 4,
      reviewCount: 123,
      premium: true,
    },
    {
      id: 5,
      firstName: "Феофан",
      lastName: "Кусакин",
      avatar: "Img-5.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
      rate: 3.5,
      reviewCount: 3,
      premium: false,
    },
    {
      id: 6,
      firstName: "Василиса",
      lastName: "Землеперекопская",
      avatar: "Img-6.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
      rate: 4.9,
      reviewCount: 8,
      premium: true,
    },
  ]

  const ads = (companyId) => [
    {
      img: "Img-1.webp",
      price: 450500,
      currency: "RUB",
      label: "Сlavia Nord Grand сценическое цифровое пианино",
      type: "product",
      status: "PROMOTING",
      watched: 750,
      createdAt: new Date(1741844517),
      companyId: companyId,
    },
    {
      img: "Img-2.webp",
      price: 3285000,
      currency: "RUB",
      label: "Hyundai Sonata 2.0 AT, 2023, 30 км",
      type: "product",
      status: "CREATED",
      watched: 255,
      createdAt: new Date(1741671717),
      companyId: companyId,
    },
    {
      img: "Img-3.webp",
      price: 4800000,
      currency: "RUB",
      label: "2-к. квартира, 46 м², 1/5 эт.",
      type: "product",
      status: "CREATED",
      watched: 255,
      createdAt: new Date(1741936396),
      companyId: companyId,
    },
    {
      img: "Img-4.webp",
      price: 7500,
      currency: "RUB",
      label: "Старые барабаны",
      type: "product",
      status: "CREATED",
      watched: 255,
      createdAt: new Date(1741844517),
      companyId: companyId,
    },
    {
      img: "Img-5.webp",
      price: 7500,
      currency: "RUB",
      label: "DMX сплиттер RJ45 to 4x XLR Stairville",
      type: "product",
      status: "CREATED",
      watched: 320,
      createdAt: new Date(1741671717),
      companyId: companyId,
    },
    {
      img: "Img-6.webp",
      price: 217500,
      currency: "RUB",
      label: "Мотоцикл Honda",
      type: "product",
      status: "CREATED",
      watched: 255,
      createdAt: new Date(1742033600),
      companyId: companyId,
    },
    {
      img: "Img-7.webp",
      price: 17900,
      currency: "RUB",
      label: "Иж юпитер 5",
      type: "product",
      status: "CREATED",
      watched: 255,
      createdAt: new Date(1740899596),
      companyId: companyId,
    },
    {
      img: "Img-8.webp",
      price: 7500,
      currency: "RUB",
      label: "Пылесос кёрхер с водяным мешком для сбора пыли",
      type: "product",
      status: "CLOSED",
      watched: 255,
      createdAt: new Date(1741844517),
      companyId: companyId,
    },
  ]

  const companyReviews = () => [
    {
      rating: 5.0,
      comment:
        "Отличная компания! Быстро нашли мне идеальный вариант жилья. Рекомендую!",
    },
    {
      rating: 4.5,
      comment:
        "Хороший сервис, но немного затянули процесс оформления документов",
    },
    {
      rating: 4.0,
      comment: "Работают профессионально, но цены немного выше рыночных",
    },
  ]

  const agentReviews = () => [
    {
      rating: 4.5,
      comment:
        "Дмитрий помог подобрать квартиру по моим нестандартным требованиям. Спасибо!",
    },
    {
      rating: 4.0,
      comment: "Немного медленно отвечал на сообщения, но в целом всё устроило",
    },
    {
      rating: 5.0,
      comment:
        "Самый внимательный агент из всех, с кем мне приходилось работать!",
    },
  ]

  return {
    user,
    company,
    agents,
    ads,
    companyReviews,
    agentReviews,
  }
}
