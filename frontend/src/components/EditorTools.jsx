import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  image: Image,
  list: {
    class: List,
    inlineToolbar: true,
  },
  quote: Quote,
  header: {
    class: Header,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1,
    },
  },
  marker: Marker,
  inlineCode: InlineCode,
};
