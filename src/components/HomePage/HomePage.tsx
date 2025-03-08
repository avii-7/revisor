import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import { FaPlusCircle } from "react-icons/fa";
import { RevisionItemsManager } from "../../Database/RevisionItem/RevisionItemManager";
import { RevisionItem } from "../../Database/RevisionItem/RevisionItem";
import ListItem from "../ListItem/ListItem";
import Tag from "../TagsMenu/Tag";

interface Modal<T> {
  isVisible: boolean;
  input: T;
}

const HomePage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [items, setItems] = useState<RevisionItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const revisionItemManager = new RevisionItemsManager();
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  const [editModal, setEditModal] = useState<Modal<number>>({ isVisible: false, input: 0 });
  const [editModalInput, setEditModalInput] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (modalInput.trim() !== "") {
      const item = new RevisionItem(modalInput, new Date());
      const newItems: RevisionItem[] = [...items, item];
      setItems(newItems);
      revisionItemManager.insert(item);
      setModalInput("");
    }
    setIsModalVisible(false);
  };

  const handleSave = (index: number, text: string) => {
      const itemToUpdate = items[index];

      if (itemToUpdate.name === text) {
        return;
      }

      itemToUpdate.name = text;
      console.log("Updated Text: ", text);
      revisionItemManager.update(itemToUpdate);
      setEditModal({ isVisible: false, input: -1 });
      setEditModalInput("");
    
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const increaseCount = (index: number) => {
    const newItems = [...items];
    const itemToUpdate = newItems[index];
    itemToUpdate.count += 1;
    setItems(newItems);
    revisionItemManager.update(itemToUpdate);
  };

  const decreaseCount = (index: number) => {
    const newItems = [...items];
    if (newItems[index].count > 0) {
      const itemToUpdate = newItems[index];
      itemToUpdate.count -= 1;
      setItems(newItems);
      revisionItemManager.update(itemToUpdate);
    }
  };

  const deleteItem = (index: number) => {
    let id = items[index].id;
    revisionItemManager.delete(id);
    const filterItems = items.filter((item) => item.id !== id);
    setItems(filterItems);
  };

  const onTagChange = (tag: Tag, index: number) => {
    const newItems = [...items];
    const itemToUpdate = newItems[index];
    itemToUpdate.tag = tag;
    revisionItemManager.update(itemToUpdate);
    setItems(newItems);
  };

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
  };

  const onEdit = (index: number) => {
    setEditModalInput(items[index].name);
    console.log("tapped index: ", index);
    setEditModal({ isVisible: true, input: index });
  };

  useEffect(() => {
    revisionItemManager.getAll().then((revisionItems) => {
      setItems(revisionItems);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isModalVisible) {
        handleOk();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (isModalVisible && modalInputRef.current) {
      modalInputRef.current.focus();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedIndex !== null &&
        !event
          .composedPath()
          .some((el) => (el as HTMLElement).classList?.contains("list-item"))
      ) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedIndex]);

  const onReviseButtonClick = () => {
    revisionItemManager.getAnItemToRevise().then((item) => {
      setHighlightedItemId(item.id);
    });
  };

  return (
    <div className="homepage-container">
      <div className="header-content">
        <div className="header">
          <h1
            contentEditable={isEditingTitle}
            onDoubleClick={handleTitleDoubleClick}
            className="header-title"> Your List </h1>
          <div className="header-controls">
            <button className="header-button" onClick={onReviseButtonClick}> Revise </button>
            <FaPlusCircle className="header-add" onClick={showModal} />
          </div>
        </div>
        <ul className="item-list">
          {items.length === 0 ? (
            <li className="list-placeholder">
              <span>
                No items in the list. Click the + button to add new items.
              </span>
            </li>
          ) : (
            items.map((item, index) => (
              <ListItem
                key={item.id}
                index={index}
                item={item}
                isSelected={selectedIndex === index}
                isHighlighted={highlightedItemId === item.id}
                onClick={(index) => setSelectedIndex(index)}
                onTapIncreaseCount={increaseCount}
                onTapDecreaseCount={decreaseCount}
                onTapDelete={deleteItem}
                onTagChange={onTagChange} onEdit={onEdit} 
                onHighlightedItemAcknowledge={() => { setHighlightedItemId(null); }}
                />
            ))
          )}
        </ul>
      </div>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Item</h2>
            <input
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              placeholder="Enter item name"
              className="modal-input"
              ref={modalInputRef}
            />
            <div className="modal-actions">
              <button onClick={handleCancel} className="modal-button cancel">
                Cancel
              </button>
              <button onClick={handleOk} className="modal-button primary">
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal.isVisible && (
        <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit an item</h2>
          <input
            value={editModalInput}
            onChange={(e) => setEditModalInput(e.target.value)}
            placeholder="Enter item name"
            className="modal-input"
            type="text"
            ref={modalInputRef}
          />
          <div className="modal-actions">
            <button onClick={() => { 
              setEditModalInput("");
              setEditModal({ isVisible: false, input: -1 }); 
              }} className="modal-button cancel">
              Cancel
            </button>
            <button onClick={() => handleSave(editModal.input, editModalInput)} disabled={editModalInput.trim() === ""} className="modal-button primary">
              Save
            </button>
          </div>
        </div>
      </div>
      )}
      
      <footer className="footer">
        <p>&copy; 2024 Revisor. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
