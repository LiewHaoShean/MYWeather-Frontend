import Select from "react-select";
import { VscDash } from "react-icons/vsc";
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/slices/post/postSlice";
import ErrorMsg from "../global/erroMsg";
import SuccessMsg from "../global/successMsg";
import { BiMailSend } from "react-icons/bi";
import { getAllTagAction } from "../../redux/slices/tag/tagSlice";
import { StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { BiPaperPlane } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  
  const colourStyles: StylesConfig = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

export default function AddPost(){

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //to show the images
    const [images, setImages] = useState([]);
    //to pass in dispatch for post action
    const [files, setFile] = useState([]);
  
    const handleFileChange = (event) => {
      const newFiles = Array.from(event.target.files);
      const imageUrls = newFiles.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
      setFile((prevImages)=> [...prevImages, ...newFiles]);
    };

    useEffect(()=>{
        dispatch(getAllTagAction())
    },[dispatch])

    const {tags} = useSelector((state)=>state?.tag);

    const tagOptionsCoverted = tags?.tagFound?.map(tag=>{
        return {
          value: tag?.name,
          label: tag?.name,
          color: `${tag?.color.split("-")[1]}`
        };
    });

    const [tag, setTag] = useState("");

    const handlerTagChangeOption = (tag) =>{
        setTag(tag.value);
        setFormData({...formData, ["tag"]: tag.value});
    } 

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const handlerOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    }

    const handlerOnSubmit = (e) =>{
        e.preventDefault();
        console.log(files);
        dispatch(
            createPostAction({...formData, files})
        );
        setFormData({
            title: "",
            description: "",
            tag: ""
        })
    }

    const {error, loading, isCreated, post} = useSelector((state)=>state?.post);

    //redirect
    useEffect(()=>{
        if(isCreated){
            navigate("/forum/post")
        }
    }, [isCreated, navigate])


    return (
        <>
            {error && <ErrorMsg message={error?.message}/>}
            {/* {isCreated && <SuccessMsg message={post?.message}/>} */}
            <section className="h-[80%] w-[80%] mx-auto bg-white shadow-md dark:bg-gray-800 my-6">
                <div className="bg-slate-200 h-12 flex flex-row flex-wrap justify-between content-center px-4">
                    <h1 className="text-xl font-bold text-black capitalize dark:text-white text-center">Post Something</h1>
                    <VscDash className="text-4xl" />
                </div>
                <div className="px-8">
                    <div className="flex flex-col">
                    <div>
                        <input
                        name="title"
                        type="text"
                        className="w-full px-4 py-2 mt-2 outline-none text-gray-700 bg-white border-b-2 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        placeholder="Title"
                        onChange={handlerOnChange}
                        />
                    </div>
                    <div className="py-2">
                        <textarea
                        name="description"
                        type="textarea"
                        className="h-20 w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-dashed border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                        placeholder="Description"
                        onChange={handlerOnChange}
                        />
                    </div>
                    <div>
                        <Select
                        name="tag"
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable
                        isLoading={false}
                        isSearchable
                        closeMenuOnSelect={false}
                        options={tagOptionsCoverted}
                        styles={colourStyles}
                        onChange={handlerTagChangeOption}
                        />
                    </div>
                    <div className="mt-4 flex flex-row justify-between items-end h-36">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-wrap">
                                {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Uploaded ${index}`}
                                    className="h-20 w-20 object-cover mb-2 rounded mr-2"
                                />
                                ))}
                            </div>
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                            >
                                <span>
                                <svg
                                    className="mx-auto h-12 w-12 text-black"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                                </span>
                                <input
                                    id="file-upload"
                                    name="file"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </label>
                        </div>
                        <div>
                        <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-200 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-gray-600" onClick={handlerOnSubmit}>
                            {loading ? <BiPaperPlane className="text-xl" /> : <IoIosSend className="text-xl" />}
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
        </>
    )
}   