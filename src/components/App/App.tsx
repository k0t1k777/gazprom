import Header from 'src/components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/SideBar/SideBar';
import 'src/components/App/App.scss';

export default function App() {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('id', e.currentTarget.id);
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const itemId = e.dataTransfer.getData('id');
  //   const draggedElement = document.getElementById(itemId) as HTMLElement;
  
  //   if (draggedElement) {
  //     const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
  //     clonedElement.id = itemId + '-' + Date.now();
  
  //     const dropTarget = e.currentTarget;
  
  //     const dropTargetRect = dropTarget.getBoundingClientRect();
  //     const offsetX = e.clientX - dropTargetRect.left;
  //     const offsetY = e.clientY - dropTargetRect.top;
  
  //     clonedElement.style.position = 'absolute';
  //     clonedElement.style.left = `${offsetX}px`;
  //     clonedElement.style.top = `${offsetY}px`;
  
  //     dropTarget.appendChild(clonedElement);
  //   }
  // };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const itemId = e.dataTransfer.getData('id');
    const draggedElement = document.getElementById(itemId) as HTMLElement;
  
    if (draggedElement) {
      const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
      clonedElement.id = itemId + '-' + Date.now();
      
      const dropTarget = e.currentTarget;
  
      const dropTargetRect = dropTarget.getBoundingClientRect();
      
      const cellWidth = 330;
      const cellHeight = 157;
      
      const columnIndex = Math.floor((e.clientX - dropTargetRect.left) / cellWidth);
      const rowIndex = Math.floor((e.clientY - dropTargetRect.top) / cellHeight);
  
      clonedElement.style.position = 'absolute';
      clonedElement.style.left = `${columnIndex * cellWidth}px`;
      clonedElement.style.top = `${rowIndex * cellHeight}px`;
  
      dropTarget.appendChild(clonedElement);
    }
  };
  

  return (
    <div>
      <Header onDragStart={handleDragStart} />
      <div className='conteiner'>
        <SideBar />
        <Outlet context={{ allowDrop, handleDrop }} />
      </div>
    </div>
  );
}
