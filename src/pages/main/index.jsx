import { useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Card, Elevation, H3, H4, H5, Icon } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';

import Table from 'rc-table';

import { setPageTitle } from '../../features/stores/mainSlice';
import { useLoading } from '../../hooks';

import './styles.scss';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apps = [
  {
    id: nanoid(),
    type: 'journal',
    title: 'Школа #12',
    access: '2022-01-13',
  },
  {
    id: nanoid(),
    type: 'sklad',
    title: 'Ателье',
    access: '2021-12-13',
  },
  {
    id: nanoid(),
    type: 'journal',
    title: 'Школа №16',
    access: '2021-12-15',
  }
];

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appList, setApplist] = useState([]);

  const getApps = () => {
    setApplist(apps);
  }

  useEffect(() => {
    dispatch(setPageTitle('Инфопанель'));
    getApps();
  }, []);

  const appName = (type) => {
    return {
      journal: 'Расписание, журнал - ',
      sklad: 'Склад - '
    }[type]
  };

  const appAccessCalc = (date) => {
    const formatedDate = DateTime.fromISO(date);
    const now = DateTime.now();
    const curDate = DateTime.fromISO(`${now.year}-${now.month}-${now.day}`);
    
    let diffInDays = formatedDate.diff(curDate, 'days').toObject();

    let textDay = 'дней';
    if(diffInDays.days == 1) textDay = 'день';
    if([2,3,4].findIndex(el => el == diffInDays.days) > -1) textDay = 'дня';

    let status = `осталось ${diffInDays.days} ${textDay}`;
    if(diffInDays.days == 0) status = 'последний день, продлите подписку';
    if(diffInDays.days < 0) status = 'недоступен, продлите подписку';

    let color = 'success';
    if(diffInDays.days <= 7) color = 'warning';
    if(diffInDays.days <= 0) color = 'danger';

    return [status, color];
  };

  const handlerToApp = (type, id) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <H4>Ваши приложения</H4>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {
            appList.map(el => {
              let [textAccesses, colorAccesses] = appAccessCalc(el.access);

              return <Card
                key={nanoid()}
                className={`item-apps ${el.type} ${colorAccesses}`}
                interactive={true}
                elevation={Elevation.TWO}
                onClick={() => handlerToApp(el.type, el.id)}
              >
                <H5>{appName(el.type)} {el.title}</H5>
                {textAccesses}
              </Card>
            })
          }
        </Col>
      </Row>
    </Container>
  )
}

export default MainPage;
