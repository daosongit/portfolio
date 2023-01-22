import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import errorImg from '../../assets/error.gif';
import { MdArrowBackIosNew as IcoArrowLeft } from 'react-icons/md';
import cl from './Error.module.scss';

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  return (
    <div className={cl.error}>
      <button className={cl.btnBack} onClick={() => navigate(-1)}>
        <IcoArrowLeft />
        <label>Go Back</label>
      </button>
      <div className={cl.content}>
        <h1>Opps... {error.statusText}:</h1>
        <h2>{error.error.message}</h2>
        <div className={cl.imgWrapper}>
          <img src={errorImg} alt="error gif" />
        </div>
      </div>
    </div>
  );
}
