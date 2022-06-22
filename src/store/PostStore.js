import {
    action,
    autorun,
    computed,
    makeObservable,
    observable,
    runInAction,
} from 'mobx';
import { addPostData, getPostData } from '../service';

class PostStore {
    data = [
        {
            title: 'Test',
            body: 'Test-1'
        }
    ];

    constructor() {
        makeObservable(this, {
            data: observable,
            updatePost: action,
            addPost: action,
            deleteData: action
        });
        autorun(this.autoRunDetails);
        runInAction(this.fetchData);
    }

    fetchData = async () => {

    };

    autoRunDetails = () => {
    };

    updatePost = (data) => {
        this.data.map((item) => {
            if(item.title == data.data.title) {
                // eslint-disable-next-line no-unused-expressions
                item.title = data.title;
                // eslint-disable-next-line no-unused-expressions
                item.body = data.body;
            }
        })
    };

    deleteData = (title) => {
        const deletData = this.data.filter(item => item.title !== title);
        this.data = deletData;
    }

    addPost = async (postData) => {
        this.data.push(postData);
    };
}

const postStore = new PostStore();

export default postStore;