import Generator from '../../generator';

const LeftBlock = () => {
  let data = {
    menu: [
      {
        id: 1,
        icon: 'home',
        placeholder: 'Главная страница',
        linkto: '/'
      },
      {
        id: 2,
        icon: 'form',
        placeholder: 'Тикеты',
        linkto: '/page/tickets'
      },
      {
        id: 3,
        icon: 'cog',
        placeholder: 'Настройки',
        linkto: '/page/settings'
      }
    ]
  }

  let json = [
    {
      id: 1,
      element: 'block',
      type: 'Row',
      classes: 'left-menu-wrapper',
      child: [
        {
          element: 'collection',
          data: 'menu',
          child: [
            {
              element: 'block',
              type: 'Col',
              classes: 'centered-child',
              child: [
                {
                  id: 'id',
                  element: 'button',
                  type: 'button',
                  classes: '',
                  size: 'large',
                  icon: 'icon',
                  fill: false,
                  minimal: true,
                  disable: false,
                  linkto: 'linkto',
                  placeholder: 'placeholder'
                }
              ]
            },
          ]
        }
      ]
    }
  ];

  return <div className='left-block'>
    <Generator
      config={json}
      data={data}
      // updData={(new_data) => setData(new_data)}
    />
  </div>
}
export default LeftBlock