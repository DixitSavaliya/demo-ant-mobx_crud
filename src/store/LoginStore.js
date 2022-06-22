import {
    action,
    makeObservable,
    observable
} from 'mobx';

class LoginStore {
    data = {};

    constructor() {
        makeObservable(this, {
            data: observable,
            login: action
        });
    }

    login = async (authData) => {
     localStorage.setItem('token',authData.token);
     this.data = authData;
    };
}

const loginStore = new LoginStore();

export default loginStore;