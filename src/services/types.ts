export interface membersProps {
  id: string;
  index?: number;
  title?: string;
  full_name?: string;
  department?: string;
  position?: string;
  cellId?: string;
  parentId?: string;
  parent_id?: string;
  image?: string;
  count?: number;
  subordinates?: membersProps[];
  hideMembers?: () => void;
  restoreMembers?: () => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
  isFilterOpen?: boolean;
  positions?: string;
}

export interface membersResultProps {
  count: number;
  results: {
    id: string;
    title?: string;
    full_name?: string;
    department?: string;
    position?: string;
    image?: string;
    positions?: string;
    city?: string;
  }[];
}

export interface SelectsProps {
  positions: string[];
  departments: string[];
  cities: string[];
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
  description?: string;
  teams?: {
    name?: string;
    id?: string;
  }[];
  started?: string;
  ended?: string;
}

export interface TeamsProps {
  name: string;
  id?: string;
  description?: string;
  employees?: any;
  owner?: number;
  projects?: {
    name?: string;
    id?: string;
  }[];
}

export interface FiltersProps {
  cities: string[];
  departments: string[];
  positions: string[];
}
