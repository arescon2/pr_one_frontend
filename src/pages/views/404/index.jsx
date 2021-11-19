import { Button, NonIdealState } from '@blueprintjs/core';
import { useNavigate } from 'react-router';

import './style.scss';

const NotPage = () => {
  const navigate = useNavigate();
  return (
    <NonIdealState
      icon={"code"}
      action={<Button text='На главную страницу' intent='primary' onClick={()=> navigate('/')} />}
      title="404"
      description={'Страница не существует'}
    />
  )
}

export default NotPage;
