import { useState, useEffect, useMemo } from "react";
import { Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../DataTable";
import ColumnSelectionModal from "./ColumnSelectionModal";
import {
  setSelectedColumns,
  toggleColumn,
  initializeTable,
  reorderColumns,
} from "../../store/tableSlice";

const TableWithDynamicColumns = ({
  data = [],
  columns = [],
  defaultColumns = [],
  tableId,
  ...tableProps
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reduxSelectedColumns = useSelector((state) => {
    if (tableId && state.table.tables[tableId]) {
      return state.table.tables[tableId].selectedColumns;
    }
    return [];
  });

  const [localVisibleColumnKeys, setLocalVisibleColumnKeys] = useState([]);

  const useRedux = !!tableId;
  const visibleColumnKeys = useRedux
    ? reduxSelectedColumns
    : localVisibleColumnKeys;

  const columnKeys = useMemo(() => {
    return columns.map((col) => col.key || col.dataIndex).filter(Boolean);
  }, [columns]);

  useEffect(() => {
    if (columns.length === 0) {
      if (useRedux) {
        dispatch(setSelectedColumns({ tableId, columns: [] }));
      } else {
        setLocalVisibleColumnKeys([]);
      }
      return;
    }

    const validDefaultColumns =
      defaultColumns.length > 0
        ? defaultColumns.filter((key) => columnKeys.includes(key))
        : columnKeys;

    if (useRedux) {
      if (reduxSelectedColumns.length === 0 && validDefaultColumns.length > 0) {
        dispatch(
          initializeTable({ tableId, defaultColumns: validDefaultColumns })
        );
      }
    } else {
      if (
        localVisibleColumnKeys.length === 0 &&
        validDefaultColumns.length > 0
      ) {
        setLocalVisibleColumnKeys(validDefaultColumns);
      }
    }
  }, [
    columns.length,
    columnKeys.join(","),
    defaultColumns.join(","),
    useRedux,
    tableId,
    dispatch,
  ]);

  const handleToggleColumn = (columnKey) => {
    if (useRedux) {
      dispatch(toggleColumn({ tableId, columnId: columnKey }));
    } else {
      setLocalVisibleColumnKeys((prev) => {
        if (prev.includes(columnKey)) {
          return prev.filter((key) => key !== columnKey);
        } else {
          return [...prev, columnKey];
        }
      });
    }
  };

  const handleReorderColumns = (newOrder) => {
    if (useRedux) {
      dispatch(reorderColumns({ tableId, columns: newOrder }));
    } else {
      setLocalVisibleColumnKeys(newOrder);
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button icon={<SettingOutlined />} onClick={() => setIsModalOpen(true)}>
          Select Columns
        </Button>
      </div>
      <DataTable
        data={data}
        columns={columns}
        visibleColumns={visibleColumnKeys}
        {...tableProps}
      />
      <ColumnSelectionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        columns={columns}
        visibleColumnKeys={visibleColumnKeys}
        onToggleColumn={handleToggleColumn}
        onReorderColumns={handleReorderColumns}
      />
    </div>
  );
};

export default TableWithDynamicColumns;
