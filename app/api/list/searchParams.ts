import { FILTERS } from '@/app/lib/filters';

//
//
//

export default function searchParams(params: string) {
  // keyword=kitsch&field=creator&field=idol&age=50s&age=40s
  // { keyword: ['kitsch'], field: ['creator', 'idol'], age: ['50s', '40s'] }

  const queryParams = new URLSearchParams(params);
  const filters: any = {};

  // 성별 필터링
  if (queryParams.has('gender')) {
    const gender = queryParams.getAll('gender');
    filters.gender = gender.map((g) => (g === 'male' ? 0 : 1));
  }

  // 연령대 필터링 (출생 연도로 변환)
  if (queryParams.has('age')) {
    const ageRanges = queryParams.getAll('age');
    filters.age = ageRanges.map((age) => {
      const year = new Date().getFullYear();
      let lowerBound = 0;
      let upperBound = 0;

      switch (age) {
        case '10s':
          lowerBound = year - 19;
          upperBound = year - 10;
          break;
        case '20s':
          lowerBound = year - 29;
          upperBound = year - 20;
          break;
        case '30s':
          lowerBound = year - 39;
          upperBound = year - 30;
          break;
        case '40s':
          lowerBound = year - 49;
          upperBound = year - 40;
          break;
        case '50s':
          lowerBound = year - 59;
          upperBound = year - 50;
          break;
        default:
          break;
      }

      return { lowerBound, upperBound };
    });
  }

  // 분야 필터링
  if (queryParams.has('field')) {
    const fields = queryParams.getAll('field');
    filters.platforms = fields.map((field) => {
      const option = FILTERS.field.options.find(
        (option) => option.value === field,
      );
      return option?.name; // value에 해당하는 name을 가져옴
    });
  }

  // 키워드 필터링
  if (queryParams.has('keyword')) {
    const keywords = queryParams.getAll('keyword');
    filters.keywords = keywords.map((keyword) => {
      const option = FILTERS.keyword.options.find(
        (option) => option.value === keyword,
      );
      return option?.name; // value에 해당하는 name을 가져옴
    });
  }

  return filters;
}
