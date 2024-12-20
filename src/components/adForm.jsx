import React from 'react';
import FormField from './formField';

const AdForm = ({
  formData,
  errors,
  handleChange,
  handleKeyDown,
  handleSubmit,
  loading,
  handleRemovePreview,
  fileInputRefs,
  isAuthenticated
}) => (
  <form onSubmit={handleSubmit}>
    <FormField
      id="name"
      label="Имя"
      type="text"
      value={formData.name}
      error={errors.name}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, 'phone')}
    />
    <FormField
      id="phone"
      label="Телефон"
      type="text"
      value={formData.phone}
      error={errors.phone}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, 'email')}
    />
    <FormField
      id="email"
      label="Email"
      type="email"
      value={formData.email}
      error={errors.email}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, 'register')}
    />
    {!isAuthenticated && (
      <FormField
        id="register"
        label="Автоматическая регистрация"
        type="checkbox"
        value={formData.register}
        error={errors.register}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, 'password')}
      />
    )}

    {!isAuthenticated && formData.register && (
      <>
        <FormField
          id="password"
          label="Пароль"
          type="password"
          value={formData.password}
          error={errors.password}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, 'password_confirmation')}
        />
        <FormField
          id="password_confirmation"
          label="Подтверждение пароля"
          type="password"
          value={formData.password_confirmation}
          error={errors.password_confirmation}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, 'photo1')}
        />
      </>
    )}

    {isAuthenticated && (
      <FormField
        id="sendAnonymously"
        label="Отправить анонимно"
        type="checkbox"
        value={formData.sendAnonymously}
        onChange={handleChange}
      />
    )}
    <FormField
      id="kind"
      label="Вид животного"
      type="text"
      value={formData.kind}
      error={errors.kind}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, 'district')}
    />
    <FormField
      id="district"
      label="Район"
      type="text"
      value={formData.district}
      error={errors.district}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, 'mark')}
    />

    {/* Контейнеры для Фото */}
    <div className="mb-4">
      {['photo1', 'photo2', 'photo3'].map((photo, index) => (
        <div key={photo} className="mb-4">
          <FormField
            id={photo}
            label={`Фото ${index + 1}`}
            type="file"
            onChange={handleChange}
            error={errors[photo]}
            onKeyDown={(e) => handleKeyDown(e, `photo${index + 2}`)}
            ref={fileInputRefs[photo]}
          />
          {formData[`${photo}Preview`] && (
            <div className="position-relative mb-3 d-flex justify-content-center">
              <div className="card shadow-sm rounded-3 overflow-hidden" style={{ width: '250px', height: '250px' }}>
                <img
                  src={formData[`${photo}Preview`]}
                  alt={`Preview ${index + 1}`}
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
                    onClick={() => handleRemovePreview(photo)}
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
        </div>
      ))}
    </div>

    <FormField
      id="mark"
      label="Клеймо"
      type="text"
      value={formData.mark}
      error={errors.mark}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, 'description')}
    />
    <FormField
      id="description"
      label="Описание"
      type="text"
      value={formData.description}
      error={errors.description}
      onChange={handleChange}
      onKeyDown={(e) => handleKeyDown(e, 'confirm')}
    />
    <FormField
      id="confirm"
      label="Согласие на обработку данных"
      type="checkbox"
      value={formData.confirm}
      error={errors.confirm}
      onChange={handleChange}
    />
    <button
      type="submit"
      className="btn btn-primary btn-lg w-100 mt-3 mb-3"
      disabled={loading}
      style={{ borderRadius: '8px' }}
    >
      {loading ? 'Загрузка...' : 'Добавить объявление'}
    </button>
  </form>
);

export default AdForm;