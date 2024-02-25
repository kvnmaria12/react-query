import { useRef } from 'react';
import useAddTodo from '../hooks/useAddTodo';

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);

  const { error, isPending, mutate } = useAddTodo(() => {
    if (ref.current) ref.current.value = '';
  });

  return (
    <>
      {error && <div className='alert alert-danger'>{error.message}</div>}
      <form
        className='row mb-3 mt-4 ml-2'
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value) {
            let todo = {
              id: Math.random(),
              title: ref?.current?.value,
              completed: false,
              userId: 1,
            };
            mutate(todo);
          }
        }}
      >
        <div className='col'>
          <input ref={ref} type='text' className='form-control' />
        </div>
        <div className='col'>
          <button className='btn btn-primary' disabled={isPending}>
            {isPending ? 'Adding' : 'Add'}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
