import React from "react";

const Maintenance = () => {
  return (
    <div className="flex flex-col text-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center mt-10">
        Welcome!
      </h1>
      <div className="text-lg">
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          This website is in maintance mode now.
        </p>
        <span className="text-sm text-stone-800">
          In case you wish to contact with me:{" "}
          <kbd className="p-2 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            <a className="text-sky-950" href="https://x.com/serhatsezer">
              @serhatsezer
            </a>
          </kbd>
        </span>
      </div>
    </div>
  );
};

export default Maintenance;
