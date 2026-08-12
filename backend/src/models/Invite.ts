import mongoose, { Schema } from 'mongoose';

export interface IInvite {
  code: string;
  isUsed: boolean;
  createdAt: Date;
}

const InviteSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  isUsed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // Auto-delete after 24 hours
});

export default mongoose.models.Invite || mongoose.model('Invite', InviteSchema);
