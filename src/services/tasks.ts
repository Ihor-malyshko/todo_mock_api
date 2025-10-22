import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: (result = []) => {
        return [
          ...result.map(({ id }: { id: string | number }) => ({ type: 'Tasks', id })),
          { type: 'Tasks', id: 'LIST' },
        ];
      },
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: `/tasks/${updatedTask.id}`,
        method: 'PUT',
        body: updatedTask,
      }),
      invalidatesTags: (meta, ResultType, QueryArg) => {
        const { id } = QueryArg;
        return [{ type: 'Tasks', id: id }];
      },
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Tasks'],
      invalidatesTags: (meta, ResultType, QueryArg) => {
        const { id } = QueryArg;
        return [
          { type: 'Tasks', id: id },
        ];
      },
    }),
  }),

  tagTypes: [
    'Tasks',
  ],
})

export const {
  useGetTasksQuery, useCreateTaskMutation,
  useUpdateTaskMutation, useDeleteTaskMutation
} = tasksApi
