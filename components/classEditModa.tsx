import { Modal, Radio, Space, Row, Col, Button, Spin, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import type { RadioChangeEvent } from 'antd';

interface YourComponentProps {
  isModalOpen: boolean
  setIsModalOpen: Function
  isLoading: boolean
  onUpdate: Function
  editPoint: number
  gread: number
}

const ClassEditModal: React.FC<YourComponentProps> = ({ isModalOpen, setIsModalOpen, isLoading, onUpdate, editPoint, gread }) => {
  const [value, setValue] = useState(editPoint);

  useEffect(() => {
    setValue(editPoint)
  }, [editPoint])

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Modal
      open={isModalOpen}
      closable={false}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button 
          key="cancel" 
          disabled={isLoading} 
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>,
        <Button
          key="apply"
          type="primary"
          disabled={isLoading}
          onClick={() => {
            onUpdate(editPoint, value)
          }}>
          Apply
        </Button>
      ]}
    >
      <div style={{ position: "relative" }}>
        {isLoading ?
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 100 }}>
            <Card style={{}} >
              <Spin />
            </Card>
          </div>
          : null}
        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>{gread}-1</Radio>
              <Radio value={2}>{gread}-2</Radio>
              <Radio value={3}>{gread}-3</Radio>
              <Radio value={4}>{gread}-4</Radio>
              <Radio value={5}>{gread}-5</Radio>
              <Radio value={6}>{gread}-6</Radio>
              <Radio value={7}>{gread}-7</Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </Modal>
  );
};

export default ClassEditModal;