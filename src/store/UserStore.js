import {
  action,
  autorun,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { getData } from '../service';

class UserStore {
 

  data = [];

  constructor() {
    makeObservable(this, {
      data: observable,
      updateUser: action,
      addUser: action,
    });
    autorun(this.autoRunDetails);
    runInAction(this.fetchData);
  }

  fetchData = async () => {
    const data = await getData();
    this.data = data;
  };

  autoRunDetails = () => {
  };

  updateUser = () => {
  };

  addUser = () => {
  };
}

const userStore = new UserStore();

export default userStore;
