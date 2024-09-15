import { authApi } from '@/app/lib/api';

//
//
//

const fetcher = (url: string) => authApi.get(url).then((res) => res.data);

//
//
//

export default fetcher;
