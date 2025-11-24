import { useMemo, useState, useEffect } from "react";
import { Button } from "antd";
import Modal from "../../Modal";
import DragTransfer from "../../DragTransfer";

const ColumnSelectionModal = ({
  open,
  onClose,
  columns = [],
  visibleColumnKeys = [],
  onToggleColumn,
  onReorderColumns,
}) => {
  const [localSelectedKeys, setLocalSelectedKeys] = useState(visibleColumnKeys);

  useEffect(() => {
    if (open) {
      setLocalSelectedKeys(visibleColumnKeys);
    }
  }, [open, visibleColumnKeys]);

  const dataSource = useMemo(() => {
    return columns.map((column) => {
      const columnKey = column.key || column.dataIndex;
      return {
        key: columnKey,
        title: column.title || columnKey,
      };
    });
  }, [columns]);

  const availableItems = useMemo(() => {
    return dataSource.filter((item) => !localSelectedKeys.includes(item.key));
  }, [dataSource, localSelectedKeys]);

  const selectedItems = useMemo(() => {
    return localSelectedKeys
      .map((key) => dataSource.find((item) => item.key === key))
      .filter(Boolean);
  }, [dataSource, localSelectedKeys]);

  const handleRemove = (key) => {
    if (localSelectedKeys.includes(key)) {
      setLocalSelectedKeys((prev) => prev.filter((k) => k !== key));
    }
  };

  const handleApply = () => {
    const removedKeys = visibleColumnKeys.filter(
      (key) => !localSelectedKeys.includes(key)
    );
    const addedKeys = localSelectedKeys.filter(
      (key) => !visibleColumnKeys.includes(key)
    );

    removedKeys.forEach((key) => onToggleColumn(key));
    addedKeys.forEach((key) => onToggleColumn(key));

    if (onReorderColumns) {
      const hasOrderChanged =
        JSON.stringify(visibleColumnKeys) !== JSON.stringify(localSelectedKeys);
      if (hasOrderChanged) {
        onReorderColumns(localSelectedKeys);
      }
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Select Columns"
      width={600}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      }
    >
      <DragTransfer
        leftItems={availableItems}
        rightItems={selectedItems}
        rightItemIds={localSelectedKeys}
        setRightItemIds={setLocalSelectedKeys}
        getItemId={(item) => item.key}
        getItemLabel={(item) => item.title}
        onRemove={handleRemove}
        leftTitle="Available Columns"
        rightTitle="Selected Columns"
        leftEmptyText="No available columns"
        rightEmptyText="Drag columns here or click to add"
      />
    </Modal>
  );
};

export default ColumnSelectionModal;
