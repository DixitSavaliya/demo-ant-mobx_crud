import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Button, Input, Space } from 'antd';
import { inject, observer } from 'mobx-react';

const Home = inject('store')(
  observer(({ store, otherProp }) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        text
    });

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        ...getColumnSearchProps('username'),
        sorter: (a, b) => a.username.length - b.username.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...getColumnSearchProps('email')
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        ...getColumnSearchProps('phone')
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
        ...getColumnSearchProps('website'),
        render: (text) => (
          <a href={text}>
            {text}
          </a>
        ),
      },
    ];

    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={store.userStore.data}
        expandedRowRender={(record) => (
          <p style={{ margin: 0 }}>
            {record.address.street} {record.address.suite}
          </p>
        )}
      />
    );
  }));

export default Home;
