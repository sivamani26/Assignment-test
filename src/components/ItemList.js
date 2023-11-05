import React, { useState, useEffect, useRef } from "react";
import "./ItemList.css";

const ItemList = () => {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDropdownExpanded, setDropdownExpanded] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setData(data.products);
      });
  }, []);

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
  }, []);

  const handleSelect = (value) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems([...selectedItems, value]);
      setSearch("");
    }
  };

  const handleInputClick = () => {
    if (!isDropdownExpanded) {
      setDropdownExpanded(true);
    }
  };

  const handleDeselect = (value) => {
    setSelectedItems(selectedItems.filter((item) => item !== value));
  };

  const handleDocumentClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      console.log("Document clicked");
      setDropdownExpanded(false);
    }
  };

  const handleClearAll = () => {
    setSelectedItems([]);
  };

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
        {/* items that user selected */}

        {selectedItems.map((item) => (
          <span key={item} className="selected-item">
            {item}{" "}
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

        {/* Search input field */}

        <input
          type="text"
          placeholder="Enter Products..."
          value={search}
          onClick={handleInputClick}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* to handle clear all button */}

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

      {/*List of Items */}

      {isDropdownExpanded && (
        <div className="dropdown">
          <select multiple onChange={(e) => handleSelect(e.target.value)}>
            {filteredData.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      )}
  
    {/* Conditionally rendering the submit button */}

      <button
        onClick={handleSubmit}
        disabled={selectedItems.length <= 0}
        className={
          selectedItems.length <= 0 ? "disabled-button" : "submit-button"
        }
      >
        Submit
      </button>
    </div>
  );
};

export default ItemList;
