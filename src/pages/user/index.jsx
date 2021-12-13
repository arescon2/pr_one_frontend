import { useOutlet, Outlet, useParams } from 'react-router-dom';
import UserMain from './main';

const UserPage = () => {
  const _outlet = useOutlet();

  if(_outlet) return <Outlet />; else return <UserMain />;
};

export default UserPage;