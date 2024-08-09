export interface initialCardsProps {
  id: string;
  name: string;
  position: string;
  title: string;
  photo: string;
  cellId: string;
  subordinates: initialCardsProps[];
}

export interface RegisterDataProps {
  email: string;
  password: string;
}