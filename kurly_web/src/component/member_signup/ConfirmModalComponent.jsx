import React from 'react';

export default function ConfirmModalComponent ({msg, isConfirmModalCloseFn, isTimerFn}) {

    const onClickClose=(e)=>{
        e.preventDefault();
        console.log(msg)
        console.log(msg.indexOf('인증번호'))
        if (msg.indexOf('인증번호') !== -1) {
            isTimerFn();
        }
        isTimerFn();
        isConfirmModalCloseFn();
    }
  return (
    <div id="confirmModal">
        <div className="wrap">
            <div className="container">
                <div className="content">
                    <h2>{msg}</h2>
                </div>
                <div className="button-box">
                    <button className='modal-ok-btn' onClick={onClickClose}>확인</button>
                </div>
            </div>
        </div>
    </div>
  );
};