import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import getItems from "../api/itemApi";
import TableWithDynamicColumns from "../ui-components/TableWithDynamicColumns";

const Items = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await getItems();
        const itemsArray = Array.isArray(response)
          ? response
          : response?.items || response?.data || [];
        setData(itemsArray);
      } catch (error) {
        message.error("Error loading data");
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key: key,
        }))
      : [];

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <TableWithDynamicColumns tableId="items" data={data} columns={columns} />
    </div>
  );
};

export default Items;
