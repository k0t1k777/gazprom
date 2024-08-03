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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('id');
    console.log('itemId: ', itemId);
    const draggedElement = document.getElementById(itemId) as HTMLElement;
    console.log('draggedElement: ', draggedElement);

    if (draggedElement) {
      const clonedElement = draggedElement.cloneNode(true) as HTMLElement;
      clonedElement.id = itemId + '-' + Date.now();
      e.currentTarget.appendChild(clonedElement);
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
