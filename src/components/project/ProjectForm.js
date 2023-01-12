import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){
  return (
    <form className={styles.form}>
      <Input  type='text' 
              text='Nome do projeto'
              placeholder='Insira o nome do projeto'
              name='name'/>
      <Input  type='number' 
              text='Orçamento Total'
              placeholder='Insira o orçamento total'
              name='budget'/>
      <Select name='category_id' text='Categoria'  />     
      <SubmitButton text={btnText} />
    </form>
  )
}

export default ProjectForm