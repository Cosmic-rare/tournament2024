import Tournament from '@/components/Tournament';
import draw from '@/util/draw';
import data1 from './data1.json';
import _ from 'lodash'
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface YourComponentProps {
  data: any;
}

const Main: React.FC<YourComponentProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const template = _.cloneDeep(data1)

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        {data.title} ({data.gread}年)
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={30 * 15 + 24 * 2}>
        <div style={{ width: `${30 * 15}px`, height: `320px`, overflowX: 'hidden', position: "relative" }}>
          <Tournament cells={draw(data, template)} />
        </div>
      </Modal>  
    </div>
  );
};

export default Main