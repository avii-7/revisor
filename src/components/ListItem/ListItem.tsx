import "./ListItem.css";
import { RevisionItem } from "../../Database/RevisionItem";
import { FaTrash, FaPlusCircle, FaMinusCircle } from "react-icons/fa";

type ListItemProps = {
  index: number;
  item: RevisionItem;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: (index: number) => void;
  onTapIncreaseCount: (index: number) => void;
  onTapDecreaseCount: (index: number) => void;
  onTapDelete: (index: number) => void;
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
      <div className="item-controls">
        {isSelected && (
          <FaMinusCircle
            onClick={() => onDecreaseCount(index)}
            className="control-button" />
        )}
        <span className="item-count">{item.count}</span>
        {isSelected && (
          <>
            <FaPlusCircle
              onClick={() => onIncreaseCount(index)} 
              className="control-button"/> 
              
            <FaTrash
              onClick={() => onTapDelete(index)}
              className="control-button delete-icon"
            />
          </>
        )}
      </div>
    </li>
  );
};

export default ListItem;
