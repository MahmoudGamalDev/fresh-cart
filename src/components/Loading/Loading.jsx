import React from "react";
import { MutatingDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loading position-fixed  top-50 start-50 translate-middle d-flex justify-content-center align-items-center">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
