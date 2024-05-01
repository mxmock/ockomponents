import { useState } from "react";
import Input from "./view/input/input";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./view/button/button";
import Radio from "./view/radio/radio";
import Select from "./view/select/select";

const list = {
  id: "datalist-test",
  values: ["Value 1", "Test 2", "Value 3", "test 4"],
};

const options = [
  { id: "tab1", label: "Tab 1", Icon: FiX },
  { id: "tab2", label: "Tab 2" },
  { id: "tab3", label: "Tab 3", Icon: FiMenu },
];

const selectOptions = [
  { id: "select1", label: "Select 1" },
  {
    label: "Group 1",
    group: [
      { id: "grpselect1", label: "Group Select 1" },
      { id: "grpselect2", label: "Group Select 2" },
      { id: "grpselect3", label: "Group Select 3" },
    ],
  },
  { id: "select2", label: "Select 2" },
  { id: "select3", label: "Select 3" },
  {
    label: "Group 2",
    group: [
      { id: "grpselect4", label: "Group Select 4" },
      { id: "grpselect5", label: "Group Select 5" },
      { id: "grpselect6", label: "Group Select 6" },
    ],
  },
];

const Main = () => {
  const [value, setValue] = useState<string>("");
  const [selectValues, setSelectValues] = useState<string[]>([]);
  const [selectedRadio, setSelectedRadio] = useState<string>(options[1].id);

  const handleRadioChange = (active: string) => {
    console.log(active);
    setSelectedRadio(active);
  };

  const handleSelectChange = (values: string[]) => {
    console.log(values);
    setSelectValues(values);
  };

  return (
    <>
      <Input
        value={value}
        id="disableddd"
        required={true}
        label="Input test"
        suggestions={list}
        onChange={(v) => setValue(v)}
      />

      <hr style={{ margin: "80px 0px" }} />

      <Select
        multiple={true}
        required={true}
        disabled={false}
        value={selectValues}
        options={selectOptions}
        onChange={handleSelectChange}
      />

      <hr style={{ margin: "80px 0px" }} />

      <Radio
        options={options}
        active={selectedRadio}
        onChange={handleRadioChange}
      />

      <hr style={{ margin: "80px 0px" }} />

      <div style={{ display: "flex", justifyContent: "center", gap: "32px" }}>
        <Button disabled={false} />
        <Button
          color={"#000"}
          bgColor="var(--blue-2)"
          borderColor="var(--blue-2)"
          disabled={false}
          Icon={FiMenu}
        />
        <Button
          link="#"
          borderColor="var(--red-2)"
          outline={true}
          text="My link"
          Icon={FiX}
        />
      </div>
    </>
  );
};

export default Main;
