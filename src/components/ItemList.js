import React, { useState, useEffect, useRef } from "react";
import "./ItemList.css";

const ItemList = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDropdownExpanded, setDropdownExpanded] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setData(data.products));
  },[]);

  useEffect(() => {
    const filteredItems = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredItems);
  }, [search, data]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  },[]);

  const handleSelect = (value) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems([...selectedItems, value]);
      setSearch("");
      setIsValid(true);
    }
  };

  const handleInputClick = () =>
    !isDropdownExpanded && setDropdownExpanded(true);

  const handleDocumentClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      console.log("Document clicked");
      setDropdownExpanded(false);
    }
  };

  const handleDeselect = (value) =>{
  setSelectedItems(selectedItems.filter((item) => item !== value));
  setIsValid(selectedItems.length - 1 > 0);
  }

  const handleClearAll = () => {
    setSelectedItems([]);
    setIsValid(false);
  }

  const handleSubmit = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
    } else {
      alert("Selected items: " + selectedItems.join(", "));
    }
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="item_container">
        {selectedItems.map((item) => (
          <span key={item} className="selected-item">
            {item}
            <a
              href="/"
              onClick={(e) => {
                handleDeselect(item);
                e.preventDefault();
              }}
            >
              <img src="/close_Icon.svg" alt="Close" />
            </a>
          </span>
        ))}

        <input
          type="text"
          placeholder="Enter Products..."
          value={search}
          onClick={handleInputClick}
          onChange={(e) => setSearch(e.target.value)}
        />

        {selectedItems.length > 0 && (
          <span className="Clear_all" onClick={handleClearAll}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <img src="/close_Icon.svg" alt="Close" />
            </a>
          </span>
        )}
      </div>

      {isDropdownExpanded && (
        <div className="dropdown">
          <select multiple   onChange={(e) => handleSelect(e.target.value)}>
            {filteredData.map((item) => (
              <option key={item.id} >
                {item.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={!isValid ? "disabled-button" : "submit-button"}
      > 
        Submit
      </button>
    </div>
  );
};

export default ItemList;
