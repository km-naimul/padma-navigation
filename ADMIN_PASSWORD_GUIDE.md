# Admin Password & Username Change Guide

This guide explains how to change the admin username and password for Padma Navigation admin panel.

## Current Default Credentials

- **Email**: `admin@padmanavigation.com`
- **Username**: `admin`
- **Password**: `admin123`

---

## Method 1: Using Admin Panel (Recommended)

The easiest way to change your password and username is through the admin panel interface.

### Steps:

1. **Login to Admin Panel**
   - Navigate to `http://localhost:3000/admin/login`
   - Login with your current credentials

2. **Access Settings Page**
   - Click on "Settings" in the sidebar menu
   - Or navigate directly to `http://localhost:3000/admin/settings`

3. **Change Username**
   - In the "Profile Settings" section
   - Update the "Username" field
   - Click "Update Profile"
   - Minimum 3 characters required

4. **Change Password**
   - In the "Change Password" section
   - Enter your current password
   - Enter your new password (minimum 6 characters)
   - Confirm your new password
   - Click "Change Password"

### Notes:
- Email cannot be changed through the admin panel
- Username must be unique and at least 3 characters
- Password must be at least 6 characters
- You must know your current password to change it

---

## Method 2: Using Command Line Script

For quick changes or if you've forgotten your password, use the command-line script.

### Prerequisites:
- Backend server must be stopped (or use a separate terminal)
- Node.js and npm installed
- MongoDB connection configured in `.env`

### Steps:

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Run the Change Admin Script**
   
   **Change Password Only:**
   ```bash
   npm run change:admin admin@padmanavigation.com "" "newpassword123"
   ```
   
   **Change Username Only:**
   ```bash
   npm run change:admin admin@padmanavigation.com "newusername" ""
   ```
   
   **Change Both:**
   ```bash
   npm run change:admin admin@padmanavigation.com "newusername" "newpassword123"
   ```

   **Or using ts-node directly:**
   ```bash
   npx ts-node src/utils/changeAdmin.ts admin@padmanavigation.com "newusername" "newpassword123"
   ```

### Script Parameters:
- **Parameter 1**: Email address (default: `admin@padmanavigation.com`)
- **Parameter 2**: New username (optional, use `""` to skip)
- **Parameter 3**: New password (optional, use `""` to skip)

### Examples:

```bash
# Change password only
npm run change:admin admin@padmanavigation.com "" "MyNewPassword123"

# Change username only
npm run change:admin admin@padmanavigation.com "newadmin" ""

# Change both username and password
npm run change:admin admin@padmanavigation.com "newadmin" "MyNewPassword123"

# Change for different email
npm run change:admin another@email.com "newadmin" "newpass123"
```

### Validation Rules:
- Username: Minimum 3 characters, must be unique
- Password: Minimum 6 characters
- Email: Must exist in database

---

## Method 3: Direct Database Update (Advanced)

⚠️ **Warning**: Only use this method if you have direct database access and understand MongoDB operations.

### Steps:

1. **Connect to MongoDB**
   - Use MongoDB Compass, MongoDB Shell, or any MongoDB client
   - Connect using your MongoDB connection string

2. **Find Admin User**
   ```javascript
   use your_database_name
   db.users.findOne({ email: "admin@padmanavigation.com" })
   ```

3. **Update Username**
   ```javascript
   db.users.updateOne(
     { email: "admin@padmanavigation.com" },
     { $set: { username: "newusername" } }
   )
   ```

4. **Update Password** (requires hashing)
   - Passwords are hashed using bcrypt
   - You'll need to hash the password first, or use the script method instead

**Note**: It's recommended to use Method 1 or Method 2 instead of direct database updates.

---

## Method 4: Reset to Default (Emergency)

If you're locked out and need to reset to default credentials:

1. **Stop the backend server**

2. **Run the reset script:**
   ```bash
   cd backend
   npx ts-node src/utils/resetAdmin.ts
   ```

3. **This will reset:**
   - Email: `admin@padmanavigation.com`
   - Username: `admin`
   - Password: `admin123`

4. **Restart backend server and login with default credentials**

5. **Immediately change password using Method 1 or Method 2**

---

## Troubleshooting

### Issue: "Username already exists"
- **Solution**: Choose a different username that's not already in use

### Issue: "Password too short"
- **Solution**: Use a password with at least 6 characters

### Issue: "Current password is incorrect"
- **Solution**: Double-check your current password, or use Method 2 to reset

### Issue: Script fails with connection error
- **Solution**: 
  - Ensure MongoDB is running
  - Check `.env` file has correct database connection string
  - Ensure backend dependencies are installed (`npm install`)

### Issue: Settings page shows error
- **Solution**:
  - Ensure backend server is running
  - Check browser console for errors
  - Verify you're logged in with valid token

---

## Security Best Practices

1. **Change Default Password Immediately**
   - Never use default password in production
   - Use strong, unique passwords

2. **Regular Password Updates**
   - Change password periodically
   - Use password manager for secure storage

3. **Username Security**
   - Don't use obvious usernames like "admin"
   - Use unique, non-guessable usernames

4. **Access Control**
   - Limit admin access to trusted personnel
   - Monitor admin activities

5. **Backup**
   - Keep secure backup of admin credentials
   - Store in password manager or secure vault

---

## API Endpoints (For Developers)

### Change Password
```
POST /api/auth/change-password
Headers: Authorization: Bearer <token>
Body: {
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Update Profile
```
PUT /api/auth/profile
Headers: Authorization: Bearer <token>
Body: {
  "username": "newusername"
}
```

---

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review backend server logs for errors
3. Verify MongoDB connection is working
4. Ensure all dependencies are installed

---

**Last Updated**: 2024
