# Database Access Documentation

## User Data Storage

User data is stored in MongoDB Atlas after email verification.

### Database Connection
- **Database**: MongoDB Atlas
- **Connection String**: Set in backend `.env` file as `MONGODB_URI`
- **Model**: `Lead` (defined in `backend/models/Lead.js`)

### Lead Schema
User data is stored in the `leads` collection with the following structure:

```javascript
{
  name: String,              // User's full name
  email: String,             // User's email (verified)
  phone: String,             // User's phone number
  whatsapp: Boolean,         // WhatsApp opt-in preference
  projectType: String,       // full-home, kitchen, or wardrobe
  bhkType: String,           // BHK type (for full-home)
  bhkSubSize: String,        // BHK sub-size (for full-home)
  roomCounts: {              // Room counts (for full-home)
    living: Number,
    kitchen: Number,
    bedroom: Number,
    bathroom: Number,
    dining: Number
  },
  kitchenLayout: String,      // Kitchen layout (for kitchen)
  wardrobeLength: String,    // Wardrobe length (for wardrobe)
  wardrobeType: String,      // Wardrobe type (for wardrobe)
  wardrobeFinish: String,    // Wardrobe finish (for wardrobe)
  wardrobeAccessories: [String], // Wardrobe accessories (for wardrobe)
  selectedPackage: String,   // Package level (for full-home/kitchen)
  estimatedQuote: String,     // Calculated price estimate
  emailVerified: Boolean,   // Email verification status
  verifiedAt: Date,          // Verification timestamp
  verificationMethod: String, // Verification method (email_otp)
  createdAt: Date,           // Record creation timestamp
  updatedAt: Date            // Record update timestamp
}
```

### API Endpoints

#### Save Lead (Email Verified)
- **Endpoint**: `POST /api/leads/email`
- **Authentication**: Bearer token (JWT from email OTP verification)
- **Description**: Saves user data after email verification
- **Response**: `{ success: true, leadId: <id> }`

#### Save Lead (Firebase Verified)
- **Endpoint**: `POST /api/leads`
- **Authentication**: Bearer token (Firebase ID token)
- **Description**: Saves user data after Firebase authentication
- **Response**: `{ success: true, leadId: <id> }`

#### Fetch All Leads
- **Endpoint**: `GET /api/leads`
- **Authentication**: None (for admin use)
- **Description**: Retrieves all leads from database
- **Response**: `{ success: true, leads: [...] }`

### Accessing the Database

#### Via MongoDB Atlas
1. Log in to MongoDB Atlas console
2. Navigate to the cluster
3. Use MongoDB Compass or Atlas Data Explorer to view/edit data

#### Via Backend API
```bash
# Fetch all leads
curl http://localhost:5000/api/leads

# Or via frontend
fetch('http://localhost:5000/api/leads')
  .then(res => res.json())
  .then(data => console.log(data.leads))
```

### Environment Variables
Required in backend `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```

### Security Notes
- Email verification is required before saving lead data
- Duplicate verified emails are prevented
- Firebase token verification for phone auth
- JWT token verification for email OTP
