import React from "react";

interface LayoutInterfacesProps {
  children: React.ReactNode;
}

const LayoutInterfaces: React.FC<LayoutInterfacesProps> = ({ children }) => {
  return (
    <main className="p-0 w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex flex-row items-center h-1/6 border-customGray border-solid bg-black">
        <h1 className="text-white text-center text-xl flex-grow">
          NASA Astronomic Images Interface
        </h1>
      </div>
      <div className="text-white bg-black">{children}</div>
    </main>
  );
};

export default LayoutInterfaces;
