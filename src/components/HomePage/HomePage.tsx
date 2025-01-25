import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { RevisionItemsManager } from "../../Database/RevisionItemManager";
import { RevisionItem } from "../../Database/RevisionItem";

const HomePage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [items, setItems] = useState<RevisionItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const revisionItemManager = new RevisionItemsManager();
  const [highlighted, setHighlightedItem] = useState<RevisionItem | null>(null);

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

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const increaseCount = (index: number) => {
    const newItems = [...items];
    const itemToUpdate = newItems[index];
    itemToUpdate.count += 1;
    setItems(newItems);
    revisionItemManager.update(itemToUpdate);
    // localStorage.setItem('items', JSON.stringify(newItems));
  };

  const decreaseCount = (index: number) => {
    const newItems = [...items];
    if (newItems[index].count > 0) {
      const itemToUpdate = newItems[index];
      itemToUpdate.count -= 1;
      setItems(newItems);
      revisionItemManager.update(itemToUpdate);
      // localStorage.setItem('items', JSON.stringify(newItems));
    }
  };

  const deleteItem = (index: number) => {
    let id = items[index].id;
    revisionItemManager.delete(id);
    const filterItems = items.filter((item) => item.id !== id);
    setItems(filterItems);
  };

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
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
    // 1. Get an item to revise.
    revisionItemManager.getAnItemToRevise().then((item) => {
      setHighlightedItem(item);
    });

    // 2. Show the item in a modal.
    // 3. Bookmarked the item or similar so that user later increase the revision count of item.
  };

  return (
    <div className="homepage-container">
      <div className="header-content">
        <div className="header">
          <h1
            contentEditable={isEditingTitle}
            onDoubleClick={handleTitleDoubleClick}
            className="header-title"
          >
            Your List
          </h1>
          <div className="header-controls">
            <button className="header-button" onClick={onReviseButtonClick}>
              Revise
            </button>
            <FaPlusCircle className="header-add" onClick={showModal} />
          </div>
        </div>
        <ul className="item-list">
          {items.length === 0 ? (
            <li className="list-item placeholder">
              <span>
                No items in the list. Click the + button to add new items.
              </span>
            </li>
          ) : (
            items.map((item, index) => (
              <li key={index}
                className={`list-item 
                ${selectedIndex === index ? "selected" : ""} 
                ${highlighted && highlighted.id === item.id ? "highlighted" : ""}
              `} onClick={() => setSelectedIndex(index)}>
                <span>
                  {index + 1}. {item.name}
                </span>
                <div className="item-controls">
                  {selectedIndex === index && (
                    <button
                      onClick={() => decreaseCount(index)}
                      className="control-button"
                    >
                      -
                    </button>
                  )}
                  <span className="item-count">{item.count}</span>
                  {selectedIndex === index && (
                    <>
                      <button
                        onClick={() => increaseCount(index)}
                        className="control-button"
                      >
                        +
                      </button>
                      <FaTrash
                        onClick={() => deleteItem(index)}
                        className="control-button delete-icon"
                      />
                    </>
                  )}
                </div>
              </li>
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
              <button onClick={handleOk} className="modal-button ok">
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="footer">
        <p>&copy; 2024 Randomizer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
