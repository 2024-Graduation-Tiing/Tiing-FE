interface UserInfo {
  role: string;
  memberId: string;
}

export interface GetApiUserDetail {
  code: number;
  isSuccess: boolean;
  message: string;
  result: UserInfo;
}

type DynamicObject = { [key: string]: string };

export interface ProfileInfo {
  entertainer_id: string;
  name: string;
  plaforms: DynamicObject;
  age: number;
  height: number;
  weight: number;
  keywords: DynamicObject;
  description: string;
  images: DynamicObject;
  career?: DynamicObject;
  entertainer: { gender: number | string };
}

export interface ProposalInfo {
  id: number;
  scouter_id: string;
  company: string;
  title: string;
  platforms: DynamicObject;
  gender_condition: DynamicObject;
  keywords: DynamicObject;
  description: string;
  image: string;
  end_date: Date;
  age_condition: DynamicObject;
}
