import { TodoInput } from 'src/component/TodoInput'
import { TodoItem } from 'src/component/TodoItem'
import { ITodoListGQResponse } from 'src/interfaces'
import { gql, useMutation, useQuery } from '@apollo/client'

const RETRIEVE = gql`
  query Retrieve {
    todoList {
      id
      createdBy
      content
    }
  }
`

const DELETE = gql`
  mutation Delete($id: Int!) {
    deleteTodoItem(id: $id) {
      updatedRows
    }
  }
`

const CREATE = gql`
  mutation Create($content: String!, $createdBy: String!) {
    createTodoItem(content: $content, createdBy: $createdBy) {
      id
      createdBy
      content
    }
  }
`

const Home = () => {
  const { data, refetch } = useQuery<ITodoListGQResponse>(RETRIEVE)

  const [deleteTodo] = useMutation(DELETE, {
    onCompleted: () => {
      alert('삭제되었습니다.')
      refetch()
    },
  })
  const [createTodo] = useMutation(CREATE, {
    onCompleted: () => {
      alert('To-Do 항목이 추가되었습니다.')
      refetch()
    },
  })

  return (
    <div className="container card bg-light mt-3">
      <h1>To-Do List</h1>
      <ul className="list-group">
        {data?.todoList?.map((todoItem, idx) => (
          <TodoItem
            todoItem={todoItem}
            key={idx}
            onDelete={() => {
              deleteTodo({ variables: { id: todoItem.id } })
            }}
          />
        ))}
      </ul>
      <TodoInput
        onCreate={(content) => {
          const createdBy = prompt('당신의 이름을 입력하세요')
          createTodo({ variables: { content, createdBy } })
        }}
      />
    </div>
  )
}

export default Home
