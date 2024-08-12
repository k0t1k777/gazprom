import 'src/components/App/App.scss';
import Header from 'src/components/Header/Header';
import SideBar from 'src/components/SideBar/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initialCards } from 'src/services/mock';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Registration from 'src/pages/Registration/Registration';
import {
  membersProps,
  RegisterDataProps,
} from 'src/services/types';
import {
  registerUser,
  selectUsers,
  setLoggedIn,
} from 'src/store/features/slice/userSlice';
import { allowDrop, handleDragStart, handleDrop } from 'src/services/dragAndDrop';
import { selectMembers } from 'src/store/features/slice/membersSlice';

export default function App() {
  let { loggedIn } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [droppedCards, setDroppedCards] = useState<membersProps[]>([]);
  const [cards, setCards] = useState<membersProps[]>(initialCards);

  function handleRegister({ email, password }: RegisterDataProps) {
    dispatch(registerUser({ email, password }))
      .unwrap()
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access);
          dispatch(setLoggedIn(true));
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoggedIn(true));
    }
  }, [dispatch]);
  const { members } = useAppSelector(selectMembers);
  return (
    <div>
      <Header droppedCards={droppedCards} />
      {loggedIn ? (
        <div className='container'>
          <SideBar />
          <Outlet
            context={{
              allowDrop,
              handleDrop: (e: React.DragEvent<HTMLDivElement>) =>
                handleDrop(e, cards, setCards, droppedCards, setDroppedCards, members),
              handleDragStart,
              cards,
            }}
          />
        </div>
      ) : (
        <Registration handleRegister={handleRegister} />
      )}
    </div>
  );
}
