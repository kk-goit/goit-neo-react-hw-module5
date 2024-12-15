import { Field, Form, Formik } from 'formik'

function SearchMovie({ onSearch = () => { }, setErrMsg = () => { } }) {
  function handleSubmit(values, actions) {
    const queryStr = values.queryStr.trim()
    if (queryStr.length > 0)
      onSearch(queryStr)
    else
      setErrMsg('You need to enter something for searching...')
    actions.resetForm()
  }

  return (
    <Formik initialValues={{ queryStr: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field name='queryStr' type='text' />
        <button type='submit'>Search</button>
      </Form>
  </Formik>
  )
 }

export default SearchMovie