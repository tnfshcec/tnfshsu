import React from "react";
import { FieldDescription, Label, useField } from "payload/components/forms";
import Select from "react-select";
import type { TextField } from "payload/types";

import { ClearIndicator } from "payload/dist/admin/components/elements/ReactSelect/ClearIndicator";
import { Control } from "payload/dist/admin/components/elements/ReactSelect/Control";
import { MultiValue } from "payload/dist/admin/components/elements/ReactSelect/MultiValue";
import { MultiValueLabel } from "payload/dist/admin/components/elements/ReactSelect/MultiValueLabel";
import { MultiValueRemove } from "payload/dist/admin/components/elements/ReactSelect/MultiValueRemove";
import { ValueContainer } from "payload/dist/admin/components/elements/ReactSelect/ValueContainer";
import Chevron from "payload/dist/admin/components/icons/Chevron";
import { Option } from "payload/dist/admin/components/elements/ReactSelect/types";

import "./TagInput.scss";

type Props = Omit<TextField, "type"> & {
  path: string;
  icons: Option[];
  searchTimeout?: number;
};

const iconify = new URL("https://api.iconify.design/search?collection=mdi");

const searchIcon = async (query: string): Promise<string[]> => {
  iconify.searchParams.set("query", query);
  return fetch(iconify)
    .then((r) => r.json())
    .then((j) => j.icons ?? []);
};

const makeOption = (value: string) => ({ value, label: value }) as Option;

const components = {
  ClearIndicator,
  Control,
  MultiValue,
  MultiValueLabel,
  MultiValueRemove,
  ValueContainer,
  DropdownIndicator: Chevron,
};

const IconSelector: React.FC<Props> = ({
  path,
  label,
  name,
  required,
  icons,
  searchTimeout,
  admin: { description },
}) => {
  const { value, setValue } = useField<string>({ path });

  const [options, setOptions] = React.useState(icons);

  const icon = makeOption(value);
  const setIcon = (newValue: Option) => setValue(newValue?.value ?? "");

  let reqTimeout: NodeJS.Timeout;
  const handleInput = (input: string) => {
    if (reqTimeout) clearTimeout(reqTimeout);

    reqTimeout = setTimeout(() => {
      searchIcon(input).then((result) => {
        setOptions(icons.concat(result.map(makeOption)));
      });
    }, searchTimeout ?? 500);
  };

  return (
    <div className="field-type">
      <Label htmlFor={`field-${path.replace(/\./gi, "__")}`} label={label} required={required} />
      <Select
        components={components}
        name={name}
        className="react-select"
        classNamePrefix="rs"
        isClearable
        onChange={setIcon}
        onInputChange={handleInput}
        options={options}
        value={icon}
      />
      <FieldDescription description={description} value={value} />
    </div>
  );
};

export default IconSelector;
