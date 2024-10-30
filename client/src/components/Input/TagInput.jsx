import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="d-flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="d-flex align-items-center text-sm text-slate-900 bg-light px-3 py-1 rounded me-2 mb-2"
            >
              #{tag}
              <button
                className="btn btn-link text-danger ms-1"
                onClick={() => handleRemoveTag(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="d-flex align-items-center gap-2 mt-3">
        <input
          type="text"
          value={inputValue}
          className="form-control form-control-sm"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="btn btn-outline-primary d-flex align-items-center justify-content-center"
          onClick={addNewTag}
        >
          <MdAdd className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
