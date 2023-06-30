import Tournament from '@/components/top/Tournament';
import draw from '@/util/draw';
import data1 from '../data1.json';
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const template = _.cloneDeep(data1)

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        {data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}{data.title} ({data.gread}年)
      </Button>
      <Modal 
        title={`${data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}${data.title} (${data.gread}年)`} 
        open={isModalOpen} 
        onCancel={handleCancel} 
        width={30 * 15 + 24 * 2} 
        footer={[]}
      >
        <div style={{ height: `320px`, overflowX: 'scroll', position: "relative" }}>
          <div style={{ width: `${30 * 15}px`, height: `320px`, overflowY: 'scroll', position: "relative" }}>
            <Tournament cells={draw(data, template)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Main