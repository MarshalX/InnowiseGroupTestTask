import React, {useRef} from 'react';
import {asField} from 'informed';
import {Form} from "react-bootstrap";


const Select = asField(({fieldState, fieldApi, ...props}) => {
    const {value} = fieldState;
    const {setTouched} = fieldApi;
    const {
        onChange,
        onBlur,
        field,
        initialValue,
        children,
        forwardedRef,
        multiple,
        ...rest
    } = props;

    const selectRef = useRef();

    const handleChange = (e) => {

        let selected = Array.from((forwardedRef || selectRef).current)
            .filter(option => option.selected)
            .map(option => option.value);

        fieldApi.setValue(
            multiple ? selected : selected[0] || ''
        );

        if (onChange && e) {
            onChange(e);
        }
    };

    return (
        <React.Fragment>
            <Form.Control as="select"
                          {...rest}
                          multiple={multiple}
                          name={field}
                          ref={forwardedRef || selectRef}
                          value={value || (multiple ? [] : '')}
                          onChange={handleChange}
                          onBlur={e => {
                              setTouched(true);
                              if (onBlur) {
                                  onBlur(e);
                              }
                          }}
                          isInvalid={fieldState.error}
            >{children}
            </Form.Control>
            {fieldState.error ? (
                <small className="text-danger">{fieldState.error}</small>
            ) : null}
        </React.Fragment>
    );
});

export default Select
