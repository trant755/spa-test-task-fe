import { useDroppable } from "@dnd-kit/core";

const DroppableArea = ({ id, children, isOver }) => {
  const { setNodeRef, isOver: isOverDroppable } = useDroppable({
    id,
    data: {
      type: "droppable",
    },
  });

  const isActive = isOver || isOverDroppable;

  return (
    <div
      ref={setNodeRef}
      style={{
        borderWidth: isActive ? "2px" : "1px",
        borderStyle: isActive ? "dashed" : "solid",
        borderColor: isActive ? "#1890ff" : "#e8e8e8",
        borderRadius: "8px",
        flex: 1,
        minHeight: "300px",
        maxHeight: "400px",
        overflow: "auto",
        padding: "12px",
        background: isActive ? "#e6f7ff" : "#fafafa",
        transition: "all 0.2s ease",
        boxShadow: isActive
          ? "0 0 0 2px rgba(24,144,255,0.1)"
          : "inset 0 1px 2px rgba(0,0,0,0.02)",
      }}
    >
      {children}
    </div>
  );
};

export default DroppableArea;
