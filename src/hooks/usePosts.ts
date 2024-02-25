import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface PostQuery {
  // page: number;
  pageSize: number;
}

/**
 * 1. Fetching all the post from post api
 * api endpoint -> https://jsonplaceholder.typicode.com/posts
 */
// const usePosts = () => {
//   const fetchPosts = () =>
//     axios
//       .get<Post[]>(`https://jsonplaceholder.typicode.com/posts`, {})
//       .then((res) => res.data);

//   return useQuery({
//     queryKey: ['posts'],
//     queryFn: fetchPosts,
//     staleTime: 1 * 60 * 1000, // 1min
//   });
// };

/**
 * 2. Fetching using query params -> userId
 * api -> https://jsonplaceholder.typicode.com/posts?userId=1
 */

// const usePosts = (userId: number | undefined) => {
//   const fetchPostWithParams = () =>
//     axios
//       .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
//         params: {
//           userId: userId == 0 ? {} : userId,
//         },
//       })
//       .then((res) => res.data);

//   return useQuery({
//     queryKey: userId ? ['user', userId, 'posts'] : ['posts'],
//     queryFn: fetchPostWithParams,
//     gcTime: 100000,
//     staleTime: 1 * 60 * 1000, // 1min
//   });
// };

/**
 * 3. Pagination with react query
 * api endpoint ->https://jsonplaceholder.typicode.com/posts?_start=10&_limit=10
 */
// const usePosts = (query: PostQuery) => {
//   const fetchPostWithPagination = () =>
//     axios
//       .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
//         params: {
//           _start: (query.page - 1) * query.pageSize,
//           _limit: query.pageSize,
//         },
//       })
//       .then((res) => res.data);

//   return useQuery({
//     queryKey: ['posts', query.page],
//     queryFn: fetchPostWithPagination,
//     placeholderData: keepPreviousData,
//     staleTime: 1 * 60 * 1000, // 1min
//   });
// };

/**
 * Search functionality with React Query
 * api endpoint -> https://jsonplaceholder.typicode.com/posts?title_like=^rem
 */

// const usePosts = (search: string | undefined) => {
//   const fetchSearchedPosts = () =>
//     axios
//       .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
//         params: {
//           title_like: search ? `^${search}` : {},
//         },
//       })
//       .then((res) => res.data);

//   return useQuery({
//     queryKey: ['search'],
//     queryFn: fetchSearchedPosts,
//     staleTime: 1 * 60 * 1000, //1min
//   });
// };

/**
 * useInfiniteQuery  -> to load inifite data
 * useInfiniteQuery automatically takes care of pagination
 *
 * */

const usePosts = (query: PostQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: ({ pageParam }) =>
      axios
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, //1m
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default usePosts;
