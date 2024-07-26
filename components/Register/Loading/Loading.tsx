import React, { useState, CSSProperties } from "react";
import GridLoader from "react-spinners/GridLoader";

interface LoadingProps{
    loading: boolean;
    }

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "0 auto",
  borderColor: "#339F5E;",
};

const Loading: React.FC<LoadingProps> = ({ loading }) => {

  return (
      <GridLoader
        color="#339F5E"
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
};

export default Loading;
