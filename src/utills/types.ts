export interface initialCardsProps {
  id: string;
  name: string;
  position?: string;
  title?: string;
  photo?: string;
  count?: number;
  cellId?: string;
  subordinates?: initialCardsProps[];
}