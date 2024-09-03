import * as yup from 'yup'

export const SignUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('필수 입력 항목입니다.')
    .matches(
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      '올바른 이메일 형식이 아닙니다.',
    ),
  authNum: yup.string().required('필수 입력 항목입니다.'),
  password: yup
    .string()
    .required('필수 입력 항목입니다.')
    .min(8, '8-16자로 입력해주세요.')
    .max(16, '8-16자로 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/,
      '영문, 숫자, 특수문자를 모두 포함하여 입력해주세요.',
    ),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('필수 입력 항목입니다.'),
  gender: yup.string().required('필수 입력 항목입니다.'),
  type: yup.string().required('필수 입력 항목입니다.'),
})
