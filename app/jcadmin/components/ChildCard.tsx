// components/ChildCard.tsx

import React from "react";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface ChildCardProps {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: number;
  dateOfBirth: string;
  parent: string;
  gender: string;
  photograph: string;
  specialNeeds: string;
  status: string;
  onClick: () => void;
}

const ChildCard: React.FC<ChildCardProps> = ({
  firstName,
  lastName,
  gender,
  ageGroup,
  dateOfBirth,
  parent,
  photograph,
  specialNeeds,
  status,
  onClick,
}) => {
  return (
    <Card
      className="p-4 bg-white shadow rounded-lg cursor-pointer"
      style={{ width: "18rem", height: "10rem", margin: "1" }}
      border="primary"
      onClick={onClick}
    >
      <Card.Body className="flex justify-center items-center space-x-4">
        <Image
          src={photograph}
          alt={`${firstName} ${lastName}`}
          width={60}
          height={50}
          className="rounded-full"
        />
        {/* <Card.Img className=" w-24" variant="top" src={photograph} /> */}
        <div>
          <Card.Title>
            {firstName} {lastName}
          </Card.Title>
          <Card.Text>
            <span className=" text-xs"> {`${ageGroup} yrs, ${gender}`}</span>
            <br />
            <span
              className={`text-sm ${
                status === "Checked In" ? "text-green-500" : "text-red-500"
              }`}
            >
              {status}
            </span>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChildCard;
