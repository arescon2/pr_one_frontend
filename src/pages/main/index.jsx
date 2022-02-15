import { useState } from 'react';

  const getApps = () => {
    setApplist(apps);
  }

  useEffect(() => {
    dispatch(setPageTitle('Инфопанель'));
    getApps();
  }, []);

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
    <div>
      Main page
    </div>
  )
}

export default MainPage;
