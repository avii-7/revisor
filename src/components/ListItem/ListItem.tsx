import React from "react";
import "./ListItem.css";

type ListItemProps = {
  index: number;
  isChecked: boolean;
  title: string;
};

function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {

}

const ListItem = (props: ListItemProps) => {

  const {index, isChecked, title} = props;

  return (
    <ol className="list">
      <li>
        <input
          type="checkbox"
          id={`box ${index}`}
          name={`box ${index}`}
          value={title}
          defaultChecked = {isChecked}
          onChange={onInputChange}
        />
        <label>{title}</label>
        <br></br>
      </li>
    </ol>
  );
};

export default ListItem;
