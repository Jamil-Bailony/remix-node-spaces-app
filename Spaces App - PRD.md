# **Spaces App MVP: Product Requirements Document (PRD)**

## **1. Overview**
The Spaces App is a platform where users can explore, subscribe to, and contribute to different spaces. Each space hosts discussions through feeds/topics, and users can interact via comments and reactions. Spaces have structured roles for better moderation, a basic reporting system for content management, and sorting mechanisms to enhance content discovery.

---

## **2. Features & User Stories**

### **2.1 Spaces List & Discovery**
- Users can **browse available spaces**.
- Users can **view a space’s title and brief description**.
- Users can **search for spaces by name**.
- Users can **sort spaces by**:
  - **Newest** (recently created).
  - **Oldest**.
  - **Popular** (number of subscribers).
  - **Rich** (number of feeds).
- Users can **click on a space** to view its details.

---

### **2.2 User Roles & Permissions**
Each space has **three roles** with different permissions:

| **Role**       | **Permissions** |
|---------------|----------------|
| **Admin**     | Full control over space settings, feeds, comments, and user management. |
| **Moderator** | Can manage feeds, and comments. Cannot change space settings or roles. |
| **Contributor** | Can post feeds, comment, and interact with content. |

#### **User Stories:**
- **Admins** can:
  - Manage space settings (title, banner, description).
  - Assign and remove **moderators/contributors**.
  - Delete any feed, comment, or user from the space.
- **Moderators** can:
  - Delete **feeds or comments** if necessary.
- **Contributors** can:
  - Post feeds and interact via comments and reactions.

---

### **2.3 Subscribe/Unsubscribe to Space**
- Users can **subscribe** to a space to receive updates.
- Users can **unsubscribe** from a space.

---

### **2.4 Space Page & Tabs**
Each space page consists of **three main tabs**:
1. **Feeds** – Displays the latest discussions.
2. **People** – Lists contributors, moderators, and admins.
3. **About** – Shows general space details.

#### **Feeds Tab**
- Users can **view the latest topics (feeds)** inside the space.
- Each feed includes:
  - **Title**.
  - **Body (text, media)**.
  - **Author**.
  - **Creation Date**.
  - **Edit Date**.
  - **Comment Count**.
  - **Reactions Count**.
- Users can **sort feeds** by:
  - **Newest** (recently posted).
  - **Oldest**.
  - **Most Commented**.
  - **Most Liked**.

#### **People Tab**
- Displays a **list of people in the space** sorted by contribution level.
- Users can **search for a specific user** in the space.

#### **About Tab**
- Displays:
  - **Space title**.
  - **Banner image**.
  - **Description**.
  - **Number of contributors and subscribers**.

---

### **2.5 Posting Feeds**
- Users with **Contributor, Moderator, or Admin roles** can post feeds.
- Each feed includes:
  - **Title**.
  - **Body**.
  - **Author**.
  - **Creation Date**.
  - **Edit Date**.
  - **Comments & Reactions Count**.

---

### **2.6 Comments & Replies**
- Users can **see the number of comments** on a feed.
- Users can **click to open the comment section**.
- Users can **write comments**.
- **Comment nesting** is limited to **4 levels**.
- Each comment includes:
  - **Text**.
  - **Reactions**.
  - **Replies** (up to level 4).

---

### **2.7 Reactions System**
- Users can **react** to feeds and comments using **predefined reaction types**:
  - 👍 Like
  - ❤️ Love
  - 😂 Laugh
  - 😲 Wow
  - 😡 Angry
  - 👎 Dislike

---