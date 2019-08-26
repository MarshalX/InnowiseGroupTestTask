import React from 'react';
import {asField} from 'informed';
import {Form} from "react-bootstrap";


const Text = asField(({fieldState, fieldApi, ...props}) => {
    const {value} = fieldState;
    const {setValue, setTouched} = fieldApi;
    const {onChange, onBlur, initialValue, forwardedRef, ...rest} = props;
    return (
        <React.Fragment>
            <Form.Control
                {...rest}
                ref={forwardedRef}
                value={!value && value !== 0 ? '' : value}
                onChange={e => {
                    setValue(e.target.value);
                    if (onChange) {
                        onChange(e);
                    }
                }}
                onBlur={e => {
                    setTouched(true);
                    if (onBlur) {
                        onBlur(e);
                    }
                }}
                isInvalid={fieldState.error}
            />
            {fieldState.error ? (
                <small className="text-danger">{fieldState.error}</small>
            ) : null}
        </React.Fragment>
    );
});

export default Text