import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

export default function SearchBox() {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || '') // urlKeyword is undefined on initial render

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      navigate(`/search/${keyword.trim()}`)
      setKeyword('')
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-success' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  )
}
