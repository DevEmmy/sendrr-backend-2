import { Schema, model, Document } from 'mongoose';

interface INotification extends Document {
    userId: Schema.Types.ObjectId;
    message: string;
    read: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Notification = model<INotification>('Notification', notificationSchema);

export default Notification;
