import { Outlet } from 'react-router-dom';
import 'src/components/App/App.scss';
import Header from 'src/components/Header/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />     
    </div>
  );
}
