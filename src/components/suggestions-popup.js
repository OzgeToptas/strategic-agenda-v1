import React, { useEffect } from "react";

const SuggestionsPopup = ({ suggestions, setSuggestions, quillRef }) => {
  const listSuggesstions = suggestions && suggestions[0] && suggestions[0];

  useEffect(() => {
    underlineAllMisspels();
  }, [suggestions]);

  const handleAddToDictionary = () => {
    goToNextSuggestion();
  };

  const handleIgnore = () => {
    goToNextSuggestion();
  };

  const handleSuggestionClick = (suggestionText) => {
    const allText = quillRef?.current?.getText();

    //replace misspelled word with fixed one
    quillRef?.current?.setText(
      allText?.replace(listSuggesstions?.original, suggestionText)
    );

    goToNextSuggestion();
  };

  const goToNextSuggestion = () => {
    // Remove fixed suggesstion from list
    setSuggestions(
      suggestions?.filter((suggestion) => {
        if (suggestion?.original === listSuggesstions?.original) {
          return false;
        }

        return true;
      })
    );
  };

  function underlineAllMisspels() {
    const allText = quillRef?.current?.getText();

    //remove all underlines from quill input
    quillRef?.current?.formatText(0, 10000, {
      underline: false,
    });

    suggestions?.forEach((suggestion) => {
      //add underlines to misspelled words
      quillRef?.current?.formatText(
        allText?.indexOf(suggestion?.original),
        suggestion?.original?.length,
        {
          underline: true,
        }
      );
    });
  }

  return (
    <>
      {listSuggesstions?.suggestions?.length > 0 ? (
        <div className="suggestion-popup">
          <div className="suggestions-texts">
            {listSuggesstions?.suggestions?.map((item, index) => {
              return (
                <div
                  className="suggestion-text-item"
                  key={"suggestion_" + index}
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="suggestion-actions">
            <div
              className="suggestion-action-item"
              onClick={handleAddToDictionary}
            >
              Add To Dictionary
            </div>
            <div className="suggestion-action-item" onClick={handleIgnore}>
              Ignore
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SuggestionsPopup;
