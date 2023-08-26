import mongoose from "mongoose";


const shareFileModelSchema = new mongoose.Schema({
    primaryOwner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    secondaryOwners:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            }
        ]
    ,
    fileName: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "FileModel"
    }
})

const ShareFile = mongoose.model("ShareFile", shareFileModelSchema);

export default ShareFile;