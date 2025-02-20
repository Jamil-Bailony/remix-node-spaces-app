# **Spaces App MVP: User Stories**  

## **1. Overview**  
The **Spaces App** is a platform where users can discover, subscribe to, and contribute to different spaces. Users can post feeds, comment, react, and engage with other members. The app includes **role-based permissions**, and sorting mechanisms for better content discovery.

---

## **1 Spaces List & Discovery**  

### **User Story 1.1 – Browse Spaces**  
**As a user,** I want to browse available spaces so that I can discover new communities to join.  

**Acceptance Criteria:**  
- Users can see a **paginated list of spaces** (20 per page).  
- Each space displays:  
  - **Title** (max 100 characters).  
  - **Short description** (max 250 characters).  
  - **Subscriber count** & **Total feeds count**.  
- Clicking a space redirects to its **details page**.  

**Edge Cases:**  
- If there are **no spaces**, show *"No spaces available yet."*  
- If a space is **deleted**, it should **no longer appear in the list**.  

---

### **User Story 1.2 – Search for a Space**  
**As a user,** I want to search for a space by name so that I can quickly find relevant communities.  

**Acceptance Criteria:**  
- Users can enter a **search term (min 3, max 50 characters)**.  
- The system performs a **case-insensitive search**.  
- If no results are found, display *"No spaces found."*  

**Edge Cases:**  
- If the **search term is empty**, return all spaces.  
- If the search contains **special characters (@#$%^&*)**, ignore them.  

---

### **User Story 1.3 – Sort Spaces**  
**As a user,** I want to sort spaces by different criteria so that I can discover spaces based on popularity or activity.  

**Acceptance Criteria:**  
- Users can sort spaces by:  
  - **Newest** (default).  
  - **Oldest**.  
  - **Popular** (most subscribers).  
  - **Rich** (most feeds).  
- Sorting is stored in **session storage** to persist user preference.  

**Edge Cases:**  
- If **two spaces have the same rank**, sort by **creation date**.  

---

## **2 Subscribe/Unsubscribe to Space**  

### **User Story 2.1 – Subscribe to a Space**  
**As a user,** I want to subscribe to a space so that I can receive updates.  

**Acceptance Criteria:**  
- Clicking **"Subscribe"** adds the space to **My Subscriptions**.  

**Edge Cases:**  
- If a user is **already subscribed**, show *"You are already subscribed."*  

---

### **User Story 2.2 – Unsubscribe from a Space**  
**As a user,** I want to unsubscribe from a space so that I stop receiving updates.  

**Acceptance Criteria:**  
- Clicking **"Unsubscribe"** removes the space from **My Subscriptions**.  

**Edge Cases:**  
- If a user **tries to unsubscribe from a space they never subscribed to**, show *"You are not subscribed to this space."*  

---

## **3 Space Page & Tabs**  

### **User Story 3.1 – View Space Details**  
**Acceptance Criteria:**  
- Users can see:  
  - **Title** (max 100 characters).  
  - **Banner Image** (optional, max 2MB).  
  - **Description** (max 1000 characters).  

**Edge Cases:**  
- If a space **has no feeds**, show *"No posts yet. Be the first to contribute!"*  

---

### **User Story 3.2 – View Space Feeds**  
**Acceptance Criteria:**  
- Users can sort feeds by:  
  - **Newest** (default).  
  - **Oldest**.  
  - **Most Commented**.  
  - **Most Liked**.  

**Edge Cases:**  
- If there are **no feeds**, show *"No posts yet. Start a discussion!"*  

---

## **4 Posting & Managing Feeds**  

### **User Story 4.1 – Post a Feed**  
**Acceptance Criteria:**  
- Users can enter:  
  - **Title** (min 5, max 100 characters).  
  - **Body** (min 20, max 5000 characters).  
  - **Attachments** (JPEG/PNG, max 3 images, 2MB each).  

**Edge Cases:**  
- If a user tries to post a **blank title/body**, show an error.  

---

## **5 Comments & Replies**  

### **User Story 5.1 – Comment on a Feed**  
**Acceptance Criteria:**  
- Users can add a comment (max **500 characters**).  

**Edge Cases:**  
- If a user **tries to comment on a deleted feed**, prevent submission.  

---

## **6 Reactions System**  

### **User Story 6.1 – React to a Feed or Comment**  
**As a user,** I want to react to feeds and comments so that I can express my opinion.  

**Acceptance Criteria:**  
- Users can react using predefined reactions:  
  - 👍 Like  
  - ❤️ Love  
  - 😂 Laugh  
  - 😲 Wow  
  - 😡 Angry  
  - 👎 Dislike  
- Users can remove their reaction.  

**Edge Cases:**  
- Users **cannot react twice** to the same feed or comment.  
- If a feed or comment **is deleted**, its reactions should be removed.  

---

## **8 User Roles & Permissions**  

**Roles & Permissions:**  

| **Role**       | **Permissions** |
|---------------|----------------|
| **Admin**     | Full control over space settings, feeds, and comments, and user management. |
| **Moderator** | Can manage feeds, comments, and review content. Cannot change space settings or roles. |
| **Contributor** | Can post feeds, comment, and interact with content. |
