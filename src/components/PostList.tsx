import { useState } from 'react';
import usePosts from '../hooks/usePosts';
import React from 'react';

const PostList = () => {
  // state for select dropdown filter
  // const [userId, setUserId] = useState<number>();
  // const { data, error, isLoading } = usePosts(userId);

  // state for pagination
  // const pageSize = 10;
  // const [page, setPage] = useState(1);
  // const { data, error, isLoading } = usePosts({ page, pageSize });

  // state for search
  // const [search, setSearch] = useState<string>('');
  // const { data, error, isLoading, refetch } = usePosts(search);

  // usePosts for inifiteQuery
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({ pageSize });

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <p>{error?.message}</p>;

  return (
    <>
      <h1>Posts List</h1>
      {/* select with dropdown functionality */}
      {/* <select
        name=''
        id=''
        value={userId}
        className='form-select form-select-lg mb-3 p-3'
        style={{ width: '100%' }}
        onChange={(e) => setUserId(+e.target.value)}
      >
        <option value=''>All Posts</option>
        <option value='1'>User 1</option>
        <option value='2'>User 2</option>
        <option value='3'>User 3</option>
      </select> */}

      {/* search functionality */}
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='search'
            aria-describedby='search '
            placeholder='Search Posts..'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form> */}
      <>
        <ul className='list-group'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((post) => (
                <li key={post.id} className='list-group-item'>
                  {post.title}
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
        <button
          className='btn btn-primary my-3 ms-1'
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      </>

      {/* <button
        disabled={page === 1}
        classNameName='btn btn-primary'
        onClick={() => setPage((prev) => prev - 1)}
      >
        Prev
      </button>
      <button
        classNameName='btn btn-primary ml-2'
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button> */}
    </>
  );
};

export default PostList;
