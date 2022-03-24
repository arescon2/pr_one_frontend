const getTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

const DicSex = [
  {
    id: 1,
    name: 'Мужской',
    short: 'М',
  },
  {
    id: 2,
    name: 'Женский',
    short: 'Ж',
  },
];

export { getTokens, setTokens, DicSex };