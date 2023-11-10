import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
} from "antd";
import { BodyComponent } from "./BodyMapComponent";
import FormItem from "antd/es/form/FormItem";
import { useStore } from "../app/context/store";
import { data } from "autoprefixer";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { set } from "@auth0/nextjs-auth0/dist/session";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};



function convertFormResponseToInjury(data, user, bodyParts) {
  const { values } = data;

  const injuryData = {
    injuryDate: new Date(values["Injury Date"]),
    injuryTime: new Date(values["Injury Time"]),
    injuryList: [],
    reportedById: user.id,
  };

  bodyParts.forEach((part) => {
    const partName = part.name;
    const partValue = values[partName];

    if (partValue) {
      injuryData.injuryList.push({
        bodyPart: partName,
        description: partValue,
      });
    }
  });

  return injuryData;
}

const bodyPartsResponse = [
  { "name": "head" },
  { "name": "right_leg_upper" },
  { "name": "chest" },
  { "name": "right_shoulder" },
  { "name": "right_arm" },
  { "name": "right_hand" },
  { "name": "stomach" },
  { "name": "left_leg_upper" },
  { "name": "left_leg_lower" },
  { "name": "right_leg_lower" },
  { "name": "right_foot" },
  { "name": "left_foot" },
  { "name": "left_hand" },
  { "name": "left_arm" },
  { "name": "left_shoulder" },
];



// get the store

const FormComponent = () => {
  const da = useStore();
  const { user, error, isLoading } = useUser();
  const jsonData = da.Data;
  // console.log(jsonData)
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(user.name);

  const handleData = () => {
    if (!jsonData || Object.keys(jsonData).length === 0) {
      console.log("The JSON is empty.");
      return;
    }

    const selectedItemsData = [];
    Object.keys(jsonData).forEach((key) => {
      if (jsonData[key].selected) {
        selectedItemsData.push({ name: key });
      }
    });
    setSelectedItems(selectedItemsData);
  };
  console.log("selectedItems");
  console.log(selectedItems);

  useEffect(() => {
    handleData();
  }, [jsonData]);
  const onFinish = (values) => {
    // console.log("Success:", values, selectedItems);
    const formData = {
      values: values,
      user: user.name,
    };
    console.log(formData);
    // convertFormDataToInjury(formData, user.name)
    console.log(convertFormResponseToInjury(formData, formData.user, bodyPartsResponse))
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const srr = require("../data/injuries");

  return (
    <>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="Full Name"
          style={{ width: "400px" }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input required style={{ width: "300px" }} />
        </Form.Item>
        <Form.Item
          label="Injury Date"
          name="Injury Date"
          style={{ width: "400px" }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <DatePicker required style={{ width: "300px" }} />
        </Form.Item>
        <Form.Item
          label="Injury Time"
          name="Injury Time"
          style={{ width: "400px" }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <TimePicker style={{ width: "300px" }} required />
        </Form.Item>
        <Form.Item>
          <h2>injuries:</h2>
        {selectedItems.length <= 0 ? (
          <p>select a body part to report injury</p>
          ):null}
        </Form.Item>
        <div>
          {selectedItems.length > 0 ? (
            <div style={{ width: "400px", marginRight: "auto" }}>
              {selectedItems.map((item) => (
                <Form.Item
                  label={item.name}
                  name={item.name}
                  style={{ width: "400px" }}
                  key={item.name}
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <TextArea placeholder="Injury Detail" required />
                </Form.Item>
              ))}
            </div>
          ) : null}
        </div>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {selectedItems.length > 0 ? (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          ) : (
            ""
          )}
        </Form.Item>
      </Form>
    </>
  );
};
export default FormComponent;
