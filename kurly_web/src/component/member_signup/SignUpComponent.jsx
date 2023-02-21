import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function SignUpComponent ({회원, isConfirmModalFn}) {

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
        let is아이디 = false;        // 임시변수

        아이디 = value.replace(regExp1,'');

        if( regExp2.test(아이디)=== false || regExp3.test(아이디) === false || regExp4.test(아이디) === true ){
            is아이디 = true;
        }
        else { 
            is아이디 = false;
        }

        setState({
            ...state,
            아이디: 아이디,
            is아이디: is아이디
        })
    }
    
    // 2. 아이디 중복확인 버튼 클릭 이벤트
    const onClickidOkBtn=(e)=>{
        e.preventDefault();

        const regExp2 = /.{6,16}/g;
        const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regExp4 = /\s/g;
        const thisVal = state.아이디;

        if( regExp2.test( thisVal ) === false || regExp3.test(thisVal) === false || regExp4.test(thisVal) === true ){
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
                }
                else {
                    isConfirmModalFn('사용 가능한 아이디 입니다.');
                }
                
            })
            .catch((err)=>{
                console.log('AXIOS 실패' + err);
            });
        }
    }

    React.useEffect(()=>{

    });


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
                                        <p className={`error-message${state.is아이디 ? ' on' : ''}`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
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
                                        <input type="password" name='input_pw1' id='inputPw1' placeholder='비밀번호를 입력해주세요'/>
                                        <p className='error-message'></p>
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
                                        <input type="password" name='input_pw2' id='inputPw2' placeholder='비밀번호를 한번더 입력해주세요'/>
                                        <p className='error-message'></p>
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
                                        <input type="text" maxLength='20' name='input_name' id='inputName' placeholder='이름을 입력해주세요'/>
                                        <p className='error-message'></p>
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
                                        <input type="text" name='input_email' id='inputEmail' placeholder='예: marketkurly@kurly.com'/>
                                        <button type="button" className='email-ok-btn'>중복확인</button>
                                        <p className='error-message'></p>
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
                                        <input type="text" maxLength='11' name='input_hp' id='inputHp' placeholder='숫자만 입력해주세요'/>
                                        <button disabled type="button" className='hp-num-btn'>인증번호 받기</button>
                                        <button type="button" className='hp-num2-btn'>다른번호 인증</button>
                                        <p className='error-message hp-error-message'></p>
                                    </div>
                                </div>
                            </li>                        
                            <li className='hp-ok-box'>
                                <div className="left">
                                    <div className="left-wrap">
                                       
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" maxLength='6' name='input_hp_ok' id='inputHpOk' placeholder=''/>
                                        <span className='time-count'></span>
                                        <button type="button" className='hp-num-ok-btn'>인증번호 확인</button>
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
                                        <input type="text" className='addr-hide' name='input_addr1' id='inputAddr1' placeholder='카카오 주소 검색 API'/>
                                        <button type="button" className='addr-hide addr-re-btn'><img src="./img/ico_search.svg" alt=""/>재검색</button>
                                        <button type="button" className='addr-api-btn'><img src="./img/ico_search.svg" alt=""/>주소검색</button>                                        
                                    </div>                                    
                                </div>
                            </li>                        
                            <li className='addr-hide'>
                                <div className="left">
                                    <div className="left-wrap">
                                        
                                    </div>                                
                                </div>
                                <div className="right">
                                    <div className="right-wrap">
                                        <input type="text" name='input_addr2' id='inputAddr2' placeholder='나머지 주소를 입력해주세요'/>                                        
                                    </div>
                                </div>
                            </li>                        
                            <li className='addr-hide'>
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
        아이디 :                PropTypes.string.isRequired,
        is아이디 :              PropTypes.bool.isRequired,
        아이디중복확인 :        PropTypes.bool.isRequired,
        비밀번호 :              PropTypes.string.isRequired,
        비밀번호확인 :          PropTypes.string.isRequired,
        이름 :                  PropTypes.string.isRequired,
        이메일 :                PropTypes.string.isRequired,
        이메일중복확인 :        PropTypes.bool.isRequired,
        휴대폰 :                PropTypes.number.isRequired,
        휴대폰인증확인 :        PropTypes.bool.isRequired,
        주소1 :                 PropTypes.string.isRequired,
        주소2 :                 PropTypes.string.isRequired,
        성별 :                  PropTypes.string,
        생년 :                  PropTypes.number,
        생월 :                  PropTypes.number,
        생일 :                  PropTypes.number,
        추가입력사항 :          PropTypes.string,
        추가입력사항입력상자 :  PropTypes.string,
        이용약관동의 :          PropTypes.array
    })
}


// 회원가입의 모든 변수관리
SignUpComponent.defaultProps = {
    회원 : {
        아이디:"",
        is아이디: false,
        아이디중복확인 : false,
        비밀번호:"",
        비밀번호확인:"",
        이름:"",
        이메일:"",
        이메일중복확인 : false,
        휴대폰:"",
        휴대폰인증확인 : false,
        주소1:"",
        주소2:"",
        성별:"",
        생년:"",
        생월:"",
        생일:"",
        추가입력사항:"",
        추가입력사항입력상자:"",
        이용약관동의:[]
    }
}