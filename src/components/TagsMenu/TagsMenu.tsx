import { useEffect, useState } from "react";
import Tag from "./Tag";
import "./TagsMenu.css";

type TagsMenuProps = {
  selectedTag: Tag;
  onTagChange: (tag: Tag) => void;
};

const TagsMenu = (props: TagsMenuProps) => {
  const { selectedTag, onTagChange } = props;

  const [showMenu, setShowMenu] = useState(false);
  const [currentTag, setCurrentTag] = useState(selectedTag);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMenu && 
        !event
        .composedPath()
        .some((el) => (el as HTMLElement).classList?.contains("tags-dropdown-menu"))) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <span className="tags-dropdown-control">
      <button
        className="tags-dropdown-button"
        onClick={(e) => { 
          e.stopPropagation();
          setShowMenu(!showMenu); 
          }}>
        {currentTag}
      </button>
      {showMenu && (
        <div className="tags-dropdown-menu">
          {[Tag.default, Tag.easy, Tag.medium, Tag.hard].map((tag) => (
            <button
              key={tag}
              className={`tag-dropdown-button ${
                selectedTag === tag ? "selected" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTag(tag);
                onTagChange(tag);
                setShowMenu(false);
              }}>
              {tag}
            </button>
          ))}
        </div>
      )}
    </span>
  );
};

export default TagsMenu;
