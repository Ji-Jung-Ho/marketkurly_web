import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function SignUpComponent ({회원, isConfirmModalFn, isTimer}) {

    // 회원가입 상태관리 변수

    const [state, setState] = React.useState(회원);

    // 1. 아이디 입력상자 온체인지 이벤트 구현
    const onChangeId=(e)=>{

        const regExp1 = /[`~!@#$^&*()\-_=+\\|\[\]{};:'",<.>/?]/g;
        const regExp2 = /.{6,16}/g;
        const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regExp4 = /\s/g;

        let {value} = e.target;     // 비구조화
        let 아이디 = '';            // 임시변수
        let isId = false;        // 임시변수

        아이디 = value.replace(regExp1,'');

        if( regExp2.test(아이디)=== false || regExp3.test(아이디) === false || regExp4.test(아이디) === true ){
            isId = true;
        }
        else { // 정상
            isId = false;
        }

        setState({
            ...state,
            아이디: 아이디,
            isId: isId
        })
    }
    
    // 2. 아이디 중복확인 버튼 클릭 이벤트 구현
    const onClickidOkBtn=(e)=>{
        e.preventDefault();

        const regExp2 = /.{6,16}/g;
        const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regExp4 = /\s/g;
        const {아이디} = state;
        let 아이디중복확인 = false;

        if( regExp2.test( 아이디 ) === false || regExp3.test(아이디) === false || regExp4.test(아이디) === true ){
            isConfirmModalFn('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
        }
        else {
            axios({
                url: 'http://kiik52.dothome.co.kr/kurly_study/member_select.php',
                method: 'GET'
            })
            .then((res)=>{
                let result = res.data.map((item)=>item.아이디 === state.아이디);
    
                if (result.includes(true)) {
                    isConfirmModalFn('사용 불가능한 아이디 입니다.');
                    아이디중복확인 = false;
                }
                else {
                    isConfirmModalFn('사용 가능한 아이디 입니다.');
                    아이디중복확인 = true;
                }
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패' + err);
            });
        }

        setState({
            ...state,
            아이디중복확인 : 아이디중복확인
        })
    }

    // 3. 비밀번호 입력상자 온체인지 이벤트 구현
    const onChangePw=(e)=>{

        const regExp1 = /.{10,}/g;
        const regExp2 = /((?=.*[A-Za-z]+)(?=.*[0-9]+))|((?=.*[A-Za-z]+)(?=.*[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]+))|((?=.*[0-9]+)(?=.*[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]+))/g;
        const regExp3 = /\s/g;                    
        const regExp4 = /(\d)\1\1/g;
        const {value} = e.target;

        let pwErrMsg = '';
        let isPw = false;

        if( regExp1.test(value)===false ){
            pwErrMsg = '최소 10자 이상 입력';
            isPw = true;
        }
        else if( regExp2.test(value)===false || regExp3.test(value)===true  ){
            pwErrMsg = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            isPw = true;
        }
        else if(regExp4.test(value)===true){
            pwErrMsg = '동일한 글자 3개 이상 연속 사용 불가';
            isPw = true;
        }
        else { // 정상
            pwErrMsg = '';
            isPw = false;
        }

        setState({
            ...state,
            비밀번호 : value,
            pwErrMsg : pwErrMsg,
            isPw : isPw
        })
    }

    // 비밀번호확인 입력상자 온체인지 이벤트 구현
    const onChangePwOk=(e)=>{

        const {value} = e.target;
        let pwOkErrMsg = '';
        let isPwOk = false;

        if( state.비밀번호 !== value ){
            pwOkErrMsg = '동일한 비밀번호를 입력';
            isPwOk = true;
        }
        else{
            pwOkErrMsg = '';
            isPwOk = false;
        }

        setState({
            ...state,
            pwOkErrMsg: pwOkErrMsg,
            isPwOk: isPwOk
        })
    }

    // 이름 입력상자 온체인지 이벤트 구현
    const onChangeName=(e)=>{
        const regExp1 = /[`~!@#$%^&*()\-_=+\\|\[\]{};:'",<.>/?]/g;
        const regExp2 = /[^0-9]/g;
        const regExp3 = /[^a-z|A-Z]/g;
        let {value} = e.target;
        let 이름 = '';
        let nameErrMsg = '';
        let isName = false;

        이름 = value.replace(regExp1, '');

        if(value === ''){
            nameErrMsg = '이름을 입력해 주세요.'
            isName = true;
        }
        else if (regExp2.test(이름) === false || regExp3.test(이름) === false) {
            nameErrMsg = '이름을 한글로 작성해 주세요.'
            isName = true;
        }
        else{
            nameErrMsg = ''
            isName = false;
        }

        setState({
            ...state,
            이름: 이름,
            nameErrMsg: nameErrMsg,
            isName: isName
        })
    }

    // 이메일 입력상자 온체인지 이벤트 구현
    const onChangeEmail=(e)=>{
        const regExp1 = /\s/g;
        const regExp2 = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+\.[A-Za-z]{2,3}$/g;
        const regExp3 = /[@\(\)\\\[\]":;,<>]/g;
        let {value} = e.target;
        let emailErrMsg = '';
        let isEmail = false;

        if ( regExp1.test(value)===true || regExp2.test(value)===false || regExp3.test(value) === false ){
            emailErrMsg = '이메일 형식으로 입력해 주세요.'
            isEmail = true;
            if (value === '') {
                emailErrMsg = '이메일을 입력해 주세요.';
                isEmail = true;
            }
        }
        else {
            emailErrMsg = ''
            isEmail = false;
        }

        setState({
            ...state,
            이메일: value,
            emailErrMsg: emailErrMsg,
            isEmail: isEmail
        })
    }

    // 이메일 중복확인 버튼 클릭 이벤트 구현
    const onClickEmailOk=(e)=>{
        e.preventDefault();
        const regExp1 = /\s/g;
        const regExp2 = /^[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+@[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+(\.)*[A-Za-z0-9`~!#$%^&*\-_=+|{}'/?]+\.[A-Za-z]{2,3}$/g;
        const regExp3 = /[@\(\)\\\[\]":;,<>]/g;
        const {이메일} = state;
        let 이메일중복확인 = false;

        if(이메일 === ''){
            isConfirmModalFn('이메일을 입력해 주세요.');
        }
        else if( regExp1.test(이메일) === true || regExp2.test(이메일) === false || regExp3.test(이메일) === false){
            isConfirmModalFn('이메일 형식으로 입력해 주세요.');                
        }
        else{        
            axios({
                url: 'http://kiik52.dothome.co.kr/kurly_study/member_select.php',
                method: 'GET'
            })
            .then((res)=>{
                let result = res.data.map((item)=>item.이메일 === state.이메일);
    
                if (result.includes(true)) {
                    isConfirmModalFn('사용 불가능한 아이디 입니다.');
                    이메일중복확인 = false;
                }
                else {
                    isConfirmModalFn('사용 가능한 아이디 입니다.');
                    이메일중복확인 = true;
                }
            })
            .catch((err)=>{
                console.log('AXIOS 실패' + err);
            });
        }

        setState({
            ...state,
            이메일중복확인: 이메일중복확인
        })
    }

    // 휴대폰 입력상자 온체인지 이벤트 구현
    const onChangeHp=(e)=>{

        const regExp1 = /[^\d]/g;
        const {value} = e.target;
        let 휴대폰 = '';
        let isHp = false;

        휴대폰 = value.replace(regExp1,'');
        
        if( value.length > 1 ){
            isHp = true;
        }
        else {
            isHp = false;
        }
        setState({
            ...state,
            휴대폰: 휴대폰,
            isHp: isHp
        })

    }

    // 휴대폰 인증번호 받기 버튼 클릭 이벤트 구현
    const onClickHpNum=(e)=>{
        e.preventDefault();

        const regExp2 = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
        let num = 0;
        let isHpOkBox = false;
        let isHp = true;
        let isInputHp = false;
        let 인증번호입력상자 = '';

        num = Math.floor(Math.random()*900000+100000);

        if( regExp2.test( state.휴대폰 )===false ){
            isConfirmModalFn('잘못된 휴대폰 번호 입니다. \n 확인 후 다시 시도해 주세요.');
            isHpOkBox = false;
            isInputHp = false;
            isHp = true;
        }
        else {
            isConfirmModalFn(`인증번호가 발송되었습니다. \n ${num}`);
            isHpOkBox = true;
            isInputHp = true;
            isHp = false;
            인증번호입력상자 = '';
        }

        setState({
            ...state,
            인증번호: num,
            isHpOkBox: isHpOkBox,
            isInputHp: isInputHp,
            isHp: isHp,
            인증번호입력상자: 인증번호입력상자
        })

    }

    // 휴대폰 인증번호 입력상자 온체인지 이벤트 구현
    const onChangeInputHpOk=(e)=>{
        const regExp1 = /[^\d]/g;
        const {value} = e.target;
        let 인증번호입력상자 = '';
        
        if(value.length >= 1){
            clearInterval(state.setId);
        }

        인증번호입력상자 = value.replace(regExp1, '');

        setState({
            ...state,
            인증번호입력상자: 인증번호입력상자
        })
    }

    // 휴대폰 인증번호 확인 버튼 클릭 이벤트 구현
    const onClickHpOk=(e)=>{
        e.preventDefault();

        let 휴대폰인증확인 = false;
        let isHp = true;
        let isHpOkBox = true;
        let isHpNum2Btn = false;

        if(Number(state.인증번호입력상자) === state.인증번호){
            isConfirmModalFn('인증에 성공 하였습니다.');
            isHp = false;
            isHpOkBox = false;
            isHpNum2Btn = true;
            휴대폰인증확인 = true;
        }
        else {
            isConfirmModalFn('잘못된 인증 코드 입니다.');
            isHp = true;
            isHpOkBox = true;
            isHpNum2Btn = false;
            휴대폰인증확인 = false;
        }
        
        setState({
            ...state,
            isHp: isHp,
            isHpOkBox: isHpOkBox,
            isHpNum2Btn: isHpNum2Btn,
            휴대폰인증확인: 휴대폰인증확인
        })
    }

    // 다른번호 인증 버튼 클릭 이벤트 구현
    const onClickHpNumBtn=(e)=>{
        e.preventDefault();

        let isHp = false;

        setState({
            ...state,
            isHpNum2Btn: false,
            isInputHp: false,
            isHp: isHp,
            휴대폰: '',
            hpErrMsg: '휴대폰 번호를 입력해 주세요.'
        })
    } 

    // 휴대폰 타이머 카운트 함수
    function hpTimerCount(){
        let setId = 0;
        let minute = 2;
        let second = 59;
        setId = setInterval(function(){
            second--;
            if(second < 0){
                second = 59;
                minute--;
                if(minute < 0){
                    clearInterval(setId);
                    minute = 0;
                    second = 0;
                    isConfirmModalFn('유효 시간이 만료되었습니다. \n 다시 시도해 주세요.');
                }
            }
            // $('.time-count').html( `${minute<10? `0${minute}`:minute}:${second<10? `0${second}`:second}` );

            setState({
                ...state,
                setId: setId,
                minute: minute,
                second: second,
            })

        },1000);
    }

    React.useEffect(()=>{
        isTimer && hpTimerCount();    // istimer 변수가 true 이면 타이머 실행, 아니면 정지
    },[isTimer]);

    // 주소검색 버튼 클릭 이벤트 구현
    const onClickAddressSearchBtn=(e)=>{
        // 팝업창 띄우기
        const _fileName = "./popup.html";
        const _winName = "_address_api";
        const _width = 530;
        const _height = 569;
        const _top = (window.innerHeight - _height) / 2; // 769-569=200/2=100
        const _left = (window.innerWidth - _width) / 2; // 1903-530=1373/2=686.5
        const childWin = window.open(_fileName,_winName,`width=${_width},height=${_height},top=${_top},left=${_left}`);
    }

    // 주소1 입력상자 온체인지 이벤트 구현
    const onChangeInputAddr1=(e)=>{
        const {value} = e.target;

        setState({
            ...state,
            주소1: value
        })
    }

    // 주소2 입력상자 온체인지 이벤트 구현
    const onChangeInputAddr2=(e)=>{
        const {value} = e.target;

        setState({
            ...state,
            주소2: value
        })
    }

    // 로딩시 세션스토리지에 저장된 값(kurly_search_address) 불러오고 유지하기
    const getSessionAddress=()=>{
        function getPromise(){
            return new Promise((success, error)=>{

                let 주소1 = '';
                let 주소2 = '';
                let isAddrHide = false;
                let isAddrApiBtn = false;
                
                if ( sessionStorage.getItem('kurly_search_address') !== null ) {
                    주소1 = JSON.parse(sessionStorage.getItem('kurly_search_address')).주소1
                    주소2 = JSON.parse(sessionStorage.getItem('kurly_search_address')).주소2
                    isAddrHide = true;
                    isAddrApiBtn = true;

                    // 주소가져오기 성공 했을 때 => 프로토타입 객체 생성
                    const Obj = {
                        주소1: 주소1,
                        주소2: 주소2,
                        isAddrHide: true,
                        isAddrApiBtn: true
                    }
                    success(Obj);
                }
                else {
                    주소1 = '';
                    주소2 = '';
                    isAddrHide = false;
                    isAddrApiBtn = false;

                    error('주소가져오기 실패');
                }
            });
        }

        // 세션에서 주소를 가져오고 성공하면 성공 객체 데이터를 가져와서 state에 저장
        getPromise()
        .then((res)=>{      // 성공 결과
            setState({
                ...state,
                주소1: res.주소1,
                주소2: res.주소2,
                isAddrHide: res.isAddrHide,
                isAddrApiBtn: res.isAddrApiBtn
            });
        })
        .catch((err)=>{     // 실패 결과
            console.log(err);
        });
    }

    React.useEffect(()=>{
        getSessionAddress();
    },[state.주소1, state.주소2]);
    
    // 주소 재검색 버튼 클릭 이벤트 구현
    const onClickAddrReBtn=(e)=>{
        e.preventDefault();
        onClickAddressSearchBtn();
    }

  return (
    <main id='main'>
        <section id="signUp">
            <div className="container">
                <div className="title">
                    <div className="main-title">
                        <h2>회원가입</h2>
                    </div>                    
                    <div className="sub-title">
                        <span><i>*</i>필수입력사항</span>
                    </div>
                </div>
                <div className="content">
                    <form name='form_sign_up' autocomplement='off' id='formSignUp' method='post' action="./member_sign_up.php">
                        <ul>
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>아이디</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" maxLength='16' name='input_id' id='inputId' placeholder='아이디를 입력해주세요'
                                         onChange={onChangeId} 
                                         value={state.아이디}
                                         />
                                        <button type="button" className='id-ok-btn' onClick={onClickidOkBtn}>중복확인</button>
                                        <p className={`error-message${state.isId ? ' on' : ''}`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                                    </div>
                                </div>
                            </li>                        
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>비밀번호</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="password" name='input_pw1' id='inputPw1' placeholder='비밀번호를 입력해주세요'
                                        onChange={onChangePw}
                                        />
                                        <p className={`error-message${state.isPw ? ' on' : ''}`}>{state.pwErrMsg}</p>
                                    </div>
                                </div>
                            </li>                        
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>비밀번호확인</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="password" name='input_pw2' id='inputPw2' placeholder='비밀번호를 한번더 입력해주세요'
                                        onChange={onChangePwOk}/>
                                        <p className={`error-message${state.isPwOk ? ' on' : ''}`}>{state.pwOkErrMsg}</p>
                                    </div>
                                </div>
                            </li>                        
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>이름</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" maxLength='20' name='input_name' id='inputName' placeholder='이름을 입력해주세요'
                                        onChange={onChangeName}
                                        value={state.이름}/>
                                        <p className={`error-message${state.isName ? ' on' : ''}`}>{state.nameErrMsg}</p>
                                    </div>
                                </div>
                            </li>                        
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>이메일</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" name='input_email' id='inputEmail' placeholder='예: marketkurly@kurly.com'
                                        onChange={onChangeEmail}/>
                                        <button type="button" className='email-ok-btn' onClick={onClickEmailOk}>중복확인</button>
                                        <p className={`error-message${state.isEmail ? ' on' : ''}`}>{state.emailErrMsg}</p>
                                    </div>
                                </div>
                            </li>                        
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>휴대폰</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" maxLength='11' name='input_hp' id='inputHp' placeholder='숫자만 입력해주세요'
                                        disabled={state.isInputHp}
                                        onChange={onChangeHp}
                                        value={state.휴대폰}
                                        />
                                        <button disabled={!state.isHp} type="button" 
                                        className={`hp-num-btn${state.isHp ? ' on' : ''}`}
                                        onClick={onClickHpNum}
                                        >
                                        인증번호 받기</button>
                                        <button type="button"
                                        className={`hp-num2-btn${state.isHpNum2Btn ? ' on' : ''}`}
                                        onClick={onClickHpNumBtn}
                                        >
                                        다른번호 인증</button>
                                        <p className={`error-message hp-error-message${state.isHpNum2Btn ? '' : ' on'}`}>{state.hpErrMsg}</p>
                                    </div>
                                </div>
                            </li>                        
                            <li className={`hp-ok-box${state.isHpOkBox ? ' on' : ''}`}>
                            {/* <li className={'hp-ok-box on'}>  타이머 확인용*/}
                                <div className="left">
                                    <div className="left-wrap">
                                       
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" maxLength='6' name='input_hp_ok' id='inputHpOk' placeholder=''
                                        onChange={onChangeInputHpOk}
                                        value={state.인증번호입력상자}
                                        />
                                        <span className='signup-time-count'>
                                            {
                                                `${state.minute < 10 ? `0${state.minute}` : state.minute}:${state.second < 10 ? `0${state.second}` : state.second}`
                                            }
                                        </span>
                                        
                                        <button type="button" className='hp-num-ok-btn' onClick={onClickHpOk}>인증번호 확인</button>
                                        <p className='info-message hp-info-message'>
                                            인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (마켓컬리 1644-1107)
                                        </p>
                                    </div>
                                </div>
                            </li>                        
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>주소</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" 
                                        className={`addr-hide${state.isAddrHide ? ' on' : ''}`} 
                                        name='input_addr1' id='inputAddr1' placeholder='카카오 주소 검색 API'
                                        onChange={onChangeInputAddr1}
                                        value={state.주소1}
                                        />
                                        <button type="button" className={`addr-hide addr-re-btn${state.isAddrHide ? ' on' : ''}`} 
                                        onClick={onClickAddrReBtn}
                                        >
                                        <img src="./img/ico_search.svg" alt=""/>재검색</button>
                                        <button type="button" className={`addr-api-btn${state.isAddrApiBtn ? ' on' : ''}`}
                                        onClick={onClickAddressSearchBtn}
                                        >
                                        <img src="./img/ico_search.svg" alt=""/>주소검색</button>                                        
                                    </div>                                    
                                </div>
                            </li>                        
                            <li className={`addr-hide${state.isAddrHide ? ' on' : ''}`}>
                                <div className="left">
                                    <div className="left-wrap">
                                        
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" name='input_addr2' id='inputAddr2' placeholder='나머지 주소를 입력해주세요'
                                        onChange={onChangeInputAddr2}
                                        value={state.주소2}
                                        />                                        
                                    </div>
                                </div>
                            </li>                        
                            <li className={`addr-hide${state.isAddrHide ? ' on' : ''}`}>
                                <div className="left">
                                    <div className="left-wrap">
                                        
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <em className='addr-map-area'>샛별배송</em>
                                        <p className='addr-info addr-info2'>배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                    </div>
                                </div>
                            </li>  
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>성별</strong></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap gender">
                                        <label htmlFor="male"><input type="radio" name='gender' id='male' className='gender-btn' value='남자'/>남자</label>                                        
                                        <label htmlFor="female"><input type="radio" name='gender' id='female' className='gender-btn' value='여자'/>여자</label>                                        
                                        <label htmlFor="unselect"><input type="radio" name='gender' id='unselect' className='gender-btn' value='선택안함'/>선택안함</label>                                        
                                    </div>
                                </div>
                            </li>     
                            
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>생년월일</strong></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap birth">
                                        <div className="birth-box">
                                            <ul>
                                                <li><input type="text" maxLength='4' name='year' id='year' placeholder='YYYY'/></li>
                                                <li><i>/</i></li>
                                                <li><input type="text" maxLength='2' name='month' id='month' placeholder='MM'/></li>
                                                <li><i>/</i></li>
                                                <li><input type="text" maxLength='2' name='date' id='date'  placeholder='DD'/></li>
                                            </ul>
                                        </div>
                                        <p className='error-message birth-error-message'></p>
                                    </div>
                                </div>
                            </li>     
                            
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>추가입력 사항  </strong></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap add-input-box1">
                                        <label htmlFor="addInput1"><input type="radio" name='addInput' id='addInput1' className='add-input-btn' value='추천인 아이디를 입력해 주세요.'/>친구초대 추천인 아이디</label>
                                        <label htmlFor="addInput2"><input type="radio" name='addInput' id='addInput2' className='add-input-btn' value='참여 이벤트명'/>참여 이벤트명</label>
                                    </div>
                                </div>
                            </li>     
                            <li className='add-input-box-list'>
                                <div className="left">
                                    <div className="left-wrap">
                                       
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap add-input-box2">
                                       <input type="text" name='add-input-text' id='addInputText' placeholder='추천인 아이디를 입력해 주세요.'/>
                                       <button type="button" className='id-chk-btn'>아이디 확인</button>                                           
                                       <p className='add-input-guid-text'>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</p>
                                    </div>
                                </div>
                            </li>     

                            <li className='hor-line'>
                                <hr/>
                            </li>

                            {/* 이용약관동의 */}
                            <li>
                                <div className="left">
                                    <div className="left-wrap">
                                        <label htmlFor="inputId"><strong>이용약관동의</strong><i>*</i></label>
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap service">
                                        <ul>
                                            <li>
                                                <label htmlFor="allChk"><input type="checkbox" name='all_chk' id='allChk' value=''/>전체 동의합니다.</label>
                                                <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                            </li>
                                            <li>
                                                <label htmlFor="chk1"><input type="checkbox" name='chk1' id='chk1'  className='chk-btn'  value='이용약관 동의(필수)'/>이용약관 동의(필수)</label>
                                                <button><span>약관보기</span><img src="./img/arrow_right.svg" alt=""/></button>
                                            </li>
                                            <li>
                                                <label htmlFor="chk2"><input type="checkbox" name='chk2' id='chk2'  className='chk-btn'  value='개인정보 수집∙이용 동의(필수)'/>개인정보 수집∙이용 동의(필수)</label>
                                                <button><span>약관보기</span><img src="./img/arrow_right.svg" alt=""/></button>
                                            </li>
                                            <li>
                                                <label htmlFor="chk3"><input type="checkbox" name='chk3' id='chk3'  className='chk-btn'  value='개인정보 수집∙이용 동의(선택)'/>개인정보 수집∙이용 동의(선택)</label>
                                                <button><span>약관보기</span><img src="./img/arrow_right.svg" alt=""/></button>
                                            </li>
                                            <li>
                                                <label htmlFor="chk4"><input type="checkbox" name='chk4' id='chk4'  className='chk-btn'  value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'/>무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)</label>
                                                
                                            </li>
                                            <li>
                                                <label htmlFor="chk5"><input type="checkbox" name='chk5' id='chk5'  className='chk-btn chk4-btn'  value='SNS'/>SNS(선택)</label>
                                                <label htmlFor="chk6"><input type="checkbox" name='chk6' id='chk6'  className='chk-btn chk4-btn'  value='이메일'/>이메일(선택)</label>
                                                
                                            </li>
                                            <li>
                                                <p className="free-shipping-info">동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내 </p> 
                                            </li>
                                            <li>
                                                <label htmlFor="chk7"><input type="checkbox" name='chk7' id='chk7'  className='chk-btn'  value='본인은 만 14세 이상입니다.(필수)'/>본인은 만 14세 이상입니다.(필수)</label>
                                                
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>   
                        </ul>
                        <div className="button-box">
                            <button type='submit' className='submit-btn'>가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </main>
  );
};

// props의 자료형 선언 : prop-types (패키지 설치)
SignUpComponent.propTypes = {
    회원 : PropTypes.shape ({
        아이디:                 PropTypes.string,
        isId:                   PropTypes.bool,
        아이디중복확인:         PropTypes.bool,

        비밀번호:               PropTypes.string,
        pwErrMsg:               PropTypes.string,
        isPw:                   PropTypes.bool,
        비밀번호확인:           PropTypes.string,
        pwOkErrMsg:             PropTypes.string,
        isPwOk:                 PropTypes.bool,

        이름:                   PropTypes.string,
        nameErrMsg:             PropTypes.string,
        isName:                 PropTypes.bool,

        이메일:                 PropTypes.string,
        emailErrMsg:            PropTypes.string,
        isEmail:                PropTypes.bool,
        이메일중복확인:         PropTypes.bool,

        휴대폰:                 PropTypes.string,
        isHp:                   PropTypes.bool,
        휴대폰인증확인:         PropTypes.bool,
        인증번호:               PropTypes.number,
        인증번호입력상자:       PropTypes.string,
        isHpOkBox:              PropTypes.bool,
        isInputHp:              PropTypes.bool,
        isHpNum2Btn:            PropTypes.bool,
        setId:                  PropTypes.number,
        minute:                 PropTypes.number,
        second:                 PropTypes.number,

        주소1:                  PropTypes.string,
        주소2:                  PropTypes.string,
        isAddrHide:             PropTypes.bool,
        isAddrApiBtn:           PropTypes.bool,

        성별:                   PropTypes.string,

        생년:                   PropTypes.string,
        생월:                   PropTypes.string,
        생일:                   PropTypes.string,

        추가입력사항:           PropTypes.string,
        추가입력사항입력상자:   PropTypes.string,

        이용약관동의:           PropTypes.array
    })
}


// 회원가입의 모든 변수관리
SignUpComponent.defaultProps = {
    회원 : {
        아이디:'',
        isId: false,
        아이디중복확인 : false,

        비밀번호:'',
        pwErrMsg: '',
        isPw: false,
        비밀번호확인:'',
        pwOkErrMsg: '',
        isPwOk: false,

        이름:'',
        nameErrMsg: '',
        isName: false,

        이메일: '',
        emailErrMsg: '',
        isEmail: false,
        이메일중복확인: false,
        
        휴대폰:'',
        isHp: false,
        휴대폰인증확인 : false,
        인증번호: 0,
        인증번호입력상자: '',
        isHpOkBox: false,
        isInputHp: false,
        isHpNum2Btn: false,
        setId: 0,
        minute: 2,
        second: 59,

        주소1:'',
        주소2:'',
        isAddrHide: false,
        isAddrApiBtn: false,

        성별:'',

        생년:'',
        생월:'',
        생일:'',

        추가입력사항:'',
        추가입력사항입력상자:'',

        이용약관동의:[]
    }
}