import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseLoading from '../common/useLoading'
import UseAlert from '../common/useAlert'
import AuthService from "../services/auth";
export default function Activate() {
  const params = useParams();
  const navigate = useNavigate( );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const verify_account = (e) => {
    e.preventDefault();
    setLoading(true)
    console.log({
      uid: params.uid,
      token: params.token,
    });
    AuthService.activation({
      uid: params.uid,
      token: params.token,
    })
      .then(() => {
        setLoading(false)
        navigate("/");
      })
      .catch((error) => {
        const {response} = error
        setMessage(response.data.detail)
        setLoading(false)
        console.log({ error });
      });
  };

  return (
    <div className="container">
      {loading ? (
        < UseLoading/>
      ) : (
        <>
        <UseAlert open={message} setOpen={setMessage} />
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: "200px" }}
        >
          <h1>Verify your Account:</h1>
          <button
            onClick={(e) => {
              verify_account(e);
            }}
            style={{ marginTop: "50px" }}
            type="button"
            className="btn btn-primary"
          >
            Verify
          </button>
        </div>
      </>
        )}
    </div>
  );
}
