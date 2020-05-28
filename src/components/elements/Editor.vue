<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="fas fa-bold"></i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="fas fa-italic"></i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <i class="fas fa-strikethrough"></i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="fas fa-underline"></i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <i class="fas fa-code"></i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <i class="fas fa-paragraph"></i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <i class="fas fa-heading"></i>
        </button>
        <!-- 
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >H2</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >H3</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="code" />
        </button>

        <button class="menubar__button" @click="commands.horizontal_rule">
          <icon name="hr" />
        </button>-->

        <button type="button" class="menubar__button" @click="commands.undo">
          <i class="fas fa-undo"></i>
        </button>

        <button type="button" class="menubar__button" @click="commands.redo">
          <i class="fas fa-redo"></i>
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: ["value"],
  data() {
    return {
      editor: null,
      emitAfterOnUpdate: false
    };
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Image()
      ],
      content: this.value,
      onUpdate: ({ getHTML }) => {
        this.emitAfterOnUpdate = true;
        this.$emit("editorContent", getHTML());
      }
    });
    this.editor.setContent(this.value);
  },
  watch: {
    value(val) {
      if (this.emitAfterOnUpdate) {
        this.emitAfterOnUpdate = false;
        return;
      }
      if (this.editor) this.editor.setContent(val);
    }
  }
};
</script>
<style lang="scss" scoped>
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  &:focus {
    outline: none;
  }
}

*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: "Inter";
  font-size: 18px;
  color: $color-black;
  line-height: 1.5;
}

body {
  margin: 0;
}

a {
  color: inherit;
}

h1,
h2,
h3,
p,
ul,
ol,
pre,
blockquote {
  margin: 1rem 0 !important;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

h1,
h2,
h3 {
  line-height: 1.3;
}

.button {
  font-weight: bold;
  display: inline-flex;
  background: transparent;
  border: 0;
  color: $color-black;
  padding: 0.2rem 0.5rem;
  margin-right: 0.2rem;
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba($color-black, 0.1);

  &:hover {
    background-color: rgba($color-black, 0.15);
  }
}

.message {
  background-color: rgba($color-black, 0.05);
  color: rgba($color-black, 0.7);
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.menubar {
  margin-bottom: 1rem;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-black;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba($color-black, 0.05);
    }

    &.is-active {
      background-color: rgba($color-black, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}

.editor {
  position: relative;
  max-width: 30rem;
  margin: 0 auto 5rem auto;

  &__content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;

    * {
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: $color-black;
      color: $color-white;
      font-size: 0.8rem;
      overflow-x: auto;

      code {
        display: block;
      }
    }

    p code {
      padding: 0.2rem 0.4rem;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      background: rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
    }

    ul,
    ol {
      padding-left: 1rem;
    }

    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }

    a {
      color: inherit;
    }

    blockquote {
      border-left: 3px solid rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin: 0;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid $color-grey;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }

    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  background: $color-black;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  &__button {
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $color-white;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: rgba($color-white, 0.1);
    }

    &.is-active {
      background-color: rgba($color-white, 0.2);
    }
  }

  &__form {
    display: flex;
    align-items: center;
  }

  &__input {
    font: inherit;
    border: none;
    background: transparent;
    color: $color-white;
  }
}
</style>
