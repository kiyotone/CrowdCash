const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
}

export { setToken, removeToken, getToken };