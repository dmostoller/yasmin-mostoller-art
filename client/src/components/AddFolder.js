import { Input, Icon, Button } from "semantic-ui-react"
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";


export default function AddFolder({onToggleFolder, onAddFolder}) {
    const [error, setError] = useState(null)

    const formSchema = yup.object().shape({
        name: yup.string()
        .required("Please enter a group name"),
    })
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
          name:'',
        },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          r.json().then(newFolder => {
            onAddFolder(newFolder)
            // setFolders([...folders, newFolder])
            formik.resetForm()
            onToggleFolder()
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
                placeholder='Folder name......'
                value={formik.values.name} 
                onChange={formik.handleChange}
                id='name' 
                name='name'
                iconPosition='left'
                action
                icon>
                <Icon 
                    name='close'
                    onClick={onToggleFolder}  
                     
                    link
                    className="teal button" 
                />
                <input/>
                <Button className='teal button' type='submit'>Submit</Button>
            </Input>
            {formik.errors && <p style={{color:'red', textAlign:'left'}}>{formik.errors.name}</p>}
            {error &&
          <div>{error}</div>
            }
        </form>

    )


}