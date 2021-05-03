import { useEffect, useRef } from 'react';
import useForm from '../../Hooks/useForm';
import { useEditUserData } from '../../apollo/actions';

export default function EditProfile(props) {

    const { formField, formError, formSuccess, setFormSuccess, setFormField, setFormError, handleInputFieldChange } = useForm();

    const { userData, userId } = props;

    const [editUserInfo, { loading }] = useEditUserData();

    let disposeId = useRef();

    const disposeMessage = () => {
        if (formSuccess) {
            setFormSuccess('');
        }
        if (formError) {
            setFormError('');
        }
    }

    useEffect(() => {
        if (formError || formSuccess) {
            disposeId.current = setTimeout(() => {
                disposeMessage();
            }, 3000)
        }
        return (() => {
            clearTimeout(disposeId.current);
        })
    }, [formError, formSuccess])

    useEffect(() => {
        if (userData) {
            setFormField(userData.getUserInfo.userData);
        }
    }, [userData])

    const handleEditUser = async (e) => {
        e.preventDefault();
        let userInfoData = {};
        Object.keys(formField).forEach(key => {
            if (key !== '_id' && key !== '__typename') {
                userInfoData = {
                    ...userInfoData,
                    [key]: formField[key]
                }
            }
        })
        try {
            const { data } = await editUserInfo({ variables: { userId, ...userInfoData } });
            if (data && data.updateUser) {
                setFormSuccess('Updated Successfully..')
            }
        }
        catch (err) {
            let errorData = JSON.parse(JSON.stringify(err));
            if (errorData.graphQLErrors && errorData.graphQLErrors.length > 0) {
                setFormError(errorData.graphQLErrors[0].message);
            }
            else {
                setFormError('Something went wrong please try again...!')
            }
        }
    }

    return (
        <form onSubmit={handleEditUser}>
            <div className="row">
                <div className="col-md-6">
                    <input
                        className='form_input_field'
                        type="text"
                        name="username"
                        placeholder="UserName"
                        value={formField?.username ?? ''}
                        onChange={handleInputFieldChange}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        className='form_input_field'
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formField?.name ?? ''}
                        onChange={handleInputFieldChange}
                    />
                </div>
            </div>
            <input
                className='form_input_field'
                type="email"
                name="email"
                placeholder="Email Address"
                value={formField?.email ?? ''}
                onChange={handleInputFieldChange}
            />
            <textarea
                name="bio"
                className="form_text_area"
                placeholder="Bio"
                value={formField?.bio ?? ''}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="text"
                name="company"
                placeholder="Company"
                value={formField?.company ?? ''}
                onChange={handleInputFieldChange}
            />
            <input
                className='form_input_field'
                type="text"
                name="location"
                placeholder="Location"
                value={formField?.location ?? ''}
                onChange={handleInputFieldChange}
            />
            {
                formError ? <div className="form_error">{formError}</div> : null
            }
            {
                formSuccess && <div className="form_success">{formSuccess}</div>
            }
            <div className="row">
                <div className="col-md-5">
                    {
                        <button disabled={loading ? true : false} className={loading ? "form_disable_btn" : "form_btn"}>{loading ? 'updating...' : 'update'}</button>
                    }
                </div>
            </div>
        </form>
    )
}
