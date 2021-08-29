import React, { FC, useState } from "react"
import { TextField, InputLabel, Select, RadioGroup, Radio, FormControlLabel, Checkbox, Icon } from '@material-ui/core';
import { AttachFile } from "@material-ui/icons";
import { Header } from "../../components"
import Resizer from "react-image-file-resizer";
const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

interface State {
  prefix: string
  firstname: string
  lastname: string
  gender: string
  email: string
  mobile: string
  choice: string
  accept1: boolean
  accept2: boolean
  accept3: boolean
}

export const Register: FC = () => {
  const [theInputKey, setTheInputKey] = useState(Math.random().toString(36))
  const [sessions, setSesstions] = useState<Sessions[]>()
  const [state, setState] = useState<State>();
  const [fileObj, setFile] = useState<File>(null)

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof state;
      setState({
        ...state,
        [name]: event.target.value,
      });
  };

  const handleCheck = (event) => {
    const name = event.target.name as keyof typeof state;
      setState({
        ...state,
        [name]: event.target.checked,
      });
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    if(file){
      const image = await resizeFile(file) as File;
      setFile(image)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log(state)
  }

  return <div className="bg-gradient-to-r from-green-200 to-purple-300 overscroll-x-hidden" style={{ backgroundSize: 'auto 100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="flex flex-col w-screen items-center">
        <div className="flex-1 w-full md:w-1/2 shadow-md bg-white my-8">
          <div className="flex justify-center pt-8 pb-4">
            <Header />
          </div>
          <form name="register" className="flex flex-col py-4 mx-12" noValidate autoComplete="off">
            <div className="flex flex-col my-2 text-left">
              <InputLabel htmlFor="prefix">Prefix*</InputLabel>
                <Select
                  placeholder="คำนำหน้า"
                  className="w-1/2"
                  onChange={handleChange}
                  inputProps={{
                      name: 'prefix',
                  }}
                  >
                  <option className="p-2" value={'mr'}>Mr.</option>
                  <option className="p-2"value={'mrs'}>Mrs.</option>
                  <option className="p-2"value={'miss'}>Miss</option>
                </Select>
            </div>
            <div className="flex flex-row my-2">
              <div className="w-1/2 mr-4 text-left">
                  <InputLabel htmlFor="name-input">Firstname*</InputLabel>
                  <TextField
                      required
                      id='name-input'
                      name="firstname"
                      onChange={handleChange}
                      className="w-full"
                      size="small"
                      defaultValue=""
                      variant="outlined"
                  />
              </div>
              <div className="w-1/2 mr-4 text-left">
                  <InputLabel htmlFor="surname-input">Lastname*</InputLabel>
                  <TextField
                      required
                      id='surname-input'
                      name="lastname"
                      onChange={handleChange}
                      className="w-full"
                      size="small"
                      defaultValue=""
                      variant="outlined"
                  />
              </div>
            </div>
            <div className="flex flex-col my-2 text-left">
              <InputLabel htmlFor="gender">Gender*</InputLabel>
              <RadioGroup row aria-label="gender" name="gender" onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" />
              </RadioGroup>
            </div>
            <div className="flex flex-row my-2">
              <div className="w-1/2 mr-4 text-left">
                  <InputLabel htmlFor="mobile-input">Mobile*</InputLabel>
                  <TextField
                      required
                      id='mobile-input'
                      name="mobile"
                      onChange={handleChange}
                      className="w-full"
                      size="small"
                      defaultValue=""
                      variant="outlined"
                  />
              </div>
              <div className="w-1/2 mr-4 text-left">
                  <InputLabel htmlFor="email-input">Email*</InputLabel>
                  <TextField
                      required
                      id="email-input"
                      name="email"
                      onChange={handleChange}
                      className="w-full"
                      size="small"
                      defaultValue=""
                      variant="outlined"
                  />
              </div>
            </div>
            <div className="flex-1 my-2">
              <div className=" border-dashed border-gray-400 border-2 rounded-xl">
              <input key={theInputKey} id="file" type="file" accept='image/*' style={{ display: 'none'}} 
              onChange={(evt) => onFileChange(evt)} />   
              <label
                className="flex p-12 cursor-pointer justify-center text-center"
                htmlFor="file"
              >
                {
                  fileObj? <img alt="" src={URL.createObjectURL(fileObj)} /> : 
                  <><AttachFile />
                  Attachment File</>
                }
              </label>
              </div>
            </div>
            <div className="flex flex-col my-2 text-left">
              <InputLabel htmlFor="choice">Choice</InputLabel>
              <RadioGroup aria-label="choice" name="choice" onChange={handleChange}>
                <FormControlLabel value="1" control={<Radio color="primary" />} label="1" />
                <FormControlLabel value="2" control={<Radio color="primary" />} label="2" />
              </RadioGroup>
            </div>
            <div className="flex flex-col my-2 text-left">
              <FormControlLabel name="accept1" onChange={handleCheck} 
                value={true}
                control={<Checkbox color="primary" />}
                label="A"
                labelPlacement="end"
              />
            </div>
            <div className="flex flex-col my-2 text-left">
              <FormControlLabel 
                control={<Checkbox name="accept2" onChange={handleCheck}  color="primary" />}
                label="B"
                labelPlacement="end"
              />
            </div>
            <div className="flex flex-col my-2 text-left">
              <FormControlLabel
                control={<Checkbox name="accept3" onChange={handleCheck} color="primary" />}
                label="C"
                labelPlacement="end"
              />
            </div>
            <div className="mt-4 self-center">
              <button onClick={submit} type="button" className="m-4 py-2 px-6 bg-blue-800 hover:bg-blue-900 text-white rounded-3xl"><div className="text-white">Submit</div></button>
            </div>
        </form>
        </div>
      </div>
  </div>
}


