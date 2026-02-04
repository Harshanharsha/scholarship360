const mongoose = require("mongoose");
const Admin = require("./model/adminSchema");
require("dotenv").config();

const createAdmin = async () => {
    const db = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/scholarship360";

    try {
        await mongoose.connect(db);
        console.log("✅ Custom DB Connection Successful");

        const adminEmail = "admin@scholarship360.com";
        const adminPassword = "admin123"; // INSECURE: Usage for demo purposes only

        const existingAdmin = await Admin.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log("⚠️  Admin already exists:", adminEmail);
        } else {
            const newAdmin = new Admin({
                email: adminEmail,
                password: adminPassword,
            });
            await newAdmin.save();
            console.log("🎉 Admin created successfully!");
            console.log(`📧 Email: ${adminEmail}`);
            console.log(`🔑 Password: ${adminPassword}`);
        }
    } catch (error) {
        console.error("❌ Error creating admin:", error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
