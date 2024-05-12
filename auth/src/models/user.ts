import mongoose from "mongoose";

// interface that describes the properties that are required to create new User

interface UserProps {
    email: string;
    password: string;
}

//interface that describes the props that user has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserProps): any
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.build = (attrs: UserProps) => {
    return new User(attrs)
}

const User = mongoose.model<any, UserModel>('User', userSchema)

export { User }