import Header from 'src/components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/SideBar/SideBar';
import 'src/components/App/App.scss'
// import Profile from 'src/pages/Profile/Profile';

export default function App() {
  return (
    <div>
      <Header />
      <div className='conteiner'>
        {/* <Profile /> */}
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
