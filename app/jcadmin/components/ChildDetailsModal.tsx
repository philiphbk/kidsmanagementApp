"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Modal, Button, Tab, Tabs, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import tempimage from "@/public/upload/pexels-binyamin-mellish-186077.jpg";

interface ChildDetailsModalProps {
  id: string;
  firstName: string;
  lastName: string;
  ageGroup: number;
  gender: string;
  status: string;
  photograph: string;
  parentId: string;
  caregiverIds: string;
  onClose: () => void;
  show: boolean;
}

interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

interface Caregiver {
  id: string;
  firstName: string;
  lastName: string;
  relationshipWithChild: string;
}

interface ActivityLog {
  id: string;
  parent_id: string;
  child_id: string;
  status: string;
  timestamp: string;
}

const ChildDetailsModal = ({
  id,
  firstName,
  lastName,
  ageGroup,
  gender,
  status,
  photograph,
  parentId,
  caregiverIds,
  onClose,
  show,
}: ChildDetailsModalProps) => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  const updateStatus = async (newStatus: string) => {
    try {
      await axios.post("/api/child", { status: newStatus });
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const updateActivity = async (
    newStatus: string,
    child_id: string,
    parent_id: string
  ) => {
    try {
      await axios.post("/api/activity_log", {
        status: newStatus,
        child_id: id,
        parent_id: parentId,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const listOfCaregiverId = useMemo(
    () => caregiverIds.split(","),
    [caregiverIds]
  );

  function convertToReadableFormat(utcTimestamp: string): {
    time: string;
    date: string;
  } {
    // Create a Date object from the UTC timestamp
    const dateObj = new Date(utcTimestamp);

    // Format the time
    const time = dateObj.toLocaleTimeString("en-GB", { hour12: false });

    // Format the date
    const date = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return { time, date };
  }

  useEffect(() => {
    let didCancel = false;
    const fetchParents = async () => {
      try {
        const result = await axios(`/api/parents?idParent=${parentId}`);
        if (!didCancel) {
          setParents(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch parents", error);
      }
    };
    const fetchCaregivers = async () => {
      try {
        const promises = listOfCaregiverId.map((id) =>
          axios(`/api/caregiver?idCaregiver=${id.trim()}`)
        );
        const results = await Promise.all(promises);
        if (!didCancel) {
          //const newData = results.map((result) => result.data);
          const newData = results.flatMap((result) => result.data);
          setCaregivers(newData);
        }
      } catch (error) {
        console.error("Failed to fetch caregivers", error);
      }
    };

    const fetchActivityLog = async () => {
      try {
        const result = await axios(`/api/activity_log`);
        if (!didCancel) {
          setActivityLog(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch activity log", error);
      }
    };

    fetchParents();
    if (listOfCaregiverId.length > 0) {
      fetchCaregivers();
    }
    fetchActivityLog();
    return () => {
      didCancel = true;
    };
  }, []);

  return (
    // Add this line to declare the 'show' variable
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      className="rounded-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{/* {firstName} {lastName} */}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center items-center">
          <Image
            src={photograph || tempimage}
            alt={`${firstName} ${lastName}`}
            className="rounded-full"
            width={90}
            height={90}
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">
              {firstName} {lastName}
            </h2>
            <p>{`${ageGroup} yrs, ${gender}`}</p>
            <span className="italic text-red-800">specialNeeds</span>
          </div>
          <span className="ml-4 bg-red-100 text-red-600 rounded-full text-sm p-2">
            {status}
          </span>
        </div>
        <Tabs
          id="controlled-tab-example"
          defaultActiveKey="home"
          className="mt-3 mb-3 flex justify-center gap-3 items-center"
          fill
        >
          <Tab
            eventKey="home"
            title={
              <span>
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Drop-off / Pick-up
              </span>
            }
          >
            <div className="flex justify-center gap-3">
              <div>
                <div className="text-lg font-semibold">Parents</div>
                <div className=" ">
                  {parents.map((parent) => (
                    <div
                      className=" border-2 border-gray-200 p-2 hover:bg-gray-100 cursor-pointer rounded-lg mb-2"
                      key={parent.id}
                    >{`${parent.firstName} ${parent.lastName}`}</div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-lg font-semibold">Caregivers</div>
                <div>
                  {caregivers.map((caregiver) => (
                    <div
                      className=" border-2 border-gray-200 p-2 hover:bg-gray-100 cursor-pointer rounded-lg mb-2"
                      key={caregiver.id}
                    >{`${caregiver.firstName} ${caregiver.lastName}`}</div>
                  ))}
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="log"
            title={
              <span>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Activity Log
              </span>
            }
            className="flex justify-center gap-3 items-center"
          >
            {/* Content for Activity Log */}
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ParentID</th>
                  <th>ChildId</th>
                  <th>Status</th>
                  <th>CheckedAt</th>
                </tr>
              </thead>
              <tbody>
                {activityLog.map((log) => {
                  const { time, date } = convertToReadableFormat(log.timestamp);
                  return (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.parent_id}</td>
                      <td>{log.child_id}</td>
                      <td>{log.status}</td>
                      <td>{`${date}, ${time}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer className=" flex justify-center gap-5">
        <Button
          className=" border-2 border-gray-200 p-2 hover:bg-gray-100 cursor-pointer rounded-lg mb-2"
          variant="primary"
          onClick={() => {
            updateStatus("checked_in");
            updateActivity("checked_in", id, parentId);
          }}
        >
          Check In
        </Button>
        <Button
          className=" border-2  border-gray-200 p-2 hover:bg-gray-100 cursor-pointer rounded-lg mb-2"
          variant="secondary"
          onClick={() => {
            updateStatus("checked_out");
            updateActivity("checked_out", id, parentId);
          }}
        >
          Check Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChildDetailsModal;
