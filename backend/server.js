import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appointment_booking_system'
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// Register new user
app.post('/register', async (req, res) => {
    const sql = 'INSERT INTO register (`name`, `email`, `phone`, `gender`, `password`) VALUES (?)';
    
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const values = [
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.gender,
            hashedPassword
        ];

        db.query(sql, [values], (err, data) => {
            if (err) {
                console.error(err);
                return res.json({ error: 'Error while inserting data' });
            }
            return res.json({ message: 'User registered successfully', data });
        });
    } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM register WHERE `phone` = ?';
    db.query(sql, [req.body.phone], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: 'Database error' });
        }
        if (result.length > 0) {
            return res.json({ 
                Status: 'Success',
                user: {
                    name: result[0].name,
                    phone: result[0].phone
                }
            });
        } else {
            return res.json({ Error: 'Phone number not found' });
        }
    });
});

// New appointment booking
app.post('/booking', (req, res) => {
    const sql = 'INSERT INTO booking (`name`, `phone`, `service`, `date`, `time`) VALUES (?)';
    
    const values = [
        req.body.name,
        req.body.phone,
        req.body.service,
        req.body.date,
        req.body.time,
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ error: 'Error while inserting data' });
        }
        return res.json({ message: 'Appointment booked successfully', data });
    });
});

// Get bookings (for a specific user or all users)
app.get('/api/bookings', (req, res) => {
    const { phone } = req.query;
    let sql;
    let values = [];

    if (phone) {
        sql = "SELECT * FROM booking WHERE phone = ?";
        values = [phone];
    } else {
        sql = "SELECT * FROM booking"; // Fetch all bookings if no phone is provided
    }

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error fetching bookings:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Update an appointment
app.put('/booking/:id', (req, res) => {
    const { service, date, time } = req.body;
    const sql = "UPDATE booking SET service = ?, date = ?, time = ? WHERE id = ?";

    db.query(sql, [service, date, time, req.params.id], (err, result) => {
        if (err) {
            console.error("Error updating appointment:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Appointment updated successfully", result });
    });
});

// Delete an appointment
app.delete('/booking/:id', (req, res) => {
    const sql = "DELETE FROM booking WHERE id = ?";
    
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting appointment:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Appointment deleted successfully", result });
    });
});

app.listen(8081, () => {
    console.log('Server is listening on port 8081');
});
