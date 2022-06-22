import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';

const Post = inject('store')(
  observer(({ store, otherProp }) => {
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Body',
          dataIndex: 'body',
          key: 'body',
        },
        {
          title: 'Action',
          render: (record,index) => 
          <>
          <a onClick={() => updateData(record)}>Edit</a>&nbsp;&nbsp;&nbsp;
          <a onClick={() => deleteData(record.title)}>Delete</a>
          </>,
        },
      ];

    const [show, setShow] = useState(false);
    const [data, setData] = useState(store.postStore.data);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [update, setUpdate] = useState(false);
    const [updateIndex, setUpdateIndex] = useState({});

    useEffect(() => {
      setData(store.postStore?.data);
    }, [data,store.postStore?.data]);

    const addPost = () => {
      setShow(true);
    };

    const deleteData = (title) => {
        store.postStore.deleteData(title);
    }

    const updateData = (data) => {
        setUpdateIndex({
            title:data.title,
            body:data.body
        });
        setUpdate(true);
        setShow(true);

        setTitle(data.title);
        setBody(data.body);
    }

    const handleSubmit = async () => {
      const data = {
        title: title,
        body: body,
      };
      store.postStore.addPost(data);
      const addedData = await store.postStore?.data;
      setData(addedData?.data);
      setTitle('');
      setBody('');
      setShow(false);
    };

    const handleEdit = async () => {
        const data = {
            data: updateIndex,
            title: title,
            body: body,
          };

          store.postStore.updatePost(data);
          const addedData = await store.postStore?.data;
          setData(addedData?.data);
          setTitle('');
          setBody('');
          setUpdate(false);
          setShow(false);
          setUpdateIndex(null);
    }

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
      setBody(e.target.value);
    };

    return (
      <>
        <Button type="primary" onClick={addPost} style={{marginBottom:'1rem'}}>
          Add Post
        </Button>
        {show && (
          <Form layout="vertical">
            <Form.Item>
              <Input
               value={title}
                placeholder="Title"
                name="title"
                onChange={handleTitleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
              value={body}
                placeholder="Body"
                name="body"
                onChange={handleBodyChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={!update ? handleSubmit : handleEdit}
              >
                {!update ? 'Add' : 'Edit'}
              </Button>
            </Form.Item>
          </Form>
        )}
        {!show && (
          <Table
            rowKey="title"
            columns={columns}
            dataSource={data}
          />
        )}
      </>
    );
  })
);

export default Post;
