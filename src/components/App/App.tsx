import 'src/components/App/App.scss';
import Header from 'src/components/Header/Header';
import SideBar from 'src/components/SideBar/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import Registration from 'src/pages/Registration/Registration';
import Preloader from 'src/ui/Preloader/Preloader';
import { fetchGetTeamsId } from 'src/store/features/slice/teamsSlice';
import { id } from 'src/services/const';
import { selectMembers } from 'src/store/features/slice/membersSlice';
import { membersProps, RegisterDataProps } from 'src/services/types';
import {
  allowDrop,
  handleDragStart,
  handleDrop,
} from 'src/services/dragAndDrop';
import {
  fetchRegisterUser,
  selectUsers,
  setLoading,
  setLoggedIn,
} from 'src/store/features/slice/userSlice';


export default function App() {
  const { loggedIn, loading } = useAppSelector(selectUsers);
  const [droppedCards, setDroppedCards] = useState<membersProps[]>([]);
  const { cards } = useAppSelector(selectMembers);
  const { members } = useAppSelector(selectMembers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mainRout = location.pathname === '/';

  function handleRegister({ email, password }: RegisterDataProps) {
    dispatch(setLoading(true));
    dispatch(fetchRegisterUser({ email, password }))
      .unwrap()
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
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
    if (mainRout && loggedIn) {
      fetchTeamsId();
    }
  }, [dispatch, mainRout, loggedIn]);

   return (
    <>
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
    </>
  );
}
