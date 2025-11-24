import { useState } from "react";
import { Table } from "antd";

const DataTable = ({
  data = [],
  columns = [],
  visibleColumns = [],
  ...tableProps
}) => {
  const filteredColumns =
    visibleColumns.length > 0
      ? columns.filter((col) =>
          visibleColumns.includes(col.key || col.dataIndex)
        )
      : columns;

  const normalizedData = Array.isArray(data) ? data : [];

  const { pagination: customPagination, ...restTableProps } = tableProps;

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handlePageChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
    if (customPagination?.onChange) {
      customPagination.onChange(page, pageSize);
    }
  };

  const handleSizeChange = (current, size) => {
    setPagination({ current: 1, pageSize: size });
    if (customPagination?.onShowSizeChange) {
      customPagination.onShowSizeChange(current, size);
    }
  };

  const defaultPagination = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
    showTotal: (total) => `Total: ${total}`,
    onChange: handlePageChange,
    onShowSizeChange: handleSizeChange,
  };

  const paginationConfig =
    customPagination !== false
      ? { ...defaultPagination, ...customPagination }
      : false;

  return (
    <Table
      dataSource={normalizedData}
      columns={filteredColumns}
      rowKey={(record) => record?.id || record?._id}
      pagination={paginationConfig}
      {...restTableProps}
    />
  );
};

export default DataTable;
