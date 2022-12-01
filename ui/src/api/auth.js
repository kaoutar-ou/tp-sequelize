export function addAuthHeaders() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      console.log(user.accessToken);
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.clear();
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}