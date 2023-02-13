import React from 'react';
import ConfirmModalComponent from './member_signup/ConfirmModalComponent'
import SignUpComponent from './member_signup/SignUpComponent'

export default function MemberSignUpComponent () {
  return (
    <div>
      <ConfirmModalComponent/>
      <SignUpComponent/>
    </div>
  );
};