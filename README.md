# Contact List in React — Multi-user with Contact CRUD

This project is a **user-based contact management** application developed with **React**, where you can select an existing user or automatically create a new one, and then add, edit, delete, or view contacts associated with that user.

---

## Important Details

- The entire application is dynamically rendered using **React components**.
- **`useState`** and a **global reducer** (`useGlobalReducer`) are used to manage:
  - Active user.
  - User's contact list.
  - Status and error messages.
  - Temporary data for editing contacts.
- The application connects to a **REST API** that automatically creates a new address book if the entered user does not exist.
- The design uses **custom CSS**, with a dark style and salmon-colored borders.

---

## Main features

### 1. Select or create user
- Upon startup, the **user name** is requested.
- If the name **exists**, their contact list is loaded.
- If the name **does not exist**, a new address book is automatically created for that user.
- Temporary messages are displayed confirming whether the user was created or no name was entered.

### 2. Add contacts
- The user can fill out a form with:
  - Name
  - Phone number
  - Address
  - Email
- When adding a contact:
  - It is added to the active user's address book.
  - The form is automatically cleared.
  - If any field is empty, a temporary error message is displayed.

### 3. Edit contacts
- Each contact includes an **“Edit”** button that loads their data into the form.
- When the edit is submitted:
  - The contact is updated in the list.
  - A temporary confirmation message is displayed.

### 4. Delete individual contacts
- Each contact has a **“Delete”** button.
- When deleting a contact:
  - It is removed from the active user's list.
  - A temporary message appears confirming the deletion.

### 5. View contact details
- Clicking on a contact opens a **details panel**:
  - Random image associated with the contact ID.
  - Complete information: name, email, phone number, and address.
  - Buttons to **edit** or **delete** from the panel.

### 6. Status messages
- Temporary messages appear when creating a user, adding, editing, or deleting contacts.
- Examples:
  - `noUser` → user not logged in.
  - `notFound` → user not found (created automatically).
  - `contactCreated`, `contactUpdated`, `contactDeleted` → actions on contacts.
- Messages disappear automatically after a few seconds.

---

## How to use the application

1. Enter your **username**:
   - If it exists, load your address book.
   - If it does not exist, it is created automatically.
2. View that user's contact list.
3. Add a contact by completing the form and clicking **Send**.
4. Edit a contact using the **Edit** button.
5. Delete a contact using the **Delete** button.
6. Click on a contact to see their **full details**.

---

## Possible improvements

- Add search and filters within the address book.
- Add pagination to avoid having too many contacts on the screen.
- Ability to upload personalized photos for each contact.
- Add animations.
