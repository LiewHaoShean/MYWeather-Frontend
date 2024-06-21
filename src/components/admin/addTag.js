import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTagAction, deleteTagAction, getAllTagAction } from "../../redux/slices/tag/tagSlice";
import ErrorMsg from "../global/erroMsg";
import SuccessMsg from "../global/successMsg";

const colors = [
    { name: 'Blue', className: 'bg-blue-400' },
    { name: 'Yellow', className: 'bg-yellow-400' },
    { name: 'Red', className: 'bg-red-400' },
    { name: 'Green', className: 'bg-green-400' },
    { name: 'Orange', className: 'bg-orange-400'},
    { name: 'Green', className: 'bg-green-400'},
    { name: 'Cyan', className: 'bg-cyan-400'},
    { name: 'Indigo', className: 'bg-indigo-400'},
    { name: 'Purple', className: 'bg-purple-400'}
];


export default function AddTag() {
    const dispatch = useDispatch();

    const [newTags, setTags] = useState({
        name: "",
        color: "bg-blue-400"
    });

    const onChangeHandler = (e) => {
        e.preventDefault();
        setTags({...newTags, [e.target.name]: e.target.value});
    }


    const handleAddTag = (e) => {
        e.preventDefault();
        dispatch(createTagAction(newTags));
        setTags({
            name: "",
            color: ""
        })
        // dispatch(getAllTagAction());
    };
    
    const {tagLoading, tagError, isTagCreated, tag, tags, isTagDeleted} = useSelector((state)=>state?.tag);

    const handleRemoveTag = (tagId) => {
        dispatch(deleteTagAction(tagId));
        dispatch(getAllTagAction());
    };

    useEffect(()=>{
        dispatch(getAllTagAction())
    },[dispatch , isTagCreated, isTagDeleted]);

    return (
        <>
            {isTagDeleted && <SuccessMsg message={tag?.message}/>}
            {isTagCreated && <SuccessMsg message={tag?.message}/>}
            {tagError && <ErrorMsg message={tagError?.message}/>}
            <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto max-h-[95vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Add Tags</h2>
                </div>
                <div className="mb-4">
                    <select
                    name="color"
                    value={newTags?.color}
                    onChange={onChangeHandler}
                    className="border p-2 rounded w-full"
                    >
                    {colors.map((color) => (
                        <option key={color.name} value={color.className}>
                        {color.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="flex flex-col space-y-2 mb-4">
                    {tags?.tagFound?.map((tag, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded ${tag?.color}`}
                    >
                        <span>{tag?.name}</span>
                        <button onClick={() => handleRemoveTag(tag?._id)} className="text-lg">
                        &times;
                        </button>
                    </div>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <input
                    type="text"
                    name="name"
                    value={newTags?.name}
                    onChange={onChangeHandler}
                    placeholder="Add a tag"
                    className="border p-2 rounded flex-grow"
                    />
                    <button
                    onClick={handleAddTag}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                    ADD
                    </button>
                </div>
            </div>
        </>
    )
}