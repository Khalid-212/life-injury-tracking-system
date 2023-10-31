import React, { useEffect, useRef, useState } from "react";
import { Space, Steps, Tour } from "antd";
import { BodyComponent } from "./BodyMapComponent";
import FormComponent from "./FormComponent";
import Image from "next/image";
import step1 from "../public/assets/step1.png";
import step2 from "../public/assets/step2.png";
import step3 from "../public/assets/step3.png";
import step4 from "../public/assets/step4.png";
import step5 from "../public/assets/step5.png";
import step6 from "../public/assets/step6.png";

const description = "This is a description.";
const AddInjuryComponent = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: "Step 1",
      description: "Select A body part where the injury is located.",
      cover: <Image alt="tour.png" src={step1} width={200} height={200} />,
      target: () => ref1.current,
    },
    {
      title: "Step 2",
      description: "Enter Full name.",
      cover: <Image alt="tour.png" src={step2} width={200} height={200} />,
      target: () => ref2.current,
    },
    {
      title: "Step 3",
      description: "Enter the date of injury.",
      cover: <Image alt="tour.png" src={step3} width={200} height={200} />,
      target: () => ref3.current,
    },
    {
      title: "Step 4",
      description: "Enter the time of injury.",
      cover: <Image alt="tour.png" src={step4} width={200} height={200} />,
      target: () => ref3.current,
    },
    {
      title: "Step 5",
      description: "Enter injury details.",
      cover: <Image alt="tour.png" src={step5} width={200} height={200} />,
      target: () => ref3.current,
    },
    {
      title: "Step 6",
      description: "Submit Form.",
      cover: <Image alt="tour.png" src={step6} width={200} height={200} />,
      target: () => ref3.current,
    },
  ];
  const isFirstTime = localStorage.getItem("isFirstTime");

  useEffect(() => {
    if (isFirstTime === true || isFirstTime === null) {
      setOpen(true);
      localStorage.setItem("isFirstTime", false);
    }
  }, [isFirstTime]);
  const [curr,usecurr] = useState(0);
  return (
    <>
      <Space>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "2rem",
            width: "100%",
            height: "100%",
            // border: "1px solid red",
          }}
        >
          <div
            style={{
              width: 150,
              height: 150,
              marginBottom: "15rem",
            }}
          >
            <BodyComponent ref={ref1} />
          </div>
          <div style={{ width: "500px" }}>
            <FormComponent ref={ref2} />
          </div>
        </div>
      </Space>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};
export default AddInjuryComponent;
