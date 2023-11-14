import React, { type KeyboardEventHandler } from "react";
import { Label, useField } from "payload/components/forms";
import CreatableSelect from "react-select/creatable";

import { ClearIndicator } from "payload/dist/admin/components/elements/ReactSelect/ClearIndicator";
import { Control } from "payload/dist/admin/components/elements/ReactSelect/Control";
import { MultiValue } from "payload/dist/admin/components/elements/ReactSelect/MultiValue";
import { MultiValueLabel } from "payload/dist/admin/components/elements/ReactSelect/MultiValueLabel";
import { MultiValueRemove } from "payload/dist/admin/components/elements/ReactSelect/MultiValueRemove";
import { ValueContainer } from "payload/dist/admin/components/elements/ReactSelect/ValueContainer";
import { Option } from "payload/dist/admin/components/elements/ReactSelect/types";

import "./TagInput.scss";

type Props = {
  path: string;
  label: string;
  name: string;
};

const components = {
  ClearIndicator,
  Control,
  MultiValue,
  MultiValueLabel,
  MultiValueRemove,
  ValueContainer,
  DropdownIndicator: null,
};

const TagInput: React.FC<Props> = ({ path, label, name }) => {
  const { value, setValue } = useField<string>({ path });

  const [inputValue, setInputValue] = React.useState("");

  const tags =
    value
      ?.split(" ")
      .filter((v) => v)
      .map((t) => ({ label: t, value: t }) as Option) ?? [];
  const setTags = (opt: Option | Option[]) => {
    setValue(Array.isArray(opt) ? opt.map((o) => o.value).join(" ") : opt.value);
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
      case " ":
        setTags([...tags, { label: inputValue, value: inputValue }]);
        setInputValue("");
        event.preventDefault();
    }
  };

  return (
    <div className="field-type">
      <Label htmlFor={`field-${path.replace(/\./gi, "__")}`} label={label} />
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        name={name}
        className="react-select"
        classNamePrefix="rs"
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue: Option | Option[]) => setTags(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        value={tags}
      />
    </div>
  );
};

export default TagInput;
