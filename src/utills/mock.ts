export interface initialCardsProps {
  id: string;
  name: string;
  position?: string;
  title?: string;
  photo?: string;
  count?: number;
  subordinates?: initialCardsProps[];
}

export const initialCards = [
  {
    id: '0',
    name: 'Директор',
    position: 'Разработчик',
    title: 'Frontend Developer',
    photo: 'https://example.com/photo1.jpg',
    count: 1,
    cellId: '1-0',
    subordinates: [
      // {
      //   id: '1',
      //   name: 'Иван Мария Петрова',
      //   position: 'Разработчик',
      //   title: 'Frontend Developer',
      //   photo: 'https://example.com/photo1.jpg',
      //   count: 1,
      //   subordinates: [],
      // },
      // {
      //   id: '2',
      //   name: 'Мария Петрова Иванов',
      //   position: 'Разработчик',
      //   title: 'Frontend Developer',
      //   photo: 'https://example.com/photo1.jpg',
      //   count: 1,
      //   subordinates: [
      //     {
      //       id: '3',
      //       name: 'Иван Петрова',
      //       position: 'Разработчик',
      //       title: 'Frontend Developer',
      //       photo: 'https://example.com/photo1.jpg',
      //       count: 1,
      //       subordinates: [
      //         {
      //           id: '4',
      //           name: 'Мария Аны',
      //           count: 10,
      //           position: 'Разработчик',
      //           title: 'Frontend Developer',
      //           photo: 'https://example.com/photo1.jpg',
      //           subordinates: [],
      //         },
      //         {
      //           id: '5',
      //           name: 'Мария Аны',
      //           position: 'Разработчик',
      //           title: 'Frontend Developer',
      //           photo: 'https://example.com/photo1.jpg',
      //           count: 1,
      //           subordinates: [],
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
];

export const cardsList = [
  {
    id: '6',
    name: 'Иван',
    position: 'Разработчик',
    title: 'Frontend Developer',
    photo: 'https://example.com/photo1.jpg',
    count: 10,
    subordinates: [],
  },
  {
    id: '7',
    name: 'Мария',
    position: 'Дизайнер',
    title: 'UI/UX Designer',
    photo: 'https://example.com/photo2.jpg',
    count: 15,
    subordinates: [],
  },
  {
    id: '8',
    name: 'Сергей',
    position: 'Менеджер',
    title: 'Project Manager',
    photo: 'https://example.com/photo3.jpg',
    count: 5,
    subordinates: [],
  },
  {
    id: '9',
    name: 'Ольга',
    position: 'Аналитик',
    title: 'Data Analyst',
    photo: 'https://example.com/photo4.jpg',
    count: 8,
    subordinates: [],
  },
  {
    id: '10',
    name: 'Алексей Сидоров',
    position: 'Тестировщик',
    title: 'QA Engineer',
    photo: 'https://example.com/photo5.jpg',
    count: 12,
    subordinates: [],
  },
];

