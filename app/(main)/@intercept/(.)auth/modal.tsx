"use client";

import Register from "./form-register";
import Login from "./form-login";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ModalAuth = () => {
  const [state, setState] = useState(false);
  const redirect = useSearchParams().get("redirect") ?? "";
  return (
    <>
      {redirect && (
        <div className="overlay">
          {!state ? (
            <Register setState={setState} />
          ) : (
            <Login setState={setState} />
          )}
        </div>
      )}
    </>
  );
};

export default ModalAuth;
