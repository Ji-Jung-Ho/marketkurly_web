import React from 'react';
import HeaderComponent from './HeaderComponent';
import IntroMainComponent from './IntroMainComponent';
import FooterComponent from './FooterComponent';
import GoTopComponent from './GoTopComponent';
import QuickMenuComponent from './QuickMenuComponent';
import ModalComponent from './ModalComponent';
import SubMain1Component from './SubMain1Component';
import SubMain2Component from './SubMain2Component';
import SubMain3Component from './SubMain3Component';
import SubMain4Component from './SubMain4Component';

export default function WrapComponent(props) {

  const [isTopModal, setIsTopModal]   = React.useState(true);         // 탑모달
  const [isMainModal, setIsMainModal] = React.useState(true);         // 메인모달
  const [isIntroMain, setIsIntroMain] = React.useState(true);         // 인트로메인
  const [isSubMain1, setIsSubMain1]   = React.useState(false);        // 서브메인1
  const [isSubMain2, setIsSubMain2]   = React.useState(false);        // 서브메인2
  const [isSubMain3, setIsSubMain3]   = React.useState(false);        // 서브메인3
  const [isSubMain4, setIsSubMain4]   = React.useState(false);        // 서브메인4
  const [isMemberSignUp, setIsMemberSignUp] = React.useState(false);  // 회원가입

  const introMainFn=()=>{
    setIsIntroMain(true);
    setIsSubMain1(false);
    setIsSubMain2(false);
    setIsSubMain3(false);
    setIsSubMain4(false);
  }

  return (
    <div id='wrap'>
      {
        isTopModal && <ModalComponent $path={props.$path}/>
      }
      {
        <HeaderComponent $path={props.$path} $sub_path={props.$sub_path} introMainFn={introMainFn}/>
      }

      {   // 인트로 메인
        isIntroMain && <IntroMainComponent $path={props.$path}/>
      }

      {   // 서브메인1
        isSubMain1 && <SubMain1Component/>
      }

      {   // 서브메인2
        isSubMain2 && <SubMain2Component/>
      }

      {   // 서브메인3
        isSubMain3 && <SubMain3Component/>
      }

      {   // 서브메인4
        isSubMain4 && <SubMain4Component/>
      }

      {
        <FooterComponent $path={props.$path}/>
      }

      {
        <QuickMenuComponent $path={props.$path}/>
      }

      {
        <GoTopComponent $path={props.$path}/>
      }
    </div>
  );
};
WrapComponent.defaultProps = {
  $path: './',
  $sub_path:'../../../'
}