import { useEffect, useState } from "react";

// Example input history data
// const inputHistory = ["apple", "banana", "cherry", "orange"];

const AutoSuggestInput = ({
  cellInfo,
  handleCellRenderChange,
  setSuggestionData,
}) => {
  const [userInput, setUserInput] = useState(cellInfo?.value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [inputHistory, setInputHistory] = useState([]);

  useEffect(() => {
    const newHistory = JSON.parse(localStorage.getItem("suggestInput")) || [];
    setInputHistory(newHistory);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    handleCellRenderChange(cellInfo, e.target.value);
    const filteredSuggestions = inputHistory?.filter((item) => {
      const inputValue = value.toLowerCase();
      const filterValue = item.toLowerCase();
      return filterValue.startsWith(inputValue);
    });
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionSelect = (suggestion) => {
    // Update the input field value with the selected suggestion
    setUserInput(suggestion);
    handleCellRenderChange(cellInfo, suggestion);
    // Clear the suggestions
    setSuggestions([]);
  };

  const handleStoreInputValue = (e) => {
    const storedArray = JSON.parse(localStorage.getItem("suggestInput")) || [];
    const itemExists = storedArray.some((item) => item == e);
    if (!itemExists) {
      storedArray.push(e.target.value);
      setInputHistory(storedArray);
      setSuggestionData(storedArray);
    }
    // setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onBlur={handleStoreInputValue}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />
      {suggestions.length > 0 && (
        <ul className=" absolute overflow-scroll bg-scroll">
          {suggestions.map((suggestion, i) => (
            <li
              key={i}
              className=" cursor-pointer hover:bg-gray-200 px-5 py-1 w-[350px]"
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggestInput;
