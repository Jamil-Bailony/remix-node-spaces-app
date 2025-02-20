/**
 * 
 * This script has been generated automatically, edit it if any edits happened
 * to the DB models of if you need to seed more data
 * 
*/
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import dynamoDB from '../config/db';
import { User } from '../models/User';
import { Space } from '../models/Space';
import { Feed } from '../models/Feed';
import { Comment } from '../models/Comment';
import { Reaction, ReactionType } from '../models/Reaction';

const TABLE_NAME = process.env.TABLE_NAME!;

const REACTION_TYPES: ReactionType[] = ['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'];

// Generate Random Users
const generateUsers = async (count: number) => {
    const passwordHash = await bcrypt.hash('password123', 10);
    return Array.from({ length: count }).map(() =>
        new User(
            `${faker.person.firstName()} ${faker.person.lastName()}`,
            faker.internet.email(),
            passwordHash,
            faker.image.avatar()
        )
    );
};

// Generate Random Spaces
const generateSpaces = (authorId: string, count: number) => {
    return Array.from({ length: count }).map(() =>
        new Space(
            authorId,
            faker.company.name(),
            faker.lorem.paragraph(),
            faker.image.url()
        )
    );
};

// Generate Random Feeds
const generateFeeds = (spaceId: string, authorId: string, count: number) => {
    return Array.from({ length: count }).map(() =>
        new Feed(
            spaceId,
            authorId,
            faker.lorem.sentence(),
            faker.lorem.paragraphs(3),
            faker.image.url()
        )
    );
};

// Generate Random Comments (including replies)
const generateComments = (
    spaceId: string,
    feedId: string,
    authorId: string,
    count: number,
    parentId?: string,
    level: number = 1
) => {
    if (level > 4) return []; // Max 4 levels of nesting

    return Array.from({ length: count }).map(() =>
        new Comment(
            spaceId,
            feedId,
            authorId,
            faker.lorem.paragraph(),
            parentId,
            level
        )
    );
};

// Generate Random Reactions
const generateReaction = (
    spaceId: string,
    feedId: string,
    userId: string,
    targetType: 'FEED' | 'COMMENT',
    commentId?: string
) => {
    const randomReactionType = REACTION_TYPES[Math.floor(Math.random() * REACTION_TYPES.length)];
    return new Reaction(spaceId, feedId, userId, randomReactionType, targetType, commentId);
};

const seedDatabase = async () => {
    console.log('🌱 Starting database seeding...');

    try {
        // 1️⃣ Create Users (5 users)
        console.log('Creating users...');
        const users = await generateUsers(5);
        await Promise.all(users.map(user =>
            dynamoDB.send(new PutCommand({
                TableName: TABLE_NAME,
                Item: user
            }))
        ));
        console.log(`✅ Created ${users.length} users`);

        // 2️⃣ Create Spaces (8 spaces per first user)
        console.log('Creating spaces...');
        const mainAuthor = users[0];
        const spaces = generateSpaces(mainAuthor.id, 8);
        await Promise.all(spaces.map(space =>
            dynamoDB.send(new PutCommand({
                TableName: TABLE_NAME,
                Item: space
            }))
        ));
        console.log(`✅ Created ${spaces.length} spaces`);

        // 3️⃣ Create Feeds, Comments, and Reactions
        for (const space of spaces) {
            // Create 5 feeds per space
            console.log(`Creating content for space: ${space.id}...`);
            const feeds = generateFeeds(space.id, mainAuthor.id, 5);

            for (const feed of feeds) {
                // Save feed
                await dynamoDB.send(new PutCommand({
                    TableName: TABLE_NAME,
                    Item: feed
                }));

                // Create 3 top-level comments per feed
                const topComments = generateComments(space.id, feed.id, users[1].id, 3);
                for (const comment of topComments) {
                    await dynamoDB.send(new PutCommand({
                        TableName: TABLE_NAME,
                        Item: comment
                    }));

                    // Create 2 replies for each top comment
                    const replies1 = generateComments(space.id, feed.id, users[2].id, 2, comment.id, 2);
                    for (const reply1 of replies1) {
                        await dynamoDB.send(new PutCommand({
                            TableName: TABLE_NAME,
                            Item: reply1
                        }));

                        // Create 1 reply for each second-level comment
                        const replies2 = generateComments(space.id, feed.id, users[3].id, 1, reply1.id, 3);
                        for (const reply2 of replies2) {
                            await dynamoDB.send(new PutCommand({
                                TableName: TABLE_NAME,
                                Item: reply2
                            }));
                        }
                    }

                    // Add reactions to comments
                    for (const user of users) {
                        if (Math.random() > 0.5) { // 50% chance of reaction
                            const reaction = generateReaction(space.id, feed.id, user.id, 'COMMENT', comment.id);
                            await dynamoDB.send(new PutCommand({
                                TableName: TABLE_NAME,
                                Item: reaction
                            }));
                        }
                    }
                }

                // Add reactions to feed
                for (const user of users) {
                    if (Math.random() > 0.3) { // 70% chance of reaction
                        const reaction = generateReaction(space.id, feed.id, user.id, 'FEED');
                        await dynamoDB.send(new PutCommand({
                            TableName: TABLE_NAME,
                            Item: reaction
                        }));
                    }
                }
            }
            console.log(`✅ Created content for space: ${space.id}`);
        }

        console.log('🎉 Database seeding completed successfully!');

        // Print some statistics
        console.log('\n📊 Seeding Statistics:');
        console.log(`- Users created: ${users.length}`);
        console.log(`- Spaces created: ${spaces.length}`);
        console.log(`- Feeds per space: 5`);
        console.log(`- Comments per feed: 3 (top-level)`);
        console.log(`- Replies per comment: 2 (up to 3 levels deep)`);
        console.log(`- Reaction probability: 70% per feed, 50% per comment`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};

const runSeed = async () => {
    try {
        await seedDatabase();
    } catch (error) {
        console.error('Fatal error during seeding:', error);
        process.exit(1);
    }
};

runSeed();
