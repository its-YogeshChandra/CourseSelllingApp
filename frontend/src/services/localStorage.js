export class LocalStorageClass {
  setinStorage(name, data) {
    const reqData = JSON.stringify(data);
    localStorage.setItem(name, reqData);
  }

  getfromStorage(name) {
    const data = JSON.parse(localStorage.getItem(name));
    return data;
  }

  removefromStorage(name) {
      localStorage.removeItem(name);
  }

  cleartheStorage() {
      localStorage.clear();
  }
}

const localStorageService = new LocalStorageClass()

export default localStorageService ;