// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const servicesData: {
  [key: string]: {
    id: number;
    title?: string;
    service?: string;
    price: string;
  }[];
}[] = [
  {
    "Сервизни услуги": [
      {
        id: 1,
        title: "Почистване на стационарна машина от прах и обезшумяване",
        price: "18 лв.",
      },
      {
        id: 2,
        service:
          "Почистване на преносим компютър от прах, смяна на термопаста и термогуми",
        price: "45 лв.",
      },
      {
        id: 3,
        service: "Почистване на вируси",
        price: "36 лв.",
      },
      {
        id: 4,
        service: "Възстановяване на изтрита информация",
        price: "60 лв.",
      },
      {
        id: 5,
        service: "Разделяне, обединяване и форматиране на твърд диск",
        price: "20 лв.",
      },
      {
        id: 6,
        service:
          "Прехвърляне на информация, ако носителите на информацията са изправни",
        price: "30 лв.",
      },
      {
        id: 7,
        service: "Смяна на кондензатор или друг елемент на платки",
        price: "5 лв.",
      },
    ],

    "Услуги за стационарна машина": [
      {
        id: 8,
        service: "Диагностика на стационарна машина",
        price: "18 лв.",
      },
      {
        id: 9,
        service: "Асемблиране на стационарна машина",
        price: "30 лв.",
      },
      {
        id: 10,
        service: "Диагностика на компонент",
        price: "9 лв.",
      },
      {
        id: 11,
        service: "Смяна или монтаж на компонент (HDD, VGA, RAM)",
        price: "9 лв.",
      },
      {
        id: 12,
        service: "Смяна на процесор (Включва смяна на паста и почистване)",
        price: "25 лв.",
      },
      {
        id: 13,
        service:
          "Смяна на хард диск с прехвърляне на информацията (ако дискът е работещ)",
        price: "40 лв.",
      },
      {
        id: 14,
        service: "Смяна на дънна платка",
        price: "30 лв.",
      },
      {
        id: 15,
        service: "Смяна на BIOS (Обновяване на версията)",
        price: "30 лв.",
      },
      {
        id: 16,
        service: "Ремонт на дънна платка",
        price: "25 лв. – 45 лв.",
      },
      {
        id: 17,
        service: "Ремонт на захранване",
        price: "15 лв. – 35 лв.",
      },
      {
        id: 18,
        service: "Смяна на вентилатор или монтаж на такъв",
        price: "10 лв.",
      },
    ],
    "Услуги за преносим компютър": [
      {
        id: 19,
        service: "Диагностика на преносим компютър (Софтуерна)",
        price: "18 лв.",
      },
      {
        id: 20,
        service: "Диагностика на преносим компютър (Хардуерна)",
        price: "35 лв.",
      },
      {
        id: 21,
        service: "Смяна или добавяне на рам памет с тест на рамта",
        price: "10 лв.",
      },
      {
        id: 22,
        service: "Смяна на хард диск",
        price: "10 лв.",
      },
      {
        id: 23,
        service: "Смяна на хард диск с прехвърляне на информацията",
        price: "40 лв.",
      },
      {
        id: 24,
        service: "Ремонт на дънна платка",
        price: "85 лв. – 120 лв.",
      },
      {
        id: 25,
        service:
          "Смяна на дънна платка (цената не включва новата дънна платка)",
        price: "60 лв.",
      },
      {
        id: 26,
        service: "Смяна на дисплей/матрица (матрицата се заплаща отделно)",
        price: "30 лв.",
      },
      {
        id: 27,
        service:
          "Ремонт/смяна на панти (цената не включва новите панти ако се налага)",
        price: "45 лв.",
      },
      {
        id: 28,
        service: "Смяна на клавиатура",
        price: "20 лв.",
      },
      {
        id: 29,
        service: "Смяна на оптично устройство",
        price: "10 лв.",
      },
      {
        id: 30,
        service: "Ремонт на захранване (адаптор)",
        price: "15 лв.",
      },
      {
        id: 31,
        service: "Смяна на вентилатор",
        price: "45 лв.",
      },
      {
        id: 32,
        service:
          "Смяна на захранваща букса за лаптоп (USB букса, ЖАК за слушалки и др.)",
        price: "60 лв.",
      },
      {
        id: 33,
        service: "Ремонт на матрица на лаптоп (ремонт по електрониката)",
        price: "65 лв.",
      },
      {
        id: 34,
        service: "Препрограмиране на BIOS",
        price: "80 лв.",
      },
    ],
    "GSM Услуги": [
      {
        id: 35,
        service: "Първоначална диагностика",
        price: "Безплатна",
      },
      {
        id: 36,
        service: 'Смяна на букса (USB- 3.5" Jack и др.)',
        price: "25 лв. – 45 лв.",
      },
      {
        id: 37,
        service: "Смяна на дисплай",
        price: "N/A",
      },
    ],
    "Софтуерни решения": [
      {
        id: 38,
        service:
          "Софтуерна профилактика почистване на ненужни файлове и излишни програми",
        price: "30 лв.",
      },
      {
        id: 39,
        service:
          "Инсталиране на програми, драйвери, антивирусна и др. (със софтуер на клиента)",
        price: "10 лв. за бр.",
      },
      {
        id: 40,
        service: "Почистване на вируси",
        price: "36 лв.",
      },
      {
        id: 41,
        service:
          "Преинсталиране на Windows само ако клиентът има оригинален лиценз или ще закупи такъв (включва инсталиране на драйвери и настройка)",
        price: "24 лв.",
      },
      {
        id: 42,
        service: "Инсталиране на набор от безплатни програми за общо ползване",
        price: "18 лв.",
      },
    ],
  },
];

async function main() {
  for (const [categoryTitle, services] of Object.entries(servicesData[0])) {
    const category = await prisma.serviceCategory.create({
      data: {
        title: categoryTitle,
      },
    });

    for (const service of services) {
      await prisma.service.create({
        data: {
          title: service.title || service.service || "",
          price: parsePrice(service.price),
          category: {
            connect: { id: category.id },
          },
        },
      });
    }
  }
}

function parsePrice(price: string): number {
  if (!price || price === "N/A" || price === "Безплатна") return 0;

  const prices = price
    .split("–")
    .map((p) => parseInt(p.trim().replace(" лв.", ""), 10));
  return prices[0]; // Returning the lower bound if a range is provided
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
