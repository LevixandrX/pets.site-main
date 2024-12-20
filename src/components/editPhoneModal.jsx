import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditPhoneModal = ({
  editMode,
  newPhone,
  phoneErrors,
  handlePhoneChange,
  handlePhoneBlur,
  handleUpdatePhone,
  setEditMode,
  user
}) => {
  const isPhoneChanged = newPhone !== user.phone;

  return (
    <Modal show={editMode === 'phone'} onHide={() => setEditMode(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать номер телефона</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="text"
              value={newPhone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              isInvalid={phoneErrors !== ''}
            />
            {phoneErrors && <div className="invalid-feedback">{phoneErrors}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setEditMode(false)}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdatePhone}
          disabled={!isPhoneChanged || phoneErrors}
        >
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPhoneModal;