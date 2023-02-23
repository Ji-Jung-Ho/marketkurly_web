import React from 'react';
import ConfirmModalComponent from './member_signup/ConfirmModalComponent'
import SignUpComponent from './member_signup/SignUpComponent'

export default function MemberSignUpComponent () {

  // isConfirmModal, msg 상태관리 함수
  const [state, setState] = React.useState({
    isConfirmModal: false,
    msg: '',
    isTimer: false
  });

  // isConfirmModal, msg 상태변경 함수
  const isConfirmModalFn=(txt)=>{
    setState({
      ...state,
      isConfirmModal: true,
      msg: txt,
    })
  }

  //  confirmmodal 닫기 버튼 클릭 이벤트
  const isConfirmModalCloseFn=()=>{

    let isTimer = false;

    if (state.msg.indexOf('인증번호') >= 0) {
      isTimer = true;   // 타이머 작동
    }
    else {
      isTimer = false;  // 타이머 정지
    }

    setState({
      ...state,
      isConfirmModal: false,
      msg: '',
      isTimer: isTimer
    })
  }

  return (
    <> {/* // 빈태그 : div태그를 사용하면 중간에 태그요소가 삽입되어 스타일이나 경로에 영향을 끼칠수있으므로, 가상태그요소인 빈태그를 사용하여 방지한다. */}
      <SignUpComponent isConfirmModalFn={isConfirmModalFn} isTimer={state.isTimer}/>
      {state.isConfirmModal && <ConfirmModalComponent msg={state.msg} isConfirmModalCloseFn={isConfirmModalCloseFn}/>}
    </>
  );
};