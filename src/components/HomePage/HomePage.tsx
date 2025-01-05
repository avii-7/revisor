import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css';
import { FaTrash, FaPlusCircle } from 'react-icons/fa';

interface ListItem {
  name: string;
  count: number;
}

const HomePage = () => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [items, setItems] = useState<ListItem[]>(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (modalInput.trim() !== '') {
      const newItems = [...items, { name: modalInput, count: 0 }];
      setItems(newItems);
      localStorage.setItem('items', JSON.stringify(newItems));
      setModalInput('');
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const increaseCount = (index: number) => {
    const newItems = [...items];
    newItems[index].count += 1;
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  const decreaseCount = (index: number) => {
    const newItems = [...items];
    if (newItems[index].count > 0) {
      newItems[index].count -= 1;
      setItems(newItems);
      localStorage.setItem('items', JSON.stringify(newItems));
    }
  };

  const deleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  };

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isModalVisible) {
        handleOk();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
      if (selectedIndex !== null && !event.composedPath().some(el => (el as HTMLElement).classList?.contains('list-item'))) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedIndex]);

  return (
    <div className="homepage-container">
      <div className='header-content'> 
      <div className="header">
        <h1 contentEditable={isEditingTitle} onDoubleClick={handleTitleDoubleClick} className="header-title">Your List</h1>
        <FaPlusCircle className="header-add" onClick={showModal}/>
      </div>
      <ul className="item-list">
        {items.length === 0 ? (
          <li className="list-item placeholder">
            <span>No items in the list. Click the + button to add new items.</span>
          </li>
        ) : (
          items.map((item, index) => (
            <li 
              key={index} 
              className={`list-item ${selectedIndex === index ? 'selected' : ''}`} 
              onClick={() => setSelectedIndex(index)}
            >
              <span>{index + 1}. {item.name}</span> 
              <div className="item-controls">
              {selectedIndex === index && (
                  <button onClick={() => decreaseCount(index)} className="control-button">-</button>)}
                  <span className="item-count">{item.count}</span>
                  {selectedIndex === index && (
                    <>    
                    <button onClick={() => increaseCount(index)} className="control-button">+</button>
                    <FaTrash onClick={() => deleteItem(index)} className="control-button delete-icon" />
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
              <button onClick={handleCancel} className="modal-button cancel">Cancel</button>
              <button onClick={handleOk} className="modal-button ok">Ok</button>
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