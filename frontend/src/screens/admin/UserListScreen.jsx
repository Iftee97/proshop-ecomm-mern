import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'

export default function UserListScreen() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id)
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <Link to={`/admin/user/${user._id}/edit`} style={{ marginRight: '10px' }}>
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {deleteUserLoading && <Loader />}
    </>
  )
}
