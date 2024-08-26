import { ProfileProps } from 'src/services/types';

export const mockProfile: ProfileProps = {
  email: 'admin@admin.com',
  full_name: 'Иванов Геннадий Викторович',
  image:
    '/media/images/users/generated_image_751bad47f6dc11eeb20086a042c20b35_QImJNJ3.jpeg',
  profile: {
    phone: '89305557535',
    telegram: '@telegram',
    bio: '',
    position: 'Ведущий разработчик',
    birthday: '18.06.1986',
    time_zone: 3,
  },
  projects: ['Голубой Пламенный', 'Северный Поток', 'Турбина'],
};
