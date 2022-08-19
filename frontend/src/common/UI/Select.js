import { useState } from "react";

import classes from "./Select.module.scss";

import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

const Select = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.topic);
  const [optionVisible, setOptionVisible] = useState(false);

  const showOptionHandler = () => {
    setOptionVisible(!optionVisible);
  };

  const changeOptionHandler = (event) => {
    const value = event.target.innerText;
    setSelectedOption(value);
    setOptionVisible(false);
    props.changeOptionHandler(value);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.selected}>
          <button type="button" onClick={showOptionHandler}>
            <span>{selectedOption}</span>
          </button>
          {!optionVisible ? (
            <MdOutlineArrowDropDown />
          ) : (
            <MdOutlineArrowDropUp />
          )}
        </div>
        {optionVisible && (
          <ul className={classes.options}>
            {props.options.map((option) => (
              <li key={option} onClick={changeOptionHandler}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Select;
