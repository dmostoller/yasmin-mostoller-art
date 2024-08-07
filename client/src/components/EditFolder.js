import { Input, Icon, Button } from "semantic-ui-react"
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";


export default function EditFolder({name, id, setFolderName, onToggleEdit, onUpdateFolders }) {
    const [error, setError] = useState(null)

    const formSchema = yup.object().shape({
        name: yup.string()
        .required("Please enter a folder name"),
    })
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
          name:`${name}`,
        },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/folder/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          r.json().then(updatedFolder => {
            setFolderName(updatedFolder.name)
            // onUpdateFolders(id, updatedFolder)
            formik.resetForm()
            onToggleEdit()
            // toast.dark('Recipient added succesfully');
        })
        } else {
            r.json().then(error => setError(error.message))
            // setLoading(false)
        }
      })
    },
    })
    return (
        
        <form onSubmit={formik.handleSubmit}>
            <Input
                value={formik.values.name} 
                onChange={formik.handleChange}
                id='name' 
                name='name'
                iconPosition='left'
                action
                size="mini"
                icon>
                <Icon 
                    name='close'
                    onClick={onToggleEdit}   
                    link
                    className="teal button" 
                />
                <input/>
                <Button className='basic teal icon button' type='submit'><i class="check icon"></i></Button>
            </Input>
            {formik.errors && <p style={{fontSize: "12px", color:'red', textAlign:'left'}}>{formik.errors.name}</p>}
            {error &&
          <div>{error}</div>
            }
        </form>
        
    )


}