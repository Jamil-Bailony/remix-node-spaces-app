export interface ISubscription {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'SUBSCRIPTION';
    userId: string;
    spaceId: string;
    subscribedAt: string;
}

export class Subscription implements ISubscription {
    PK: string;
    SK: string;
    GSI1PK: string;
    GSI1SK: string;
    type: 'SUBSCRIPTION';
    userId: string;
    spaceId: string;
    subscribedAt: string;

    constructor(spaceId: string, userId: string) {
        this.subscribedAt = new Date().toISOString();

        this.PK = `SPACE#${spaceId}`;
        this.SK = `SUBSCRIBER#${userId}`;
        this.GSI1PK = `USER#${userId}`;
        this.GSI1SK = `SUBSCRIPTION#${this.subscribedAt}`;
        this.type = 'SUBSCRIPTION';

        this.userId = userId;
        this.spaceId = spaceId;
    }
}
