import {
  action,
  autorun,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { getData } from '../service';

class UserStore {
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (text) => (
        <a href={text}>
          {text}
        </a>
      ),
    },
  ];

  data = [];

  constructor() {
    makeObservable(this, {
      columns: observable,
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
