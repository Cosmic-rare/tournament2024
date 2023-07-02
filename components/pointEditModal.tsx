import React from 'react';
import { Modal, Input, Row, Col, Button } from 'antd';
import { CircularProgress, Backdrop } from '@mui/material';

interface YourComponentProps {
  isModalOpen: boolean
  setIsModalOpen: Function
  isLoading: boolean
  onUpdate: Function
  editPoint: number
  l_point: number
  h_point: number
  setL_point: Function
  setH_point: Function
}

const PointEditModal: React.FC<YourComponentProps> = ({ isModalOpen, setIsModalOpen, isLoading, onUpdate, editPoint, l_point, h_point, setL_point, setH_point }) => {

  return (
    <Modal
      open={isModalOpen}
      closable={false}
      zIndex={9998}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" disabled={isLoading} onClick={() => setIsModalOpen(false)}>Cancel</Button>,
        <Button
          key="reset"
          danger
          disabled={isLoading}
          onClick={() => {
            onUpdate(editPoint, -1, -1, true)
          }}>
          Reset
        </Button>,
        <Button
          key="apply"
          type="primary"
          disabled={isLoading}
          onClick={() => {
            onUpdate(editPoint, l_point, h_point, false)
          }}>
          Apply
        </Button>
      ]}
    >
      <div style={{ position: "relative" }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: 99999 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div>
          <Row gutter={16} justify="center">
            <Col span={5}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginBottom: '10px' }}>1</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Input
                  value={l_point}
                  disabled={isLoading}
                  onChange={(e) => {
                    setL_point(parseInt(e.target.value, 10))
                  }}
                  type="number"
                  style={{ width: "80%", textAlign: "center" }}
                />
              </div>
            </Col>
            <Col span={2}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginTop: '25px', display: 'inline-block' }}>-</span>
              </div>
            </Col>
            <Col span={5}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginBottom: '10px' }}>2</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Input
                  value={h_point}
                  disabled={isLoading}
                  onChange={(e) => {
                    setH_point(parseInt(e.target.value, 10))
                  }}
                  type="number"
                  style={{ width: "80%", textAlign: "center" }}
                />
              </div>
            </Col>
          </Row>
          <div style={{ height: 10 }} />
        </div>
      </div>
    </Modal>
  );
};

export default PointEditModal;
