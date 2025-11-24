import { useState } from "react";
import { Button } from "antd";
import { DragOutlined, CloseOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({
  id,
  children,
  onRemove,
  renderItem,
  showRemoveButton = true,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isHovered, setIsHovered] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isHovered && !isDragging ? "#1890ff" : "#e8e8e8",
    borderRadius: "6px",
    marginBottom: "6px",
    background: "#fff",
    boxShadow:
      isHovered && !isDragging
        ? "0 2px 4px rgba(24,144,255,0.12)"
        : "0 1px 2px rgba(0,0,0,0.04)",
  };

  if (renderItem) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          {...attributes}
          {...listeners}
          style={{
            cursor: "grab",
            flex: 1,
            userSelect: "none",
          }}
        >
          {renderItem({ id, isDragging, isHovered })}
        </div>
        {showRemoveButton && onRemove && (
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            style={{
              marginLeft: "8px",
              color: "#ff4d4f",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fff1f0";
              e.currentTarget.style.color = "#ff4d4f";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: "grab",
          flex: 1,
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <DragOutlined style={{ color: "#8c8c8c", fontSize: "14px" }} />
        <span>{children}</span>
      </div>
      {showRemoveButton && onRemove && (
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
          style={{
            marginLeft: "8px",
            color: "#ff4d4f",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#fff1f0";
            e.currentTarget.style.color = "#ff4d4f";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        />
      )}
    </div>
  );
};

export default SortableItem;
