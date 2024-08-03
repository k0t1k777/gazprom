import Header from 'src/components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/SideBar/SideBar';
import 'src/components/App/App.scss';
import { useState } from 'react';

export interface DroppedCard {
  id: string;
  cellId: string;
}

export default function App() {

  // ДНД
  const [droppedCards, setDroppedCards] = useState<DroppedCard[]>([]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const itemId = e.currentTarget.id;

    if (droppedCards.some(card => card.id === itemId)) {
      e.preventDefault();
    } else {
      e.dataTransfer.setData('id', itemId);
    }
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const itemId = e.dataTransfer.getData('id');
  
    const dropTarget = e.currentTarget;
    const dropTargetRect = dropTarget.getBoundingClientRect();
    
    const cellWidth = 330;
    const cellHeight = 157;
  
    const columnIndex = Math.floor((e.clientX - dropTargetRect.left) / cellWidth);
    const rowIndex = Math.floor((e.clientY - dropTargetRect.top) / cellHeight);
  
    const cellId = `${columnIndex}-${rowIndex}`;
  
    if (!droppedCards.some(card => card.cellId === cellId)) {
      setDroppedCards(prev => [...prev, { id: itemId, cellId }]);
  
      const draggedElement = document.getElementById(itemId) as HTMLElement;
  
      if (draggedElement) {
        const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
        clonedElement.id = itemId + '-' + Date.now();
  
        clonedElement.style.position = 'absolute';
        clonedElement.style.left = `${columnIndex * cellWidth}px`;
        clonedElement.style.top = `${rowIndex * cellHeight}px`;
  
        dropTarget.appendChild(clonedElement);
      }
    }
  };
   
  return (
    <div>
      <Header onDragStart={handleDragStart} droppedCards={droppedCards} />
      <div className='conteiner'>
        <SideBar />
        <Outlet context={{ allowDrop, handleDrop, droppedCards }} />
      </div>
    </div>
  );
}
