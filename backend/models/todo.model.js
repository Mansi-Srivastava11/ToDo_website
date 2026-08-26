import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },

        description : {
            type: String,
            default : "",
        },

        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium',
        },

        dueDate: {
            type: Date,
        },

        isCompleted : {
            type: Boolean,
            default: false,
        },

        userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    },
    
        { 
            timestamps : true
        }

    
);

export default mongoose.model("Todo", todoSchema);