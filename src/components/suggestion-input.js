import React from "react";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import SuggestionsPopup from "./suggestions-popup";
import { debounce } from "underscore";

const SuggestionInput = ({ lang = "en", eid = "" }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const quillRef = useRef();
  const EDITOR_ID = "editor-" + eid;

  useEffect(() => {
    quillRef.current = new Quill("#" + EDITOR_ID);
    quillRef?.current?.root?.setAttribute("spellcheck", false);

    function update(delta, oldDelta, source) {
      //if quill is updated by user
      if (source === "user") {
        searchSuggession();
      }
    }

    const lazyUpdate = debounce(update, 1000);

    quillRef?.current?.on("text-change", lazyUpdate);
  }, []);

  const searchSuggession = async () => {
    const allText = quillRef?.current?.getText();

    const form = new FormData();
    form.append("text", allText);
    form.append("lang", lang);

    setLoading(true);
    const response = await fetch("http://35.197.120.214:5000/api/v1/spell", {
      method: "POST",
      body: form,
    }).then((response) => {
      setLoading(false);
      return response.json();
    });

    setSuggestions(response);
  };

  return (
    <div className="container">
      <div className="editor-container">
        <div id={EDITOR_ID} className="editor"></div>
      </div>
      {loading ? <div className="loading">Loading...</div> : ""}
      <SuggestionsPopup
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        quillRef={quillRef}
      />
    </div>
  );
};

export default SuggestionInput;
