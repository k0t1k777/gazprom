import { ProfileProps } from 'src/services/types';
const BASE_URL = import.meta.env.VITE_PUBLIC_URL;

export const mockProfile: ProfileProps = {
  email: 'admin@admin.com',
  full_name: 'Иванов Геннадий Викторович',
  image: `${BASE_URL}/assets/images/unsplash_kMJp7620W6U.png`,
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
