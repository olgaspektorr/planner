import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const WEEKS_2026 = [
  {
    id: "w01", label: "Нед 1", dates: "3–9 июня",
    month: "Июнь",
    focus: "СТАРТ: Пост-манифест + Торги + BRUSNICA-разблокировка",
    goals: [
      "Написать и опубликовать пост-манифест «Эксперт, который начал говорить»",
      "Подать хотя бы 1 заявку на торги (торги.гов.ру / росэлторг.рф)",
      "Зафиксировать новую модель с отцом: он на зарплате, ты управляешь",
    ],
    tasks: [
      "Пост-манифест написан и опубликован в Telegram",
      "Шапка Instagram обновлена под нарратив",
      "Аккредитация на торговой площадке проверена",
      "Найдено 3+ лота по земле в своём регионе",
      "1 заявка на торги подана",
      "Разговор с отцом состоялся, договорённости записаны",
      "Смета на 1–2 продукта BRUSNICA пересчитана",
      "Авито обновлено (3 объявления)",
    ],
  },
  {
    id: "w02", label: "Нед 2", dates: "10–16 июня",
    month: "Июнь",
    focus: "Контент-система + первые клиентские запросы",
    goals: [
      "Опубликовать 3–4 поста (кейс торгов, философия земли, личный путь)",
      "Получить 1 входящий запрос по BRUSNICA",
      "Разобрать 2 лота с цифрами — один в пост",
    ],
    tasks: [
      "Контент-план на июнь готов (12–15 постов)",
      "Пост: кейс торгов с цифрами опубликован",
      "Пост: философия земли как актива",
      "Пост: про BRUSNICA (что, для кого, как появилось)",
      "Разбор 2 лотов с цифрами зафиксирован в Notion",
      "Фотоконтент объектов BRUSNICA сделан или запланирован",
      "Спорт 3 раза за неделю",
      "E-Myth Revisited: 30+ страниц прочитано",
    ],
  },
  {
    id: "w03", label: "Нед 3", dates: "17–23 июня",
    month: "Июнь",
    focus: "Первое ВП + рост аудитории",
    goals: [
      "Найти 5 каналов для взаимного пиара в июле",
      "Опубликовать 3–4 поста",
      "Участие в торгах или детальный анализ 1 лота в пост",
    ],
    tasks: [
      "5+ каналов для ВП найдены и записаны",
      "Написать 3–4 поста за неделю",
      "Пост: публичное мышление (почему люди устали от города)",
      "Участие в торгах или разбор лота для контента",
      "Коммерческое предложение BRUSNICA готово",
      "Notion — база проектов обновлена",
      "Финтаблица: внесены данные за июнь",
    ],
  },
  {
    id: "w04", label: "Нед 4", dates: "24–30 июня",
    month: "Июнь",
    focus: "Итог первого месяца + план на июль",
    goals: [
      "Опубликовать пост-итог: «Первый месяц — что сделала»",
      "Готов контент-план на июль",
      "Финансовый итог июня зафиксирован",
    ],
    tasks: [
      "Пост-итог первого месяца опубликован",
      "Контент-план на июль готов",
      "Финансовый итог июня: доходы / расходы записаны",
      "3 цели на июль определены",
      "Итог по BRUSNICA за июнь зафиксирован",
      "Итог по торгам: сколько участвовала, что узнала",
      "Психологический разбор: что было тяжело",
    ],
  },
  {
    id: "w05", label: "Нед 5", dates: "1–7 июля",
    month: "Июль",
    focus: "ВП-кампания + масштаб аудитории",
    goals: [
      "Провести 2–3 взаимных пиара с каналами",
      "Первые 500 подписчиков в Telegram",
      "Стабильно 3–5 постов/нед",
    ],
    tasks: [
      "2–3 ВП договорённости закрыты и опубликованы",
      "500+ подписчиков в Telegram",
      "3–5 постов за неделю опубликовано",
      "1 участие в торгах",
      "BRUSNICA: 1 активный запрос в работе",
      "Psychology of Money: начата",
    ],
  },
  {
    id: "w06", label: "Нед 6", dates: "8–14 июля",
    month: "Июль",
    focus: "Кейсы + монетизация первые шаги",
    goals: [
      "Опубликовать 2 подробных кейса с цифрами",
      "Первый платный запрос или консультация",
      "Смета на 3й продукт BRUSNICA готова",
    ],
    tasks: [
      "2 кейса торгов с полным разбором опубликованы",
      "1 платная консультация или запрос",
      "Смета на 3й продукт BRUSNICA готова",
      "3–5 постов за неделю",
      "Анализ 5+ новых лотов",
      "Спорт / режим держится",
    ],
  },
  {
    id: "w07", label: "Нед 7", dates: "15–21 июля",
    month: "Июль",
    focus: "Воронка продаж — черновик",
    goals: [
      "Набросок воронки: как приходят деньги от ЗемлеУм",
      "3–5 постов по контент-плану",
      "BRUSNICA: 2+ активных заказа",
    ],
    tasks: [
      "Воронка ЗемлеУм — схема в Notion готова",
      "3–5 постов опубликовано",
      "2+ активных заказа BRUSNICA",
      "Участие в торгах или анализ лотов",
      "Итог недели в Notion",
      "Mountain Is You: начата или прочитана",
    ],
  },
  {
    id: "w08", label: "Нед 8", dates: "22–28 июля",
    month: "Июль",
    focus: "Итог июля + финансы",
    goals: [
      "Финансовый итог июля",
      "Контент-план на август",
      "100к+ ₽ дохода за июль (цель)",
    ],
    tasks: [
      "Финансовый итог июля зафиксирован",
      "Контент-план на август готов",
      "Пост-итог июля опубликован",
      "3 цели на август определены",
      "Итог по BRUSNICA: заказы, выручка",
      "Итог по торгам июля",
    ],
  },
  {
    id: "w09", label: "Нед 9", dates: "29 июля – 4 авг",
    month: "Август",
    focus: "Цифровой продукт — концепция",
    goals: [
      "Набросок цифрового продукта ЗемлеУм (что продаём, кому, за сколько)",
      "Стабильный контент без пропусков",
      "BRUSNICA: первые повторные клиенты",
    ],
    tasks: [
      "Концепция цифрового продукта в Notion",
      "3–5 постов опубликовано",
      "1+ повторный клиент BRUSNICA",
      "Анализ конкурентов (как они монетизируют)",
      "Hard Thing About Hard Things: начата",
      "Спорт / режим",
    ],
  },
  {
    id: "w10", label: "Нед 10", dates: "5–11 авг",
    month: "Август",
    focus: "Рост аудитории + качество контента",
    goals: [
      "750+ подписчиков Telegram",
      "Видео-кейс или Reels: первая попытка",
      "3 активных заказа BRUSNICA одновременно",
    ],
    tasks: [
      "750+ подписчиков в Telegram",
      "1 короткое видео или Reels опубликовано",
      "3+ активных заказа BRUSNICA",
      "3–5 постов за неделю",
      "Участие в торгах",
      "Финтаблица обновлена",
    ],
  },
  {
    id: "w11", label: "Нед 11", dates: "12–18 авг",
    month: "Август",
    focus: "Подписная модель — первый набросок",
    goals: [
      "Структура клуба/подписки — черновик",
      "Первые 5 потенциальных клиентов для подписки",
      "Стабильный контент",
    ],
    tasks: [
      "Черновик подписной модели: формат, цена, контент",
      "5 потенциальных клиентов определены",
      "3–5 постов за неделю",
      "Пост о ценностях и методологии",
      "BRUSNICA: процессы стандартизируются",
    ],
  },
  {
    id: "w12", label: "Нед 12", dates: "19–25 авг",
    month: "Август",
    focus: "Итог августа + старт монетизации",
    goals: [
      "Первые платные клиенты ЗемлеУм (консультации или подписка)",
      "150к+ ₽ дохода в месяц (цель)",
      "Контент-план на сентябрь",
    ],
    tasks: [
      "Первые платные клиенты — есть",
      "Финансовый итог августа зафиксирован",
      "Контент-план на сентябрь готов",
      "Пост-итог августа опубликован",
      "BRUSNICA: итог месяца — заказы, выручка",
    ],
  },
  {
    id: "w13", label: "Нед 13", dates: "26 авг – 1 сент",
    month: "Сентябрь",
    focus: "Запуск подписки / клуба",
    goals: [
      "Официальный запуск подписки/клуба ЗемлеУм",
      "Первые 10 платных подписчиков",
      "Автоворонка: схема готова",
    ],
    tasks: [
      "Подписка/клуб официально запущен",
      "10+ платных подписчиков",
      "Автоворонка: схема в Notion",
      "3–5 постов за неделю",
      "BRUSNICA: стабильные заказы",
    ],
  },
  {
    id: "w14", label: "Нед 14", dates: "2–8 сент",
    month: "Сентябрь",
    focus: "Масштаб ЗемлеУм + земля системно",
    goals: [
      "1 000 подписчиков Telegram",
      "Системный подход к торгам: 3+ лота в анализе",
      "Доход от ЗемлеУм: 50к+ ₽ за месяц",
    ],
    tasks: [
      "1 000+ подписчиков в Telegram",
      "3+ лота в системном анализе",
      "Доход ЗемлеУм 50к+ ₽/мес",
      "3–5 постов за неделю",
      "Good to Great: начата",
    ],
  },
  {
    id: "w15", label: "Нед 15", dates: "9–15 сент",
    month: "Сентябрь",
    focus: "Команда: первый помощник",
    goals: [
      "Найти первого помощника (контент или операционка)",
      "Стабильный контент без личного перегруза",
      "BRUSNICA: 5+ активных заказов",
    ],
    tasks: [
      "Вакансия/поиск помощника запущен",
      "3–5 постов за неделю без выгорания",
      "5+ активных заказов BRUSNICA",
      "Участие в торгах",
      "Делегирование 1 задачи отцу",
    ],
  },
  {
    id: "w16", label: "Нед 16", dates: "16–22 сент",
    month: "Сентябрь",
    focus: "Итог сентября + план Q4",
    goals: [
      "Финансовый итог сентября: 200к+ ₽",
      "Помощник найден или в процессе",
      "Контент-план на октябрь",
    ],
    tasks: [
      "Финансовый итог сентября зафиксирован",
      "Помощник найден или финальные интервью",
      "Контент-план на октябрь готов",
      "Пост-итог сентября",
      "3 цели на Q4 определены",
    ],
  },
  {
    id: "w17", label: "Нед 17", dates: "23–29 сент",
    month: "Сентябрь",
    focus: "Автоматизация + делегирование",
    goals: [
      "Помощник вышел на работу",
      "1 процесс делегирован",
      "Воронка ЗемлеУм: первая версия работает",
    ],
    tasks: [
      "Помощник в работе",
      "1 процесс полностью делегирован",
      "Воронка ЗемлеУм v1 работает",
      "3–5 постов за неделю",
      "BRUSNICA: стандарты прописаны",
    ],
  },
  {
    id: "w18", label: "Нед 18", dates: "30 сент – 6 окт",
    month: "Октябрь",
    focus: "Масштаб BRUSNICA",
    goals: [
      "BRUSNICA: каталог 3–5 моделей готов",
      "Стабильные 300к+ ₽ дохода в месяц",
      "Контент: видео-кейс или Reels системно",
    ],
    tasks: [
      "Каталог BRUSNICA 3–5 моделей с фото готов",
      "Доход 300к+ ₽/мес",
      "Видео-кейс или Reels: системно (1/нед)",
      "3–5 постов за неделю",
      "Анализ конкурентов BRUSNICA",
    ],
  },
  {
    id: "w19", label: "Нед 19", dates: "7–13 окт",
    month: "Октябрь",
    focus: "Земля: первая перепродажа или крупная сделка",
    goals: [
      "Первая перепродажа участка или крупная сделка",
      "1 500+ подписчиков Telegram",
      "BRUSNICA: первые повторные заказы",
    ],
    tasks: [
      "Перепродажа или крупная сделка закрыта",
      "1 500+ подписчиков",
      "Повторные заказы BRUSNICA зафиксированы",
      "Пост о сделке (кейс)",
      "3–5 постов за неделю",
    ],
  },
  {
    id: "w20", label: "Нед 20", dates: "14–20 окт",
    month: "Октябрь",
    focus: "Системность: Notion + процессы",
    goals: [
      "Notion: полная база проектов и SOP готова",
      "Финансовая модель (P&L) актуальна",
      "Команда: помощник работает стабильно",
    ],
    tasks: [
      "Notion база: все проекты, SOP, задачи",
      "P&L модель актуальна",
      "Помощник: первые KPI выставлены",
      "3–5 постов за неделю",
    ],
  },
  {
    id: "w21", label: "Нед 21", dates: "21–27 окт",
    month: "Октябрь",
    focus: "Итог октября + масштаб контента",
    goals: [
      "400к+ ₽ дохода в октябре",
      "Контент-план на ноябрь",
      "Видео-формат: тест на YouTube или Reels",
    ],
    tasks: [
      "Финансовый итог октября: 400к+ ₽",
      "Контент-план на ноябрь готов",
      "YouTube / Reels: 1 видео опубликовано",
      "Пост-итог октября",
      "3 цели на ноябрь",
    ],
  },
  {
    id: "w22", label: "Нед 22", dates: "28 окт – 3 ноя",
    month: "Ноябрь",
    focus: "Цифровой продукт: финальная версия",
    goals: [
      "Цифровой продукт v1 полностью готов",
      "Первые 50 платных подписчиков",
      "Воронка автоматизирована",
    ],
    tasks: [
      "Цифровой продукт v1 запущен официально",
      "50+ платных подписчиков",
      "Воронка работает автоматически",
      "3–5 постов за неделю",
      "BRUSNICA: 500к+ ₽ выручки в месяц",
    ],
  },
  {
    id: "w23", label: "Нед 23", dates: "4–10 ноя",
    month: "Ноябрь",
    focus: "Аренда: планирование первого объекта",
    goals: [
      "Концепция первого объекта аренды готова",
      "Смета на строительство / подготовку",
      "Земля под объект — выбрана или есть план",
    ],
    tasks: [
      "Концепция объекта аренды в Notion",
      "Смета на строительство готова",
      "Земля под объект выбрана или план есть",
      "3–5 постов за неделю",
      "Участие в торгах",
    ],
  },
  {
    id: "w24", label: "Нед 24", dates: "11–17 ноя",
    month: "Ноябрь",
    focus: "Масштаб и стабильность",
    goals: [
      "2 000+ подписчиков Telegram",
      "Стабильные 500к+ ₽/мес",
      "Команда работает без постоянного контроля",
    ],
    tasks: [
      "2 000+ подписчиков в Telegram",
      "Доход 500к+ ₽/мес",
      "Команда: процессы идут без тебя в деталях",
      "3–5 постов за неделю",
      "Итог ноября — черновик",
    ],
  },
  {
    id: "w25", label: "Нед 25", dates: "18–24 ноя",
    month: "Ноябрь",
    focus: "Итог ноября + подготовка декабря",
    goals: [
      "Финансовый итог ноября зафиксирован",
      "Контент-план на декабрь",
      "Стратегический план на 2027 — черновик",
    ],
    tasks: [
      "Финансовый итог ноября",
      "Контент-план на декабрь",
      "Черновик плана на 2027",
      "Пост-итог ноября",
      "3 цели на декабрь",
    ],
  },
  {
    id: "w26", label: "Нед 26", dates: "25 ноя – 1 дек",
    month: "Декабрь",
    focus: "Итоговый рывок + системная сборка",
    goals: [
      "Все процессы зафиксированы в SOP",
      "Декабрь — стабильный доход без рывков",
      "Начата стройка / подготовка объекта аренды",
    ],
    tasks: [
      "SOP для всех направлений готовы",
      "Стабильный доход без хаоса",
      "Объект аренды: стройка начата или план конкретный",
      "3–5 постов за неделю",
    ],
  },
  {
    id: "w27", label: "Нед 27", dates: "2–8 дек",
    month: "Декабрь",
    focus: "Контент: годовые кейсы и итоги",
    goals: [
      "Серия постов: «7 месяцев — что построено»",
      "Привлечение новой аудитории через итоги",
      "BRUSNICA: декабрь — лучший месяц",
    ],
    tasks: [
      "Серия постов «итоги» запущена",
      "Рост аудитории от итоговых постов",
      "BRUSNICA: декабрь — рекорд выручки",
      "3–5 постов за неделю",
      "Итоги по торгам 2026",
    ],
  },
  {
    id: "w28", label: "Нед 28", dates: "9–15 дек",
    month: "Декабрь",
    focus: "Финальная подготовка к 2027",
    goals: [
      "300–600к ₽ дохода в декабре",
      "План на 2027 готов",
      "Команда на 2027 определена",
    ],
    tasks: [
      "Доход декабря: 300–600к ₽",
      "Детальный план на 2027 готов",
      "Команда на 2027: кто нужен, кто есть",
      "3–5 постов за неделю",
      "Финансовая модель на 2027 черновик",
    ],
  },
  {
    id: "w29", label: "Нед 29", dates: "16–22 дек",
    month: "Декабрь",
    focus: "Стратегическая неделя",
    goals: [
      "Годовой финансовый итог 2026",
      "3 главных урока 2026",
      "Пост-манифест на 2027",
    ],
    tasks: [
      "Годовой финансовый итог зафиксирован",
      "3 главных урока 2026 записаны",
      "Пост-манифест на 2027 написан",
      "Итоговый пост 2026 опубликован",
      "Психологический разбор года",
    ],
  },
  {
    id: "w30", label: "Нед 30", dates: "23–31 дек",
    month: "Декабрь",
    focus: "ФИНИШ 2026 — закрыть год чисто",
    goals: [
      "Все незакрытые задачи закрыты или перенесены",
      "Отдых и восстановление",
      "Войти в 2027 с ясной головой и планом",
    ],
    tasks: [
      "Все задачи 2026 закрыты или перенесены в план 2027",
      "Финансовый итог года сведён",
      "3 дня полного отдыха без работы",
      "Готова к 2027",
    ],
  },
];

const MONTH_COLORS = {
  "Июнь":    { bg: "#1a0a2e", accent: "#9b59b6", soft: "#2d1b4e" },
  "Июль":    { bg: "#0a1a2e", accent: "#3498db", soft: "#1b2d4e" },
  "Август":  { bg: "#0a2e1a", accent: "#27ae60", soft: "#1b4e2d" },
  "Сентябрь":{ bg: "#2e1a0a", accent: "#e67e22", soft: "#4e2d1b" },
  "Октябрь": { bg: "#2e0a0a", accent: "#e74c3c", soft: "#4e1b1b" },
  "Ноябрь":  { bg: "#0a2e2e", accent: "#1abc9c", soft: "#1b4e4e" },
  "Декабрь": { bg: "#1a1a0a", accent: "#f1c40f", soft: "#4e4e1b" },
};

const YEARS_DATA = [
  {
    year: 2027, title: "БИЗНЕС", color: "#0097a7",
    goals: [
      { goal: "ЗемлеУм → цифровая система", detail: "Telegram-бот, автоворонка, подписная модель, уйти от продажи руками", metric: "500+ платных подписчиков или 200к₽/мес от цифры" },
      { goal: "1 качественный объект аренды", detail: "Построить/подготовить, запустить посуточно+помесячно, пройти весь цикл", metric: "Объект сдаётся, экономика считается" },
      { goal: "BRUSNICA: мини-производство + команда", detail: "3–5 стандартных моделей, каталог, отец = производство, 1–2 наёмных", metric: "Выручка 500к+/мес, маржа >35%" },
    ],
    quarters: [
      { q: "Q1 Янв–Март", items: ["Цифровой продукт v1", "Первая воронка продаж", "Найм помощника/техспеца", "Каталог BRUSNICA готов"] },
      { q: "Q2 Апр–Июнь", items: ["Автоворонка работает", "Первые платные подписчики", "Объект аренды в работе", "Операц. ассистент нанят"] },
      { q: "Q3 Июль–Сент", items: ["Клуб/сообщество запущен", "Объект аренды сдаётся", "2 000+ подписчиков ТГ", "Делегирование работает"] },
      { q: "Q4 Окт–Дек", items: ["400–700к₽/мес ЗемлеУм", "Аренда: экономика проверена", "Стратегия 2028 готова", "Мини-команда 2–4 чел"] },
    ],
  },
  {
    year: 2028, title: "КАПИТАЛИЗАЦИЯ", color: "#2e7d32",
    goals: [
      { goal: "Земля: системная покупка и портфель", detail: "Портфельный подход, перепродажи + удержание", metric: "Активы 20–50 млн₽, регулярный доход от земли" },
      { goal: "Арендная экосистема: 2–3 объекта", detail: "Эстетика + атмосфера + сервис, сильный визуал", metric: "2–3 объекта, рейтинг 4.8+, стабильный поток" },
      { goal: "BRUSNICA: полноценное производство", detail: "Процессы, регламенты, база подрядчиков", metric: "Выручка 1–2 млн/мес, маржа >40%, без тебя в операционке" },
    ],
    quarters: [
      { q: "Q1", items: ["Автоматизация контента", "Полноц. производство BRUSNICA", "2й объект аренды строится", "COO поиск начат"] },
      { q: "Q2", items: ["YouTube: первые видео", "Выручка BRUSNICA 1млн+/мес", "2й объект аренды запущен", "Узнаваемость в нише"] },
      { q: "Q3", items: ["Первое выступление/интервью", "COO найден", "3й объект аренды старт", "Активы 15–30 млн₽"] },
      { q: "Q4", items: ["Стратегия 2029 готова", "3 объекта сданы", "Активы 20–50 млн₽", "Команда работает сама"] },
    ],
  },
  {
    year: 2029, title: "ЭКОСИСТЕМА", color: "#c84b31",
    goals: [
      { goal: "Уйти из операционки в стратегию", detail: "COO, системные процессы, KPI для команды", metric: "80% операционки делегировано, 20 ч/нед максимум" },
      { goal: "Агроферма: старт и концепция", detail: "Земля под ферму, инфраструктура, гостевые пространства", metric: "Земля есть, концепция готова, первые гостевые в работе" },
      { goal: "Публичность за пределами Telegram", detail: "YouTube активно, интервью 3–5 штук, выступления", metric: "10 000+ подписчиков (ТГ+YouTube), узнаваемость в нише" },
    ],
    quarters: [
      { q: "Q1", items: ["YouTube канал запущен", "COO ищется/найден", "Земля под ферму выбрана", "Аренда: 3–4 объекта"] },
      { q: "Q2", items: ["1–2 интервью опубликовано", "5 000+ суммарно аудитория", "Базовая инфраструктура фермы", "Делегирование работает"] },
      { q: "Q3", items: ["Выступление на форуме", "Ты в стратегии, не операционке", "1е гостевые пространства", "Экспертный статус"] },
      { q: "Q4", items: ["Стратегия 2030 готова", "Активы 50–100 млн₽", "Ферма = часть бренда", "10к+ охват медиа"] },
    ],
  },
  {
    year: 2030, title: "ЗАКРЕПЛЕНИЕ", color: "#1565c0",
    goals: [
      { goal: "Система без твоего напряжения", detail: "Все направления управляются командой", metric: "Выручка без тебя в операционке, спокойствие — норма" },
      { goal: "Образовательный проект: старт школы", detail: "Концепция, философия, сообщество, пилот", metric: "Концепция готова, 1е мероприятия, 200+ чел в сообществе" },
      { goal: "Активы 150–400+ млн₽ и инвест. стратегия", detail: "Земля, производство, аренда, защита капитала", metric: "Активы подтверждены, диверсификация, пассивный доход" },
    ],
    quarters: [
      { q: "Q1", items: ["Образоват. концепция v1", "Все системы работают", "Инвест. стратегия v1", "Видео-масштаб"] },
      { q: "Q2", items: ["1е мероприятия школы", "COO управляет полностью", "Капитал защищён", "Пассивный доход 10%+"] },
      { q: "Q3", items: ["Школа: пилот", "Активы 100–200 млн₽", "Долгосрочные инвестиции", "Зрелость в решениях"] },
      { q: "Q4", items: ["Итог 5 лет / манифест", "Активы 150–400+ млн₽", "Стратегия 2031–2035", "Ты живёшь — не выживаешь"] },
    ],
  },
];

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "olga_planner_v2";

function loadState() {
  try {
    const raw = window.storage ? null : null; // use in-memory
    return null;
  } catch { return null; }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function pct(done, total) {
  if (!total) return 0;
  return Math.round((done / total) * 100);
}

function interpolateColor(pctVal) {
  // 0% → red-ish, 50% → yellow, 100% → green
  const r = pctVal < 50 ? 220 : Math.round(220 - (pctVal - 50) * 2.4);
  const g = pctVal < 50 ? Math.round(pctVal * 3.6) : 180;
  const b = 40;
  return `rgb(${r},${g},${b})`;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ProgressRing({ pct: p, size = 56, stroke = 5 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (p / 100) * circ;
  const color = interpolateColor(p);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.4s ease" }} strokeLinecap="round" />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        style={{ transform: "rotate(90deg)", transformOrigin: "center", fill: color, fontSize: size * 0.22, fontWeight: 700, fontFamily: "sans-serif" }}>
        {p}%
      </text>
    </svg>
  );
}

function WeekCard({ week, checks, onToggle, monthDone }) {
  const mc = MONTH_COLORS[week.month] || MONTH_COLORS["Июнь"];
  const tasksDone = week.tasks.filter((_, i) => checks.tasks?.[i]).length;
  const goalsDone = week.goals.filter((_, i) => checks.goals?.[i]).length;
  const totalItems = week.tasks.length + week.goals.length;
  const totalDone = tasksDone + goalsDone;
  const p = pct(totalDone, totalItems);

  // Fade when month is fully done
  const opacity = monthDone ? 0.35 : 1;

  return (
    <div style={{
      background: mc.soft,
      borderRadius: 16,
      border: `1px solid ${mc.accent}33`,
      padding: "20px 22px",
      marginBottom: 16,
      opacity,
      transition: "opacity 0.6s ease",
      boxShadow: monthDone ? "none" : `0 2px 20px ${mc.accent}22`,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        <ProgressRing pct={p} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: mc.accent, fontWeight: 700 }}>{week.label}</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{week.dates}</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.4)", background: mc.bg, padding: "2px 8px", borderRadius: 20 }}>{week.month}</span>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 4, lineHeight: 1.4 }}>{week.focus}</div>
        </div>
      </div>

      {/* 3 Goals */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: mc.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>🎯 3 Цели недели</div>
        {week.goals.map((g, i) => {
          const done = checks.goals?.[i];
          return (
            <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5, cursor: "pointer" }}>
              <input type="checkbox" checked={!!done} onChange={() => onToggle("goals", i)}
                style={{ marginTop: 2, accentColor: mc.accent, width: 14, height: 14, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.9)",
                textDecoration: done ? "line-through" : "none", lineHeight: 1.4, transition: "all 0.2s" }}>{g}</span>
            </label>
          );
        })}
      </div>

      {/* Tasks */}
      <div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>
          ✅ Задачи ({tasksDone}/{week.tasks.length})
        </div>
        {week.tasks.map((t, i) => {
          const done = checks.tasks?.[i];
          return (
            <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4, cursor: "pointer" }}>
              <input type="checkbox" checked={!!done} onChange={() => onToggle("tasks", i)}
                style={{ marginTop: 2, accentColor: mc.accent, width: 13, height: 13, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: done ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)",
                textDecoration: done ? "line-through" : "none", lineHeight: 1.4, transition: "all 0.2s" }}>{t}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function MonthBlock({ month, weeks, allChecks, onToggle }) {
  const mc = MONTH_COLORS[month] || MONTH_COLORS["Июнь"];
  const totalItems = weeks.reduce((s, w) => s + w.tasks.length + w.goals.length, 0);
  const totalDone = weeks.reduce((s, w) => {
    const c = allChecks[w.id] || {};
    return s + w.tasks.filter((_,i) => c.tasks?.[i]).length + w.goals.filter((_,i) => c.goals?.[i]).length;
  }, 0);
  const p = pct(totalDone, totalItems);
  const monthDone = p === 100;

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Month Header */}
      <div style={{
        background: `linear-gradient(135deg, ${mc.bg}, ${mc.soft})`,
        borderRadius: 12,
        padding: "16px 22px",
        marginBottom: 16,
        border: `1px solid ${mc.accent}55`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: monthDone ? 0.5 : 1,
        transition: "opacity 0.6s ease",
      }}>
        <ProgressRing pct={p} size={64} stroke={6} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: mc.accent, fontFamily: "'Georgia', serif", letterSpacing: -0.5 }}>
            {month} 2026
            {monthDone && <span style={{ marginLeft: 10, fontSize: 18 }}>✓ Выполнен</span>}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
            {totalDone} из {totalItems} пунктов · {weeks.length} недель
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: interpolateColor(p), lineHeight: 1 }}>{p}%</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>КПИ месяца</div>
        </div>
      </div>

      {weeks.map(w => (
        <WeekCard key={w.id} week={w}
          checks={allChecks[w.id] || {}}
          onToggle={(type, idx) => onToggle(w.id, type, idx)}
          monthDone={monthDone} />
      ))}
    </div>
  );
}

function YearCard({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "#111827",
      borderRadius: 16,
      border: `1px solid ${data.color}44`,
      marginBottom: 20,
      overflow: "hidden",
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        background: `linear-gradient(135deg, #111827, ${data.color}15)`,
      }}>
        <div>
          <div style={{ fontSize: 11, color: data.color, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
            {data.year}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Georgia', serif" }}>
            {data.title}
          </div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 22, color: data.color }}>{open ? "▲" : "▼"}</div>
      </div>

      {open && (
        <div style={{ padding: "0 24px 24px" }}>
          {/* Goals */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: data.color, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
              🎯 3 Главные цели
            </div>
            {data.goals.map((g, i) => (
              <div key={i} style={{
                background: `${data.color}12`,
                border: `1px solid ${data.color}33`,
                borderRadius: 10,
                padding: "12px 16px",
                marginBottom: 8,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{g.goal}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>{g.detail}</div>
                <div style={{ fontSize: 11, color: data.color }}>📊 {g.metric}</div>
              </div>
            ))}
          </div>

          {/* Quarters */}
          <div style={{ fontSize: 11, color: data.color, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
            📆 По кварталам
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {data.quarters.map((q, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 10,
                padding: "12px 14px",
                border: `1px solid rgba(255,255,255,0.08)`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: data.color, marginBottom: 8 }}>{q.q}</div>
                {q.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 4, paddingLeft: 8, borderLeft: `2px solid ${data.color}55` }}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [checks, setChecks] = useState({});
  const [tab, setTab] = useState("2026");

  function toggleCheck(weekId, type, idx) {
    setChecks(prev => {
      const week = prev[weekId] || {};
      const arr = week[type] ? { ...week[type] } : {};
      arr[idx] = !arr[idx];
      return { ...prev, [weekId]: { ...week, [type]: arr } };
    });
  }

  // Global stats
  const totalItems2026 = WEEKS_2026.reduce((s, w) => s + w.tasks.length + w.goals.length, 0);
  const totalDone2026 = WEEKS_2026.reduce((s, w) => {
    const c = checks[w.id] || {};
    return s + w.tasks.filter((_,i) => c.tasks?.[i]).length + w.goals.filter((_,i) => c.goals?.[i]).length;
  }, 0);
  const globalPct = pct(totalDone2026, totalItems2026);

  const months = [...new Set(WEEKS_2026.map(w => w.month))];

  const TABS = ["2026", "2027", "2028", "2029", "2030"];

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff" }}>
      {/* Top header */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #0a1a2e 50%, #0a2e1a 100%)",
        padding: "24px 24px 0",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>ЗемлеУм · BRUSNICA · Аренда</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Georgia', serif" }}>Дорожная карта 2026–2030</div>
            </div>
            {tab === "2026" && (
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: interpolateColor(globalPct), lineHeight: 1 }}>{globalPct}%</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>КПИ 2026</div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "8px 18px",
                background: tab === t ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none", borderBottom: tab === t ? "2px solid #9b59b6" : "2px solid transparent",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: 13, fontWeight: tab === t ? 700 : 400,
                cursor: "pointer", borderRadius: "8px 8px 0 0",
                transition: "all 0.2s",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 60px" }}>

        {tab === "2026" && (
          <>
            {/* Summary bar */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 12,
              padding: "14px 20px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Прогресс 2026 ({totalDone2026}/{totalItems2026} пунктов)</span>
                  <span style={{ fontSize: 11, color: interpolateColor(globalPct), fontWeight: 700 }}>{globalPct}%</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${globalPct}%`,
                    background: `linear-gradient(90deg, #e74c3c, #f39c12, #27ae60)`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: `${globalPct}% 0`,
                    transition: "width 0.4s ease",
                    borderRadius: 3,
                  }} />
                </div>
              </div>
            </div>

            {months.map(month => (
              <MonthBlock
                key={month}
                month={month}
                weeks={WEEKS_2026.filter(w => w.month === month)}
                allChecks={checks}
                onToggle={toggleCheck}
              />
            ))}
          </>
        )}

        {tab !== "2026" && (
          <>
            {YEARS_DATA.filter(y => y.year === parseInt(tab)).map(y => (
              <YearCard key={y.year} data={y} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
