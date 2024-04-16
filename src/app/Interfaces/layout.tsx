import React from "react";

interface LayoutInterfacesProps {
  children: React.ReactNode;
}

const LayoutInterfaces: React.FC<LayoutInterfacesProps> = ({ children }) => {
  return (
    <main className="p-0 w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex items-center justify-center h-20 border-b-0 border-customGray border-solid bg-black">
        <h1 className="text-white text-center text-xl">
          NASA Astronomic Images Interface
        </h1>
      </div>
      <div className="text-white  bg-black">{children}</div>
    </main>
  );
};

export default LayoutInterfaces;
