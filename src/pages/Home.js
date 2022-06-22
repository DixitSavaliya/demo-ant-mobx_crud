import React from 'react';
import { Table } from 'antd';
import { inject, observer } from 'mobx-react';

const Home = inject('store')(
  observer(({ store, otherProp }) => {
  return (
    <Table
      rowKey="id"
      columns={store.userStore.columns}
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
