import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";

function Input(props) {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [tags, setTags] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const tagifyRef = useRef();
  const [cursorPosition, setCursorPosition] = useState(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setUploadFile(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e, emojiObject) => {
    const ref = inputRef.current;
    const emoji = emojiObject.emoji;
    ref.focus();
    const start = input.substring(0, ref.selectionStart);
    const end = input.substring(ref.selectionStart);
    setInput(start + emoji + end);
    setCursorPosition(start.length + emoji.length);
  };

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmojis(!showEmojis);
  };

  const settings = {
    dropdown: {
      enabled: 1,
    },
    templates: {
      dropdownItem: function (tagData) {
        try {
          return `<div class='tagify__dropdown__item ${
            tagData.class ? tagData.class : ""
          }' tagifySuggestionIdx="${tagData.tagifySuggestionIdx}">
                            <p><strong>${tagData.value}</strong></P>
                            <span>${tagData.year}</span>
                        </div>`;
        } catch (err) {}
      },
    },
    enforceWhitelist: true,
  };

  const loadMovieTags = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/tags");
      setTags(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMovieTags();
  }, []);

  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const sendPost = async (e) => {
    e.preventDefault();

    const form_data = new FormData();
    form_data.append("text", input);
    form_data.append("user", localStorage.getItem("userid"));
    if (selectedTags) {
      JSON.parse(selectedTags).forEach((tag) => {
        form_data.append("movie", tag.id);
      });
    }
    if (uploadFile) {
      form_data.append("image", uploadFile, uploadFile.name);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/create_post",
        form_data,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      props.callback(res.data);
      setInput("");
      setUploadFile(null);
      setSelectedFile(null);
      setSelectedTags(null);
      setShowEmojis(false);
      tagifyRef.current && tagifyRef.current.removeAllTags();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-b border-gray-700 p-3 flex space-x-3">
     <img
        src={localStorage.getItem("useravatar") !== "null"? localStorage.getItem("useravatar") : "/assets/default_avatar.jpg"}
        //
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="divide-y divide-gray-700 w-full">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          ref={inputRef}
          placeholder="What's happening?"
          rows="2"
          className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
        />
        <Tags
          tagifyRef={tagifyRef}
          settings={settings}
          onChange={(e) => {
            setSelectedTags(e.detail.value);
          }}
          delimiters={null}
          placeholder={"Add tags here"}
          whitelist={tags}
        />
        {selectedFile && (
          <div className="relative">
            <div
              className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
              onClick={() => {
                setSelectedFile(null);
                setUploadFile(null);
              }}
            >
              <XIcon className="text-white h-5" />
            </div>
            <img
              src={selectedFile}
              alt=""
              className="rounded-2xl max-h-80 object-contain"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div
              className="inputicon"
              onClick={() => filePickerRef.current.click()}
            >
              <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
              <input
                type="file"
                ref={filePickerRef}
                hidden
                onChange={addImageToPost}
              />
            </div>

            <div className="inputicon">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="inputicon" onClick={handleShowEmojis}>
              <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="inputicon">
              <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
          </div>

          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input && !selectedFile}
            onClick={sendPost}
          >
            Post
          </button>
        </div>
        {showEmojis && (
          <Picker
            onEmojiClick={addEmoji}
            pickerStyle={{
              position: "relative",
              marginLeft: 40,
              borderRadius: "20px",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Input;
