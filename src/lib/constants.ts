export const PAGE_SIZE: number = 12;
export const PAGE_SIZE_NEWS: number = 3;

export const productsFilter = [
  { key: "all", label: "Всички" },
  { key: "priceAsc", label: "Цена (Ниска към Висока)" },
  { key: "priceDesc", label: "Цена (Висока към Ниска)" },
  { key: "nameAsc", label: "Име (А-Я)" },
  { key: "nameDesc", label: "Име (Я-А)" },
  { key: "statusAsc", label: "В Наличност" },
];

export const currencies = {
  USD: "1.79187",
  EUR: "1.95583",
  BGN: "1",
};

const hours = 23;
const expires = hours * 60 * 60; // 23 hours in seconds

export const redisExpire = expires;
