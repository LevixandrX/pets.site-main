import React, { useState, useEffect } from 'react';
import OrderCard from './orderCard';
import { Spinner, Dropdown } from 'react-bootstrap';
import EditOrderModal from './editOrderModal';
import Pagination from './pagination';

const UserOrders = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://pets.сделай.site/api/users/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }

                const data = await response.json();
                if (data.data.orders) {
                    console.log('Fetched Orders:', data.data.orders);
                    setOrders(data.data.orders);
                    setFilteredOrders(data.data.orders);
                    setTotalPages(Math.ceil(data.data.orders.length / 6));
                }
            } catch (error) {
                console.error('Ошибка при загрузке объявлений:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (status === 'all') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.status === status));
        }
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getStatusLabel = (status) => {
        const statusMap = {
            onModeration: 'На модерации',
            approved: 'Одобрено',
            rejected: 'Отклонено',
            pending: 'В ожидании',
            active: 'Активные',
            wasFound: 'Хозяин найден',
            archive: 'В архиве',
        };
        return statusMap[status] || 'Все';
    };

    const handleDelete = async (orderId) => {
        if (window.confirm('Вы уверены, что хотите удалить это объявление?')) {
            try {
                const response = await fetch(`https://pets.сделай.site/api/users/orders/${orderId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка при удалении объявления');
                }

                setOrders(orders.filter((order) => order.id !== orderId));
                setFilteredOrders(filteredOrders.filter((order) => order.id !== orderId));
            } catch (error) {
                console.error('Ошибка при удалении объявления:', error);
            }
        }
    };

    const handleEdit = (order) => {
        setSelectedOrder(order);
        setShowEditModal(true);
    };

    const handleUpdate = (updatedOrder) => {
        setOrders(orders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
        setFilteredOrders(filteredOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
        setSelectedOrder(updatedOrder);
        setShowEditModal(false);
    };

    const currentOrders = filteredOrders.slice((currentPage - 1) * 6, currentPage * 6);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <div className="mt-5">
            <h5 className="text-center mb-4">Ваши объявления</h5>

            {/* Фильтрация по статусу */}
            <div className="d-flex justify-content-center mb-4">
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className="w-100">
                        Статус: {getStatusLabel(filterStatus)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleFilterChange('all')}>Все</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('active')}>Активные</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('wasFound')}>Хозяин найден</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('onModeration')}>На модерации</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('archive')}>В архиве</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="container py-4">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onDelete={handleDelete}
                                onEdit={() => handleEdit(order)}
                            />
                        ))
                    ) : (
                        <p className="text-center">Нет объявлений для отображения</p>
                    )}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {selectedOrder && (
                <EditOrderModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    order={selectedOrder}
                    token={token}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default UserOrders;