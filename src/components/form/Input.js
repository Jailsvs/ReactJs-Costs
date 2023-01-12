import styles from './Input.module.css'

function Input({type, text, placeholder, name, handleOnChange, value}){
  return (
    <div className={styles.formControl}>
      <label htmlFor={name}>{text}</label>
      <input  type={type} 
              placeholder={placeholder}
              name={name}
              id={name}
              value={value}
              onChange={handleOnChange}/>
    </div>    
  )
}

export default Input