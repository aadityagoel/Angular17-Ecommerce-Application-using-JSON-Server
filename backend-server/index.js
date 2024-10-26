const express = require('express');
const multer = require('multer');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://apex-institute-of-fetal-and-reproductive.onrender.com',  // Only allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allowed headers
}));

// JSON Server setup for managing doctor, contact, and user data in db.json
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// #region DOCTOR ROUTES
/****************** DOCTOR ROUTES ******************/

// Route to get all doctors
app.get('/api/doctors', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(dbData.doctors);
});

// Route to get a single doctor by ID
app.get('/api/doctors/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const doctor = dbData.doctors.find(doc => doc.id == req.params.id);
    if (doctor) {
        res.json(doctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
});

// Route to add a new doctor with file uploads (profile image and CV)
app.post('/api/doctors', upload.fields([{ name: 'uploadPhoto', maxCount: 1 }, { name: 'cv_pdf', maxCount: 1 }]), (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const newDoctor = {
        id: Date.now(),
        name: req.body.name,
        specialist: req.body.specialist,
        aboutYou: req.body.aboutYou,
        uploadPhoto: req.files['uploadPhoto'] ? `/uploads/${req.files['uploadPhoto'][0].filename}` : null,
        cv_pdf: req.files['cv_pdf'] ? `/uploads/${req.files['cv_pdf'][0].filename}` : null,
        status: req.body.status === 'true'
    };

    dbData.doctors.push(newDoctor);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.status(201).json(newDoctor);
});

// Route to update an existing doctor by ID (supports file uploads)
app.put('/api/doctors/:id', upload.fields([{ name: 'uploadPhoto', maxCount: 1 }, { name: 'cv_pdf', maxCount: 1 }]), (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const doctorIndex = dbData.doctors.findIndex(doc => doc.id == req.params.id);
    if (doctorIndex !== -1) {
        const existingDoctor = dbData.doctors[doctorIndex];

        const updatedDoctor = {
            ...existingDoctor,
            name: req.body.name || existingDoctor.name,
            specialist: req.body.specialist || existingDoctor.specialist,
            aboutYou: req.body.aboutYou || existingDoctor.aboutYou,
            uploadPhoto: req.files['uploadPhoto'] ? `/uploads/${req.files['uploadPhoto'][0].filename}` : existingDoctor.uploadPhoto,
            cv_pdf: req.files['cv_pdf'] ? `/uploads/${req.files['cv_pdf'][0].filename}` : existingDoctor.cv_pdf,
            status: req.body.status === 'true'
        };

        dbData.doctors[doctorIndex] = updatedDoctor;
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
        res.json(updatedDoctor);
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
});

// Route to delete a doctor by ID
app.delete('/api/doctors/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const updatedDoctors = dbData.doctors.filter(doc => doc.id != req.params.id);

    if (updatedDoctors.length === dbData.doctors.length) {
        return res.status(404).json({ message: 'Doctor not found' });
    }

    dbData.doctors = updatedDoctors;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.json({ message: 'Doctor deleted successfully' });
});
// #endregion 

// #region CONTACT ROUTES
/****************** CONTACT ROUTES ******************/

// Route to get all contacts
app.get('/api/contacts', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(dbData.contacts);
});

// Route to get a single contact by ID
app.get('/api/contacts/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const contact = dbData.contacts.find(c => c.id == req.params.id);
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
});

// Route to add a new contact
app.post('/api/contacts', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const newContact = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        comment: req.body.comment,
        status: req.body.status === 'true'
    };

    dbData.contacts.push(newContact);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.status(201).json(newContact);
});

// Route to update an existing contact by ID
app.put('/api/contacts/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const contactIndex = dbData.contacts.findIndex(c => c.id == req.params.id);
    if (contactIndex !== -1) {
        const existingContact = dbData.contacts[contactIndex];

        const updatedContact = {
            ...existingContact,
            name: req.body.name || existingContact.name,
            email: req.body.email || existingContact.email,
            phone: req.body.phone || existingContact.phone,
            comment: req.body.comment || existingContact.comment,
            status: req.body.status === 'true'
        };

        dbData.contacts[contactIndex] = updatedContact;
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
        res.json(updatedContact);
    } else {
        res.status(404).json({ message: 'Contact not found' });
    }
});

// Route to delete a contact by ID
app.delete('/api/contacts/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const updatedContacts = dbData.contacts.filter(c => c.id != req.params.id);

    if (updatedContacts.length === dbData.contacts.length) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    dbData.contacts = updatedContacts;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.json({ message: 'Contact deleted successfully' });
});

// #endregion 

// #region USER ROUTES
/****************** USER ROUTES ******************/

// Route to get all users
app.get('/api/users', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(dbData.users);
});

// Route to get a single user by ID
app.get('/api/users/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const user = dbData.users.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Route to add a new user (profile photo upload supported)
app.post('/api/users', upload.fields([{ name: 'uploadPhoto', maxCount: 1 }]), (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));


    const newUser = {
        id: Date.now(),
        name: req.body.name,
        mobNumber: req.body.mobNumber,
        email: req.body.email,
        age: req.body.age,
        dob: req.body.dob,
        password: req.body.password,
        address: {
            addLine1: req.body.addLine1,
            addLine2: req.body.addLine2,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
        },
        language: req.body.language,
        gender: req.body.gender,
        aboutYou: req.body.aboutYou,
        // uploadPhoto: req.file ? `/uploads/${req.file.filename}` : null,  // <-- Correct image upload handling
        uploadPhoto: req.files['uploadPhoto'] ? `/uploads/${req.files['uploadPhoto'][0].filename}` : null,
        agreetc: req.body.agreetc === 'true',
        role: req.body.role
    };

    dbData.users.push(newUser);


    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.status(201).json(newUser);
});

// Route to update an existing user by ID (supports profile photo upload)
app.put('/api/users/:id', upload.fields([{ name: 'uploadPhoto', maxCount: 1 }]), (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const userIndex = dbData.users.findIndex(u => u.id == req.params.id);
    if (userIndex !== -1) {
        const existingUser = dbData.users[userIndex];

        const updatedUser = {
            ...existingUser,
            name: req.body.name || existingUser.name,
            mobNumber: req.body.mobNumber || existingUser.mobNumber,
            email: req.body.email || existingUser.email,
            age: req.body.age || existingUser.age,
            dob: req.body.dob || existingUser.dob,
            password: req.body.password || existingUser.password,
            address: {
                addLine1: req.body.addLine1 || existingUser.address.addLine1,
                addLine2: req.body.addLine2 || existingUser.address.addLine2,
                city: req.body.city || existingUser.address.city,
                state: req.body.state || existingUser.address.state,
                zipCode: req.body.zipCode || existingUser.address.zipCode,
            },
            language: req.body.language || existingUser.language,
            gender: req.body.gender || existingUser.gender,
            aboutYou: req.body.aboutYou || existingUser.aboutYou,
            uploadPhoto: req.files['uploadPhoto'] ? `/uploads/${req.files['uploadPhoto'][0].filename}` : existingUser.uploadPhoto,
            // uploadPhoto: req.file ? `/uploads/${req.file.filename}` : existingUser.uploadPhoto,  // Handle photo update
            agreetc: req.body.agreetc === 'true',  // Convert string to boolean
            role: req.body.role || existingUser.role,
        };

        dbData.users[userIndex] = updatedUser;
        fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Route to delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const updatedUsers = dbData.users.filter(u => u.id != req.params.id);

    if (updatedUsers.length === dbData.users.length) {
        return res.status(404).json({ message: 'User not found' });
    }

    dbData.users = updatedUsers;
    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    res.json({ message: 'User deleted successfully' });
});
// #endregion

// #region Login 
// User Authentication Route
app.post('/api/users/auth', (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const { email, password } = req.body;
    const user = dbData.users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json(user);  // If authenticated, send user data
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Admin Authentication Route
app.post('/api/users/auth/admin', (req, res) => {

    const dbPath = path.join(__dirname, 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const { email, password } = req.body;
    const admin = dbData.users.find(u => u.email === email && u.password === password && u.role === 'admin');

    if (admin) {
        res.json(admin);  // If authenticated, send admin data
    } else {
        res.status(401).json({ message: 'Invalid admin credentials' });
    }
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = Date.now(); // Assign a new ID
    dbData.users.push(newUser);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2)); // Save new user to db.json
    res.status(201).json(newUser); // Respond with newly created user
});
// #endregion


/****************** USE JSON SERVER ******************/

// Use JSON Server for handling other CRUD operations
app.use(middlewares);
app.use('/api', router);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
