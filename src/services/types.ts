export interface CardProps {
  id: string;
  isFilterOpen?: boolean;
  employesRout?: boolean;
  position?: string;
  title?: string;
  count?: number;
  name?: string;
  index?: number;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
}

// export interface initialCardsProps {
//   id: string;
//   name: string;
//   position: string;
//   title: string;
//   photo: string;
//   cellId: string;
//   parentId?: string;
//   newId?: string;
//   subordinates: initialCardsProps[];
// }

export interface membersProps {
  id: string;
  index?: number;
  title?: string;
  full_name?: string;
  department?: string;
  position?: string;
  cellId?: string;
  parentId?: string;
  subordinates?: membersProps[];
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
}

export interface RegisterDataProps {
  email: string;
  password: string;
}

export interface DroppedCard {
  id: string;
  cellId: string;
}
