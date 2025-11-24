import { useState } from "react";
import { DragOutlined } from "@ant-design/icons";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableItem = ({ id, children, renderItem, prefix = "available" }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${prefix}-${id}`,
      data: {
        type: prefix,
        id,
      },
    });

  const [isHovered, setIsHovered] = useState(false);

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
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
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  if (renderItem) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{ ...style, marginBottom: "6px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderItem({ id, isDragging, isHovered })}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DragOutlined style={{ color: "#8c8c8c", fontSize: "14px" }} />
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
};

export default DraggableItem;
