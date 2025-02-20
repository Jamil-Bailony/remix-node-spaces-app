import { v4 as uuidv4 } from 'uuid';

export interface IReport {
    PK: string;
    SK: string;
    userId: string;
    targetId: string;
    targetType: 'feed' | 'comment';
    reason: string;
    status: 'Pending' | 'Under Review' | 'Resolved';
    createdAt: string;
}

export class Report implements IReport {
    PK: string;
    SK: string;
    userId: string;
    targetId: string;
    targetType: 'feed' | 'comment';
    reason: string;
    status: 'Pending' | 'Under Review' | 'Resolved';
    createdAt: string;

    constructor(userId: string, targetId: string, targetType: 'feed' | 'comment', reason: string) {
        this.PK = `REPORT#${uuidv4()}`;
        this.SK = `TARGET#${targetId}`;
        this.userId = userId;
        this.targetId = targetId;
        this.targetType = targetType;
        this.reason = reason;
        this.status = 'Pending';
        this.createdAt = new Date().toISOString();
    }
}
