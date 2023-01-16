import {useEffect, useState} from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){
  const [categories, setCategories] = useState([])
  const [project, setProject ] = useState(projectData || {})

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((resp) => resp.json())
          .then((data) => {
            setCategories(data)
          })
          .catch((err) => console.log(err))
  }, [])

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e) {
    
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input  type='text' 
              text='Nome do projeto'
              placeholder='Insira o nome do projeto'
              name='name'/>
      <Input  type='number' 
              text='Orçamento Total'
              placeholder='Insira o orçamento total'
              name='budget'/>
      <Select name='category_id' 
              text='Categoria' 
              options={categories}
      />     
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm