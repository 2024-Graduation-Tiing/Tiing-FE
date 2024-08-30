'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignUpValidationSchema } from '@/utils/SignUpValidationSchema'
import scouter from '@/public/sign_up_scouter.svg'
import entertainer from '@/public/sign_up_entertainer.svg'

//
//
//

type Inputs = {
  email: string
  authNum: string
  password: string
  passwordCheck: string
  gender: string
  type: string
}

//
//
//

const page = () => {
  const [gender, setGender] = useState('')
  const [userType, setUserType] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Inputs>({ resolver: yupResolver(SignUpValidationSchema) })
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch('email'))

  return (
    <div className="flex flex-col items-center justify-center py-[60px]">
      <h3 className="mb-[28px] text-2xl font-bold">회원가입</h3>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <FieldDiv className="w-[400px]">
          <label>아이디</label>
          <div className="input-box flex w-full flex-row items-center pr-1.5">
            <input
              type="text"
              id="email"
              placeholder="이메일 형식으로 입력해주세요."
              {...register('email')}
              className="outline-none"
            />
            <button className="h-[1.8rem] w-20 rounded-8 bg-blue text-xs text-white">
              인증하기
            </button>
          </div>
          {errors.email && <Error>{errors.email.message}</Error>}
        </FieldDiv>
        <FieldDiv>
          <label>인증번호</label>
          <input
            type="text"
            id="authNum"
            placeholder="이메일로 전송된 인증번호 8자리를 입력해주세요."
            {...register('authNum')}
            className="input-box"
          />
          {errors.authNum && <Error>{errors.authNum.message}</Error>}
        </FieldDiv>
        <FieldDiv>
          <label>비밀번호</label>
          <input
            type="password"
            id="pasword"
            placeholder="영문, 숫자, 특수문자 포함 8~16자로 입력해주세요."
            {...register('password')}
            className="input-box"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </FieldDiv>
        <FieldDiv>
          <label>비밀번호 확인</label>
          <input
            type="passwordCheck"
            id="paswordCheck"
            {...register('passwordCheck')}
            className="input-box"
          />
          {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}
        </FieldDiv>
        <FieldDiv>
          <label>성별</label>
          <div {...register('gender')} className="grid grid-cols-2 grid-rows-1 items-center gap-2">
            <span
              className={gender === 'male' ? 'input-box-clicked' : 'input-box'}
              onClick={() => setGender('male')}
            >
              남자
            </span>
            <span
              className={gender === 'female' ? 'input-box-clicked' : 'input-box'}
              onClick={() => setGender('female')}
            >
              여자
            </span>
          </div>
          {errors.gender && <Error>{errors.gender.message}</Error>}
        </FieldDiv>
        <FieldDiv>
          <label>사용자 타입</label>
          <div {...register('type')} className="grid grid-cols-2 grid-rows-1 items-center gap-2">
            <TypeSelectDiv
              className={userType === 'scouter' ? 'input-box-clicked' : 'input-box'}
              onClick={() => setUserType('scouter')}
            >
              <Image src="/sign_up_scouter.svg" width={100} height={100} alt="scouter" />
              <span>Scouter</span>
            </TypeSelectDiv>
            <TypeSelectDiv
              className={userType === 'entertainer' ? 'input-box-clicked' : 'input-box'}
              onClick={() => setUserType('entertainer')}
            >
              <Image src="/sign_up_entertainer.svg" width={100} height={100} alt="entertainer" />
              <span>Entertainer</span>
            </TypeSelectDiv>
          </div>
          {errors.type && <Error>{errors.type.message}</Error>}
        </FieldDiv>
        <button
          type="submit"
          className="mt-8 h-10 w-[400px] rounded-12 bg-blue font-medium text-white"
        >
          Register
        </button>
      </form>
      <div className="mt-8 flex flex-row items-center text-xs text-darkgray">
        <p>이미 계정이 있으신가요?</p>
        <span className="ml-2 cursor-pointer font-bold underline">Sign In</span>
      </div>
    </div>
  )
}

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
`
const Error = styled.p`
  color: #db1414;
  font-size: small;
  margin-left: 0.5rem;
`

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
`

export default page
