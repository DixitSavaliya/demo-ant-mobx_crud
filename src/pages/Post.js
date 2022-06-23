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
        render: (record) =>
          <>
            <a onClick={() => updateData(record)}>Edit</a>&nbsp;&nbsp;&nbsp;
            <a onClick={() => deleteData(record.title)}>Delete</a>
          </>,
      },
    ];
    const [form] = Form.useForm();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(store.postStore.data);
    const [update, setUpdate] = useState(false);
    const [updateIndex, setUpdateIndex] = useState({});

    useEffect(() => {
      setData(store.postStore?.data);
    }, [data, store.postStore?.data]);

    const addPost = () => {
      setShow(true);
    };

    const deleteData = (title) => {
      store.postStore.deleteData(title);
    }

    const updateData = (data) => {
      form.setFieldsValue({
        title: data.title,
        body: data.body
    });
      setUpdateIndex({
        title: data.title,
        body: data.body
      });
      setUpdate(true);
      setShow(true);
    }

    const onFinishUpdate = async (values) => {
      const data = {
        data: updateIndex,
        title: values.title,
        body: values.body,
      };

      store.postStore.updatePost(data);
      const addedData = await store.postStore?.data;
      setData(addedData?.data);
      setUpdate(false);
      setShow(false);
      setUpdateIndex(null);
    }

    const onFinishAdd = async (values) => {
      const data = {
        title: values.title,
        body: values.body,
      };
      store.postStore.addPost(data);
      const addedData = await store.postStore?.data;
      setData(addedData?.data);
      setShow(false);
  };

  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };


    return (
      <>
        <Button type="primary" onClick={addPost} style={{ marginBottom: '1rem' }}>
          Add Post
        </Button>
        {show && (
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
              title:updateIndex.title,
              body:updateIndex.body
            }}
            onFinish={!update ? onFinishAdd : onFinishUpdate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your title!',
                },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Body"
              name="body"
              rules={[
                {
                  required: true,
                  message: 'Please input your body!',
                },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
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
