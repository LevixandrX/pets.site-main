import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';

const EditOrderModal = ({ show, onClose, order, token, onUpdate }) => {
    const [formData, setFormData] = useState({
        photos1: order.photos1 || null,
        photos2: order.photos2 || null,
        photos3: order.photos3 || null,
        mark: order.mark || '',
        description: order.description || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (order) {
            setFormData({
                photos1: order.photos1 || null,
                photos2: order.photos2 || null,
                photos3: order.photos3 || null,
                mark: order.mark || '',
                description: order.description || '',
            });
        }
    }, [order]);

    // Функция для получения корректного URL изображения
    const getImageUrl = (photoKey) => {
        const photo = formData[photoKey] || order[photoKey];
        if (photo) {
            return photo instanceof Blob
                ? URL.createObjectURL(photo)
                : `https://pets.сделай.site/storage/images${photo}`;
        }
        return '';
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        setFormData((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    const handleRemovePreview = (photoKey) => {
        setFormData((prevState) => ({
            ...prevState,
            [photoKey]: null,
        }));

        const fileInput = document.querySelector(`input[name=${photoKey}]`);
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const form = new FormData();
        if (formData.photos1) form.append('photos1', formData.photos1);
        if (formData.photos2) form.append('photos2', formData.photos2);
        if (formData.photos3) form.append('photos3', formData.photos3);
        form.append('mark', formData.mark);
        form.append('description', formData.description);

        try {
            const response = await fetch(`https://pets.сделай.site/api/pets/${order.id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form,
            });

            if (response.ok) {
                onUpdate({ ...order, ...formData });
                onClose();
            } else {
                setError('Ошибка при редактировании объявления.');
            }
        } catch (error) {
            setError('Произошла ошибка при отправке запроса.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Редактировать объявление</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && <div className="text-center mb-3"><Spinner animation="border" variant="primary" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    {/* Фото 1 */}
                    <Form.Group controlId="formPhotos1" className="mb-3">
                        <Form.Label>Фото 1</Form.Label>
                        <Form.Control
                            type="file"
                            name="photos1"
                            onChange={handleFileChange}
                            accept="image/png"
                        />
                        {(formData.photos1 || order.photos1) && (
                            <div className="position-relative mb-3 d-flex justify-content-center" style={{ marginTop: '40px' }}>
                                <div className="card shadow-sm rounded-3 overflow-hidden" style={{ width: '250px', height: '250px' }}>
                                    <img
                                        src={getImageUrl('photos1')}
                                        alt="Preview 1"
                                        className="card-img-top"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm rounded-circle"
                                            onClick={() => handleRemovePreview('photos1')}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                fontSize: '1.2rem',
                                                padding: 0,
                                            }}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Form.Group>

                    {/* Фото 2 */}
                    <Form.Group controlId="formPhotos2" className="mb-3">
                        <Form.Label>Фото 2</Form.Label>
                        <Form.Control
                            type="file"
                            name="photos2"
                            onChange={handleFileChange}
                            accept="image/png"
                        />
                        {(formData.photos2 || order.photos2) && (
                            <div className="position-relative mb-3 d-flex justify-content-center" style={{ marginTop: '40px' }}>
                                <div className="card shadow-sm rounded-3 overflow-hidden" style={{ width: '250px', height: '250px' }}>
                                    <img
                                        src={getImageUrl('photos2')}
                                        alt="Preview 2"
                                        className="card-img-top"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm rounded-circle"
                                            onClick={() => handleRemovePreview('photos2')}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                fontSize: '1.2rem',
                                                padding: 0,
                                            }}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Form.Group>

                    {/* Фото 3 */}
                    <Form.Group controlId="formPhotos3" className="mb-3">
                        <Form.Label>Фото 3</Form.Label>
                        <Form.Control
                            type="file"
                            name="photos3"
                            onChange={handleFileChange}
                            accept="image/png"
                        />
                        {(formData.photos3 || order.photos3) && (
                            <div className="position-relative mb-3 d-flex justify-content-center" style={{ marginTop: '40px' }}>
                                <div className="card shadow-sm rounded-3 overflow-hidden" style={{ width: '250px', height: '250px' }}>
                                    <img
                                        src={getImageUrl('photos3')}
                                        alt="Preview 3"
                                        className="card-img-top"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm rounded-circle"
                                            onClick={() => handleRemovePreview('photos3')}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                fontSize: '1.2rem',
                                                padding: 0,
                                            }}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Form.Group>

                    {/* Клеймо */}
                    <Form.Group controlId="formMark" className="mb-3">
                        <Form.Label>Клеймо</Form.Label>
                        <Form.Control
                            type="text"
                            name="mark"
                            value={formData.mark}
                            onChange={(e) => setFormData({ ...formData, mark: e.target.value })}
                        />
                    </Form.Group>

                    {/* Описание */}
                    <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-end">
                <Button variant="secondary" onClick={onClose} style={{ marginRight: '10px' }}>
                    Отмена
                </Button>
                <Button variant="primary" type="submit" disabled={loading} onClick={handleSubmit}>
                    {loading ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditOrderModal;