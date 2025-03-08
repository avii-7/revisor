import "./ListItem.css";
import { RevisionItem } from "../../Database/RevisionItem/RevisionItem";
import {
  FaTrash,
  FaPlusCircle,
  FaMinusCircle,
  FaPencilAlt,
  FaCheck,
} from "react-icons/fa";
import TagsMenu from "../TagsMenu/TagsMenu";
import Tag from "../TagsMenu/Tag";

type ListItemProps = {
  index: number;
  item: RevisionItem;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: (index: number) => void;
  onTapIncreaseCount: (index: number) => void;
  onTapDecreaseCount: (index: number) => void;
  onTapDelete: (index: number) => void;
  onTagChange: (tag: Tag, index: number) => void;
  onEdit: (index: number) => void;
  onHighlightedItemAcknowledge: () => void;
};

const ListItem = (props: ListItemProps) => {
  const {
    index,
    item,
    isSelected,
    isHighlighted,
    onClick,
    onTapIncreaseCount: onIncreaseCount,
    onTapDecreaseCount: onDecreaseCount,
    onTapDelete,
    onTagChange,
    onEdit,
    onHighlightedItemAcknowledge: onHighlightAcknowledge,
  } = props;

  return (
    <li
      className={`list-item  
        ${isSelected ? "selected" : ""} 
        ${isHighlighted ? "highlighted" : ""}
      `}
      onClick={() => onClick(index)}
    >
      <span>
        {index + 1}. {item.name}
      </span>

      {!isHighlighted ? (
        <div className="item-controls">
          <FaPencilAlt
            className="control-button edit-icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(index);
            }}
          />
          <TagsMenu
            selectedTag={item.tag}
            onTagChange={(tag: Tag) => onTagChange(tag, index)}
          />
          <div className="item-count-controls">
            {isSelected && (
              <FaMinusCircle
                onClick={() => onDecreaseCount(index)}
                className="control-button"
              />
            )}
            <span className="item-count">{item.count}</span>
            {isSelected && (
              <FaPlusCircle
                onClick={() => onIncreaseCount(index)}
                className="control-button"
              />
            )}
          </div>
          {isSelected && (
            <FaTrash
              onClick={() => onTapDelete(index)}
              className="control-button delete-icon"
            />
          )}
        </div>
      ) : (
        <div className="item-highlighted">
          <FaCheck
            className="item-highlighted-button"
            onClick={(e) => {
              e.stopPropagation();
              onHighlightAcknowledge();
            }}
          />
        </div>
      )}
    </li>
  );
};

export default ListItem;
