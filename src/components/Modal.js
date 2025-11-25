import ReactDOM from 'react-dom';

// Find or create the modal root element in the document
let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
}

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    modalRoot
  );
};

export default Modal;