import React from "react";
import { TagsInput } from "react-tag-input-component";
import { Label, useField } from "payload/components/forms";

import "./TagInput.scss";

type Props = {
  path: string;
  placeholder: string;
  className: string;
  label: string;
  name: string;
};

const TagInput: React.FC<Props> = ({ className, path, placeholder, label, name }) => {
  const { value, setValue, showError } = useField<string>({ path });

  const tags = value?.split(" ") ?? [];
  const setTags = (array: string[]) => setValue(array.join(" "));

  const classes = ["field-type", "text", className, showError && "error", "container"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="tagInputFieldWrapper">
      <Label htmlFor={`field-${path.replace(/\./gi, "__")}`} label={label} />
      <div className={classes}>
        <TagsInput
          name={name}
          value={tags}
          onChange={setTags}
          placeHolder={placeholder}
          separators={["Enter", " "]}
        />
      </div>
    </div>
  );
};

export default TagInput;
