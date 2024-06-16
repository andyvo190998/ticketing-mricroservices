import mongoose from "mongoose";
import { Password } from "../services/password";

// interface that describes the properties that are required to create new User

interface UserProps {
    email: string;
    password: string;
}

//interface that describes the props that user has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserProps): UserDoc;
}

//interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    updatedAt?: string;
    createdAt?: string;
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
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v
        }
    }
})

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }
})

userSchema.statics.build = (attrs: UserProps) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }