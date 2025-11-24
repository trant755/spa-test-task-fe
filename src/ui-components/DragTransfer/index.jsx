import { useState, useMemo } from "react";
import { Input, Empty } from "antd";
import { DragOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  DndContext,
  rectIntersection,
  pointerWithin,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";
import SortableItem from "./SortableItem";
import DroppableArea from "./DroppableArea";

const DragTransfer = ({
  leftItems = [],
  rightItems = [],
  rightItemIds = [],
  setRightItemIds,
  getItemId = (item) => item.id || item.key,
  getItemLabel = (item) =>
    item.label || item.title || item.name || String(item),
  onAdd,
  onRemove,
  onReorder,
  leftTitle = "Available",
  rightTitle = "Selected",
  leftIcon,
  rightIcon,
  searchable = true,
  searchPlaceholder = "Search...",
  searchFilter = (item, search) => {
    const label = getItemLabel(item);
    return label.toLowerCase().includes(search.toLowerCase());
  },
  leftEmptyText = "No available items",
  rightEmptyText = "Drag items here",
  renderLeftItem,
  renderRightItem,
  showRemoveButton = true,
  rightDropZoneId = "drop-zone-right",
}) => {
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredLeftItems = useMemo(() => {
    if (!searchable || !search) return leftItems;
    return leftItems.filter((item) => searchFilter(item, search));
  }, [leftItems, search, searchable, searchFilter]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { over } = event;

    if (!over) {
      setOverId(null);
      return;
    }

    const isOverRightZone =
      over.id === rightDropZoneId || rightItemIds.includes(over.id);

    setOverId(isOverRightZone ? rightDropZoneId : null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const activeData = active.data.current;

    if (activeData?.type === "available") {
      const isOverRightZone =
        over.id === rightDropZoneId || rightItemIds.includes(over.id);

      if (isOverRightZone) {
        const itemId = activeData.id;
        if (!rightItemIds.includes(itemId)) {
          if (onAdd) {
            onAdd(itemId);
          } else {
            setRightItemIds((prev) => [...prev, itemId]);
          }
        }
      }
      return;
    }

    if (activeData?.type !== "available") {
      const isOverRightZone =
        over.id === rightDropZoneId || rightItemIds.includes(over.id);

      if (isOverRightZone && active.id !== over.id) {
        const oldIndex = rightItemIds.indexOf(active.id);
        const newIndex = rightItemIds.indexOf(over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newOrder = arrayMove(rightItemIds, oldIndex, newIndex);
          if (onReorder) {
            onReorder(newOrder);
          } else {
            setRightItemIds(newOrder);
          }
        } else if (oldIndex !== -1 && over.id === rightDropZoneId) {
          const newOrder = rightItemIds.filter((id) => id !== active.id);
          newOrder.push(active.id);
          if (onReorder) {
            onReorder(newOrder);
          } else {
            setRightItemIds(newOrder);
          }
        }
      }
    }
  };

  const activeItem = useMemo(() => {
    if (!activeId) return null;
    const activeData = activeId?.includes("available")
      ? { id: activeId.replace("available-", "") }
      : { id: activeId };

    const item = [...leftItems, ...rightItems].find(
      (item) => getItemId(item) === activeData.id
    );
    return item ? getItemLabel(item) : null;
  }, [activeId, leftItems, rightItems, getItemId, getItemLabel]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={(args) => {
        const pointerCollisions = pointerWithin(args);
        if (pointerCollisions.length > 0) {
          return pointerCollisions;
        }
        return rectIntersection(args);
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              marginBottom: "12px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#262626",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {leftIcon || <UnorderedListOutlined style={{ color: "#1890ff" }} />}
            {leftTitle}
          </div>
          {searchable && (
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginBottom: "12px" }}
              allowClear
            />
          )}
          <DroppableArea id="drop-zone-left" isOver={false}>
            {filteredLeftItems.length > 0 ? (
              filteredLeftItems.map((item) => {
                const id = getItemId(item);
                const label = getItemLabel(item);
                return (
                  <DraggableItem
                    key={id}
                    id={id}
                    renderItem={renderLeftItem}
                    prefix="available"
                  >
                    {label}
                  </DraggableItem>
                );
              })
            ) : (
              <Empty
                description={search ? "No items found" : leftEmptyText}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ marginTop: "40px" }}
              />
            )}
          </DroppableArea>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              marginBottom: "12px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#262626",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {rightIcon || (
              <UnorderedListOutlined style={{ color: "#52c41a" }} />
            )}
            {rightTitle}
          </div>
          {searchable && (
            <div style={{ marginBottom: "12px", height: "32px" }} />
          )}
          <SortableContext
            items={rightItemIds}
            strategy={verticalListSortingStrategy}
          >
            <DroppableArea
              id={rightDropZoneId}
              isOver={overId === rightDropZoneId}
            >
              {rightItems.length > 0 ? (
                rightItems.map((item) => {
                  const id = getItemId(item);
                  const label = getItemLabel(item);
                  return (
                    <SortableItem
                      key={id}
                      id={id}
                      onRemove={onRemove}
                      renderItem={renderRightItem}
                      showRemoveButton={showRemoveButton}
                    >
                      {label}
                    </SortableItem>
                  );
                })
              ) : (
                <Empty
                  description={rightEmptyText}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  style={{ marginTop: "40px" }}
                />
              )}
            </DroppableArea>
          </SortableContext>
        </div>
      </div>
      <DragOverlay>
        {activeItem ? (
          <div
            style={{
              padding: "10px 14px",
              background: "#fff",
              border: "1px solid #1890ff",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(24,144,255,0.25)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: 0.9,
            }}
          >
            <DragOutlined style={{ color: "#1890ff", fontSize: "14px" }} />
            <span>{activeItem}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragTransfer;
export { default as DraggableItem } from "./DraggableItem";
export { default as SortableItem } from "./SortableItem";
export { default as DroppableArea } from "./DroppableArea";
