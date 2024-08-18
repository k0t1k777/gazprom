import 'src/components/App/App.scss';
import Header from 'src/components/Header/Header';
import SideBar from 'src/components/SideBar/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Registration from 'src/pages/Registration/Registration';
import {
  allowDrop,
  handleDragStart,
  handleDrop,
} from 'src/services/dragAndDrop';
import { selectMembers } from 'src/store/features/slice/membersSlice';
import { membersProps, RegisterDataProps } from 'src/services/types';
import {
  registerUser,
  selectUsers,
  setLoading,
  setLoggedIn,
} from 'src/store/features/slice/userSlice';
import Preloader from 'src/ui/Preloader/Preloader';
import { fetchGetTeamsId } from 'src/store/features/slice/teamsSlice';
import { id } from 'src/services/const';

export default function App() {
  let { loggedIn, loading } = useAppSelector(selectUsers);
  const [droppedCards, setDroppedCards] = useState<membersProps[]>([]);
  let { cards } = useAppSelector(selectMembers);
  const { members } = useAppSelector(selectMembers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mainRout = location.pathname === '/';

  function handleRegister({ email, password }: RegisterDataProps) {
    dispatch(setLoading(true));
    dispatch(registerUser({ email, password }))
      .unwrap()
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access);
          dispatch(setLoggedIn(true));
          navigate('/');
          fetchTeamsId();
        }
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }

  const fetchTeamsId = async () => {
    console.log('fetchTeamsId')
    dispatch(setLoading(true));
    const parsedId = parseInt(id, 10)
    await dispatch(fetchGetTeamsId(parsedId));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setLoggedIn(true));
    }
  }, [dispatch]);

  useEffect(() => {
    if (mainRout) {
      fetchTeamsId();
    }
  }, [dispatch]);

   return (
    <div>
      <Header droppedCards={droppedCards} />
      {loading && <Preloader />}
      {loggedIn ? (
        <div className='container'>
          <SideBar />
          <Outlet
            context={{
              handleRegister,
              allowDrop,
              handleDrop: (e: React.DragEvent<HTMLDivElement>) =>
                handleDrop(
                  e,
                  cards,
                  dispatch,
                  droppedCards,
                  setDroppedCards,
                  members
                ),
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
