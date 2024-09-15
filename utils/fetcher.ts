import { authApi } from '@/services/api';

//
//
//

const fetcher = (url: string) => authApi.get(url).then((res) => res.data);

//
//
//

export default fetcher;
