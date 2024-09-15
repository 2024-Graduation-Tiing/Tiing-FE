'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup'
// import { SignUpValidationSchema } from '@/utils/SignUpValidationSchema'
import { api } from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//
//
//

type Inputs = {
  email: string;
  authNum: string;
  password: string;
  passwordCheck: string;
  gender: string;
  role: string;
};

//
//
//

const page = () => {
  const [authCode, setAuthCode] = useState('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });

  const email = watch('email');
  const authNum = watch('authNum');
  const password = watch('password');
  const gender = watch('gender');
  const role = watch('role');

  /**
   *
   */
  const handleRegister: SubmitHandler<Inputs> = (data: any) => {
    console.log(data);
    if (authCode === authNum) {
      api
        .post('/api/auth/signup', {
          id: data.email,
          password: data.password,
          gender: data.gender,
          role: data.role,
        })
        .then((res) => {
          console.log(res);
          router.push('/signup/success');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert('인증번호가 올바르지 않습니다.');
    }
  };

  /**
   *
   */
  const handleClickEmailAuth = () => {
    api
      .post('/api/auth/confirm', {
        email: email,
      })
      .then((res) => {
        alert('입력하신 이메일로 인증번호가 발송되었습니다.');
        console.log(res);
        setAuthCode(res.data.AuthenticationCode);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   *
   */
  const handleGenderClick = (value: string) => {
    setValue('gender', value, { shouldValidate: true });
  };

  /**
   *
   */
  const handleTypeClick = (value: string) => {
    setValue('role', value, { shouldValidate: true });
  };

  /**
   *
   */
  const renderSignUpForm = () => {
    return (
      <form className="flex flex-col" onSubmit={handleSubmit(handleRegister)}>
        <FieldDiv className="w-[400px]">
          <label>아이디</label>
          <div className="input-box flex w-full flex-row items-center pr-1.5">
            <input
              className="outline-none"
              type="text"
              placeholder="이메일 형식으로 입력해주세요."
              {...register('email', {
                required: true,
                pattern: {
                  value:
                    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            <button
              className="h-[1.8rem] w-20 rounded-8 bg-blue text-xs text-white"
              onClick={handleClickEmailAuth}
            >
              인증하기
            </button>
          </div>
          {errors.email?.type === 'required' && (
            <Error>필수 입력 항목입니다.</Error>
          )}
          {errors.email?.type === 'pattern' && (
            <Error>{errors.email.message}</Error>
          )}
        </FieldDiv>
        <FieldDiv>
          <label>인증번호</label>
          <input
            className="input-box"
            type="text"
            placeholder="이메일로 전송된 인증번호 8자리를 입력해주세요."
            {...register('authNum', {
              required: true,
              validate: (value) =>
                value === authNum || '인증번호가 일치하지 않습니다.',
            })}
          />
          {errors.authNum?.type === 'required' && (
            <Error>필수 입력 항목입니다.</Error>
          )}
          {errors.authNum?.type === 'pattern' && (
            <Error>{errors.authNum.message}</Error>
          )}
        </FieldDiv>
        <FieldDiv>
          <label>비밀번호</label>
          <input
            className="input-box"
            type="password"
            placeholder="영문, 숫자, 특수문자 포함 8~16자로 입력해주세요."
            {...register('password', {
              required: true,
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                message: '올바른 비밀번호 형식이 아닙니다.',
              },
            })}
          />
          {errors.password?.type === 'required' && (
            <Error>필수 입력 항목입니다.</Error>
          )}
          {errors.password?.type === 'pattern' && (
            <Error>{errors.password.message}</Error>
          )}
        </FieldDiv>
        <FieldDiv>
          <label>비밀번호 확인</label>
          <input
            className="input-box"
            type="password"
            id="paswordCheck"
            {...register('passwordCheck', {
              required: true,
              validate: (value: string) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.passwordCheck?.type === 'required' && (
            <Error>필수 입력 항목입니다.</Error>
          )}
          {errors.passwordCheck?.type === 'validate' && (
            <Error>{errors.passwordCheck.message}</Error>
          )}
        </FieldDiv>
        <FieldDiv>
          <label>성별</label>
          <input type="hidden" {...register('gender', { required: true })} />
          <div className="grid grid-cols-2 grid-rows-1 items-center gap-2">
            <span
              className={gender === 'male' ? 'input-box-clicked' : 'input-box'}
              onClick={() => handleGenderClick('male')}
            >
              남자
            </span>
            <span
              className={
                gender === 'female' ? 'input-box-clicked' : 'input-box'
              }
              onClick={() => handleGenderClick('female')}
            >
              여자
            </span>
          </div>
          {errors.gender?.type === 'required' && (
            <Error>필수 입력 항목입니다.</Error>
          )}
        </FieldDiv>
        <FieldDiv>
          <label>사용자 타입</label>
          <input type="hidden" {...register('role', { required: true })} />
          <div className="grid grid-cols-2 grid-rows-1 items-center gap-2">
            <TypeSelectDiv
              className={role === 'scouter' ? 'input-box-clicked' : 'input-box'}
              onClick={() => handleTypeClick('scouter')}
            >
              <Image
                src="/sign_up_scouter.svg"
                width={100}
                height={100}
                alt="scouter"
              />
              <span>Scouter</span>
            </TypeSelectDiv>
            <TypeSelectDiv
              className={
                role === 'entertainer' ? 'input-box-clicked' : 'input-box'
              }
              onClick={() => handleTypeClick('entertainer')}
            >
              <Image
                src="/sign_up_entertainer.svg"
                width={100}
                height={100}
                alt="entertainer"
              />
              <span>Entertainer</span>
            </TypeSelectDiv>
          </div>
          {errors.role?.type === 'required' && (
            <Error>필수 입력 항목입니다.</Error>
          )}
        </FieldDiv>
        <button
          className="mt-8 h-10 w-[400px] rounded-12 bg-blue font-medium text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    );
  };

  /**
   *
   */
  const renderLinkSection = () => {
    return (
      <div className="mt-8 flex flex-row items-center text-xs text-darkgray">
        <p>이미 계정이 있으신가요?</p>
        <Link href="/login" className="ml-2 cursor-pointer font-bold underline">
          Sign In
        </Link>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-[60px]">
      <h3 className="mb-[28px] text-2xl font-bold">회원가입</h3>
      {renderSignUpForm()}
      {renderLinkSection()}
    </div>
  );
};

//
//
//

const FieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  label {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    font-weight: 700;
    padding-bottom: 0.3rem;
  }
  input {
    width: 100%;
  }
`;
const Error = styled.p`
  color: #db1414;
  font-size: small;
  margin-left: 0.5rem;
`;

const TypeSelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 12rem;
  span {
    margin-top: 1rem;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export default page;
