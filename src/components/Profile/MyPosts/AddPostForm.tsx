import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeysType, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";

type PropsType = {

}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeysType<AddPostFormValuesType>

const maxLength10 = maxLengthCreator(10);

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>(
                    'Post message',
                    'newPostText',
                    Textarea,
                    [required, maxLength10])}
                {/*<Field component={Textarea}*/}
                {/*       name='newPostText'*/}
                {/*       placeholder='Post message'*/}
                {/*       validate={[required, maxLength10]}/>*/}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'addPostForm'})(AddPostForm);