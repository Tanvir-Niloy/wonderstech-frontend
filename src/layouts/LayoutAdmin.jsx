import React, { useState } from "react";
import HeaderNav from "../components/admin/HeaderNav";
import Sidebar from "../components/admin/Sidebar";

const LayoutAdmin = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <>
      <HeaderNav onSidebarHandler={handleSidebar} />
      <main className="admin__layout-main">
        {sidebar && <Sidebar sidebar={sidebar} onCloseSidebar={closeSidebar} />}
        <div>{children}</div>
      </main>
    </>
  );
};

export default LayoutAdmin;
