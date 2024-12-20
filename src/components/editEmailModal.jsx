import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const EditEmailModal = ({
  editMode,
  newEmail,
  emailErrors,
  handleEmailChange,
  handleEmailBlur,
  handleUpdateEmail,
  setEditMode,
  user
}) => {
  const isEmailChanged = newEmail !== user.email;

  return (
    <Modal show={editMode === 'email'} onHide={() => setEditMode(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              isInvalid={emailErrors !== ''}
            />
            {emailErrors && <div className="invalid-feedback">{emailErrors}</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setEditMode(false)}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdateEmail}
          disabled={!isEmailChanged || emailErrors}
        >
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEmailModal;