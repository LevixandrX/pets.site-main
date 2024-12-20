import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaCircle } from 'react-icons/fa';

const BASE_URL = "https://pets.сделай.site";

const OrderCard = ({ order, onDelete, onEdit }) => {
    const photoUrl = order.photos && order.photos.startsWith('/')
        ? `${BASE_URL}${order.photos}`
        : order.photos || 'https://via.placeholder.com/300x300';

    const orderKind = order.kind ? order.kind.charAt(0).toUpperCase() + order.kind.slice(1) : 'Не указано';
    const orderStatus = order.status || 'Не указан';

    const getStatusColor = (status) => {
        switch (status) {
            case 'onModeration':
                return 'yellow';
            case 'approved':
                return 'green';
            case 'rejected':
                return 'red';
            case 'pending':
                return 'gray';
            default:
                return 'gray';
        }
    };

    return (
        <div className="col">
            <div className="card shadow h-100">
                <div style={{ position: 'relative' }}>
                    <img
                        src={photoUrl}
                        className="card-img-top"
                        alt={orderKind}
                        style={{
                            height: '300px',
                            objectFit: 'cover',
                        }}
                    />
                    {/* Статус как иконка в правом верхнем углу */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '50%',
                            padding: '5px',
                        }}
                    >
                        <FaCircle color={getStatusColor(orderStatus)} size={20} />
                    </div>
                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">
                        {orderKind}
                    </h5>
                    <ul className="list-unstyled text-center mb-4">
                        <li>
                            <strong>Дата:</strong> {order.date || 'Не указана'}
                        </li>
                        <li>
                            <strong>Район:</strong> {order.district || 'Не указан'}
                        </li>
                        <li>
                            <strong>Клеймо:</strong>{' '}
                            <span className="badge bg-info text-dark">{order.mark || 'Не указано'}</span>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center gap-3">
                        <Button variant="warning" onClick={() => onEdit(order.id)}>
                            <FaEdit /> Редактировать
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(order.id)}>
                            <FaTrashAlt /> Удалить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;