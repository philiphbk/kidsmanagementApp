import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
  { name: "Home", icon: { faHome } },
  { name: "Profile", icon: { faUser } },
  //{ name: "Settings", icon: SettingsIcon },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center px-4 py-2 -mb-px font-medium text-xs sm:text-sm ${
              activeTab === tab.name
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            <FontAwesomeIcon
              icon={tab.icon as unknown as IconDefinition}
              className="w-5 h-5 mr-1"
            />
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "Home" && <div>Home Content</div>}
        {activeTab === "Profile" && <div>Profile Content</div>}
        {activeTab === "Settings" && <div>Settings Content</div>}
      </div>
    </div>
  );
};

export default Tabs;
