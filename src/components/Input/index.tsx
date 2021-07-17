
import { InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { StyledDivInput } from './StyledDivInput';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value?: string | number;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input = ({ name, label, value, ...rest }: InputProps): JSX.Element => {

  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const defaultInputValue = value || defaultValue

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref: any) => {
        return ref.current.value
      },
      setValue: (ref: any, newValue: any) => {
        ref.current.value = newValue
      },
      clearValue: (ref: any) => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField, error])

  return (
    <StyledDivInput>
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultInputValue}
        {...rest}
      />
      <label htmlFor={fieldName}>{label}</label>
      { error && <span className="error">{error}</span> }
    </StyledDivInput>
  )
}

export default Input;
