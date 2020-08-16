import React, {Component, ReactNode} from 'react';
import TextFormField from "./TextFormField";

interface FormProps {
    children: ReactNode,
    className?: string,
    onSubmit?: () => void,
    validate?: boolean
}

class Form extends Component<FormProps> {
    textFormFieldsRefs: Array<TextFormField | undefined> = new Array<TextFormField | undefined>();

    validate = (): boolean => {
        let result: boolean = true;
        for (let textFormField of this.textFormFieldsRefs) {
            if (textFormField && textFormField.validate && !textFormField.validate() && result) {
                result = false;
            }
        }
        return result;
    }

    onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const propsOnSubmit = () => {
            if (this.props.onSubmit) {
                this.props.onSubmit();
            }
        };
        const validate = this.props.validate;
        if (validate || validate === undefined) {
            if (this.validate()) {
                propsOnSubmit();
            }
        } else {
            propsOnSubmit();
        }
    }

    render() {
        const {children, className} = this.props;
        const newChildren = this.assignRefsToTextFormFields(children);
        return (
            <>
                <form className={className} onSubmit={this.onSubmit} children={newChildren}/>
            </>
        );
    }

    assignRefsToTextFormFields = (children: ReactNode): ReactNode => {
        this.textFormFieldsRefs = new Array<TextFormField | undefined>();
        const newChildren: Array<any> = React.Children.toArray(children);
        for (let i = 0; i < newChildren.length; ++i) {
            const child = newChildren[i];
            if (child.type === TextFormField) {
                newChildren[i] = React.cloneElement(child, {
                    ...child.props, ref: (ref: TextFormField | undefined) => {
                        if (ref) {
                            this.textFormFieldsRefs.push(ref);
                        }
                    }
                });
            } else if (child.props?.children) {
                newChildren[i] = React.cloneElement(child, {
                    ...child.props,
                    children: this.assignRefsToTextFormFields(child.props.children),
                });
            }
        }
        return newChildren;
    }
}

export default Form;