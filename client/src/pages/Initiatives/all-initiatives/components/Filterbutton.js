import React from "react";
import styled from "styled-components";
import { Select } from "antd";
import { RiArrowDownSLine } from "react-icons/ri";
const { Option } = Select;

const Filterbutton = ({ getTheValue }) => {
  const handleChange = (value) => {
    getTheValue(value);
  };

  return (
    <Wrapper>
      <span className="arrow">
        <RiArrowDownSLine />
      </span>
      <Select
        defaultValue="newest"
        style={{ width: 142, textAlign: "right" }}
        onChange={handleChange}
        dropdownStyle={{
          textAlign: "right",
          fontSize: "10px",
        }}
      >
        <Option value="newest">الأحدث</Option>
        <Option value="cloned">أكثر المبادرات تنفيذاً</Option>
        <Option value="liked">أكثر المبادرات إعجابًا</Option>
        <Option value="saved">أكثر المبادرات تفضيلًا</Option>
        <Option value="shared">أكثر المبادرات مشاركةً</Option>
      </Select>
    </Wrapper>
  );
};

export default Filterbutton;
const Wrapper = styled.div`
  position: relative;
  margin-right: 15px;
  .ant-select-arrow {
    display: none;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    padding: 5px 12px;
    border-radius: 4px;
  }
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: auto;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding-right: 0;
  }
  .arrow {
    position: absolute;
    top: 10px;
    left: 12px;
    z-index: 1;
  }
  
`;
