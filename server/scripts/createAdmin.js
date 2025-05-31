const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function createAdmin() {
    try {
        console.log('🚀 Starting admin creation process...');

        // Different admin credentials - you can change these
        const adminData = {
            username: 'SuperMart Admin',
            email: 'supermart.admin@example.com',  // Different email
            password: 'SuperAdmin2024',             // Different password
            dob: '1985-06-15'
        };

        // Check if table exists first
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'msuser'
            );
        `);
        
        if (!tableCheck.rows[0].exists) {
            console.log('❌ msuser table does not exist. Please run migrations first.');
            console.log('Run: npm run migrate');
            return;
        }

        // Check table structure
        const columns = await pool.query(`
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = 'msuser'
            ORDER BY ordinal_position;
        `);
        
        console.log('📋 Table columns found:', columns.rows.map(row => row.column_name));

        // Check if admin already exists
        const existingAdmin = await pool.query(
            'SELECT * FROM msuser WHERE useremail = $1',
            [adminData.email]
        );

        if (existingAdmin.rows.length > 0) {
            console.log('✅ Admin user already exists!');
            console.log('📧 Email:', adminData.email);
            console.log('🔑 Password:', adminData.password);
            console.log('👤 User Details:', {
                id: existingAdmin.rows[0].userid,
                username: existingAdmin.rows[0].username,
                email: existingAdmin.rows[0].useremail,
                role: existingAdmin.rows[0].userrole
            });
            return;
        }

        // Hash password
        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Create admin user
        console.log('👤 Creating admin user...');
        const result = await pool.query(
            'INSERT INTO msuser (username, useremail, userpassword, userdob, userrole) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [adminData.username, adminData.email, hashedPassword, adminData.dob, 'admin']
        );

        console.log('✅ Admin user created successfully!');
        console.log('🎉 Admin Details:');
        console.log('   📧 Email:', adminData.email);
        console.log('   🔑 Password:', adminData.password);
        console.log('   👤 Username:', adminData.username);
        console.log('   🆔 User ID:', result.rows[0].userid);
        console.log('   🎭 Role:', result.rows[0].userrole);
        
        console.log('\n🚀 You can now login to POS with these credentials!');
        
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        
        if (error.code === '23505') {
            console.log('💡 This email is already registered. Try a different email.');
        }
    } finally {
        await pool.end();
        console.log('🔌 Database connection closed.');
    }
}

// Run the function
createAdmin();