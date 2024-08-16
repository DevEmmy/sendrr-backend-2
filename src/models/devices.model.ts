import { Schema, model, Document } from 'mongoose';

interface IDevice extends Document {
    userId: Schema.Types.ObjectId;
    deviceName: string;
    deviceType: 'Phone' | 'Laptop' | 'Tablet' | 'Desktop';
    createdAt: Date;
}

const deviceSchema = new Schema<IDevice>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deviceName: { type: String, required: true },
    deviceType: { type: String, enum: ['Phone', 'Laptop', 'Tablet', 'Desktop'], required: true },
    createdAt: { type: Date, default: Date.now },
});

const Device = model<IDevice>('Device', deviceSchema);

export default Device;
