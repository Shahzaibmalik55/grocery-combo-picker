import { OnClick, SelectedItems } from "../../types";
import "./Tabs.css";

export interface TabListItem {
  id: number;
  name: string;
}

export interface TabsProps {
  list: TabListItem[];
  onTabClick: OnClick;
  selectedTabId?: number;
  selectedItems: SelectedItems;
}

export const Tabs = ({
  list,
  selectedTabId,
  selectedItems,
  onTabClick,
}: TabsProps) => {
  return (
    <div className="tabs" data-testid="tabs">
      {list.map((item) => (
        <button
          data-testid="tabs-buttons"
          key={item.id}
          className={selectedTabId === item.id ? "active" : ""}
          onClick={() => onTabClick(item)}
          disabled={item.name === selectedItems[item.name]?.category}
        >
          {item.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
