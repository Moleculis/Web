import * as React from "react";
import TextField from "@material-ui/core/TextField";
import {ChangeEvent, Component} from "react";
import {checkNotEmpty} from "../../utils/Validation";

interface TextFormFieldProps {
    required?: boolean,
    label: string,
    value: string,
    onChange: (value: string) => void,
    validation?: (value: string) => string | undefined,
    autoFocus?: boolean,
    type?: React.InputHTMLAttributes<unknown>["type"],
    autoComplete?: string
}

interface TextFormFieldState {
    isError: boolean,
    errorMessage?: string,
}

class TextFormField extends Component<TextFormFieldProps, TextFormFieldState> {
    constructor(props: TextFormFieldProps) {
        super(props);

        this.state = {
            isError: false
        };
    }

    validate = (): boolean => {
        const {value, validation, required, label} = this.props;
        if (required) {
            const emptyFieldMessage = checkNotEmpty(value, label);
            if (emptyFieldMessage) {
                this.setState({
                    isError: true,
                    errorMessage: emptyFieldMessage
                });
                return false;
            }
        }
        if (validation) {
            const errorMessage = validation(value);
            if (errorMessage) {
                this.setState({
                    isError: true,
                    errorMessage: errorMessage
                });
                return false;
            }
        }
        return true;
    }

    render() {
        const {required, label, value, onChange, autoFocus, type, autoComplete} = this.props;
        const lowerCaseLabel = label.toLowerCase();

        const {isError, errorMessage} = this.state;

        const wrappedOnChange = (event: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                isError: false,
                errorMessage: undefined
            });
            onChange(event.target.value);
        }

        return (
            <>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required={required}
                    fullWidth
                    id={lowerCaseLabel}
                    label={label}
                    name={lowerCaseLabel}
                    type={type}
                    value={value}
                    onChange={wrappedOnChange}
                    autoFocus={autoFocus}
                    error={isError}
                    helperText={errorMessage}
                    autoComplete={autoComplete}
                />
            </>
        );
    }
}

export default TextFormField;