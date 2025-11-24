import { Modal as AntModal } from "antd";

const Modal = ({ open, onClose, children, ...restProps }) => {
  return (
    <AntModal open={open} onCancel={onClose} footer={null} {...restProps}>
      {children}
    </AntModal>
  );
};

export default Modal;
