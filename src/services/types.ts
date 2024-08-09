export interface initialCardsProps {
  id: string;
  name: string;
  position: string;
  title: string;
  photo: string;
  cellId: string;
  parentId?: string;
  subordinates: initialCardsProps[];
}

export interface membersProps {
  id: string;
  full_name: string;
  position: string;
  subordinates: initialCardsProps[];
}

export interface RegisterDataProps {
  email: string;
  password: string;
}
