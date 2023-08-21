import mongoose from "mongoose";


const fileSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    filename: {
        type: String,
        required: true,
    },
    textData: {
        type: String,
        required: true,
    }
});

const FileModel = mongoose.model("FileModel", fileSchema);

export default FileModel;