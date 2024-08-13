// export interface CardProps {
//   id: string;
//   isFilterOpen?: boolean;
//   employesRout?: boolean;
//   position?: string;
//   title?: string;
//   count?: number;
//   name?: string;
//   index?: number;
//   onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
//   draggable?: boolean;
// }

// export interface initialCardsProps {
//   id: string;
//   full_name: string;
//   position: string;
//   title: string;
//   photo?: string;
//   cellId: string;
//   parentId?: string;
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
  photo?: string;
  count?: number;
  subordinates?: membersProps[];
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  isFilterOpen?: boolean;
  employesRout?: boolean;
}

export interface RegisterDataProps {
  email: string;
  password: string;
}

export interface DroppedCard {
  id: string;
  cellId: string;
}

export interface ProfileProps {
  email: string;
  full_name: string;
  image: string;
  profile: {
    phone: string | null;
    telegram: string | null;
    bio: string;
    position: string;
    birthday: string | null;
    time_zone: number;
  };
  projects: any[];
}

export interface ProjectseProps {
  name: string;
  id?: string;
  teams?: {
    name?: string;
    id?: string;
  }[];
}

export interface TeamsProps {
  name: string;
  id?: string;
  projects?: {
    name?: string;
    id?: string;
  }[];
}
