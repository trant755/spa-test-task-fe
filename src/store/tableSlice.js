import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tables: {
    items: {
      selectedColumns: ["_id", "name", "description"],
    },
  },
  searchTerm: "",
  columnOrder: [],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setSelectedColumns: (state, action) => {
      const { tableId, columns } = action.payload;
      if (!state.tables[tableId]) {
        state.tables[tableId] = { selectedColumns: [] };
      }
      state.tables[tableId].selectedColumns = columns;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setColumnOrder: (state, action) => {
      state.columnOrder = action.payload;
    },
    toggleColumn: (state, action) => {
      const { tableId, columnId } = action.payload;
      if (!state.tables[tableId]) {
        state.tables[tableId] = { selectedColumns: [] };
      }
      const isSelected =
        state.tables[tableId].selectedColumns.includes(columnId);

      if (isSelected) {
        state.tables[tableId].selectedColumns = state.tables[
          tableId
        ].selectedColumns.filter((id) => id !== columnId);
      } else {
        state.tables[tableId].selectedColumns = [
          ...state.tables[tableId].selectedColumns,
          columnId,
        ];
      }
    },
    initializeTable: (state, action) => {
      const { tableId, defaultColumns } = action.payload;
      if (!state.tables[tableId]) {
        state.tables[tableId] = {
          selectedColumns: defaultColumns || [],
        };
      } else if (
        state.tables[tableId].selectedColumns.length === 0 &&
        defaultColumns
      ) {
        state.tables[tableId].selectedColumns = defaultColumns;
      }
    },
    reorderColumns: (state, action) => {
      const { tableId, columns } = action.payload;
      if (state.tables[tableId]) {
        state.tables[tableId].selectedColumns = columns;
      }
    },
    resetTableState: (state) => {
      state.searchTerm = "";
      state.columnOrder = [];
    },
  },
});

export const {
  setSelectedColumns,
  setSearchTerm,
  setColumnOrder,
  toggleColumn,
  initializeTable,
  reorderColumns,
  resetTableState,
} = tableSlice.actions;

export default tableSlice.reducer;
