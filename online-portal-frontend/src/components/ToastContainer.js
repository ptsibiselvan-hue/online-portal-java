import React from 'react';
import { Toast, ToastContainer as BootstrapToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <BootstrapToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          onClose={() => removeToast(toast.id)}
          show={true}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Body className={toast.variant === 'light' ? 'text-dark' : 'text-white'}>
            {toast.message}
          </Toast.Body>
        </Toast>
      ))}
    </BootstrapToastContainer>
  );
}

export default ToastContainer;
