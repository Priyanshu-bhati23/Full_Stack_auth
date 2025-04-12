import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';


connect(); // Ensure MongoDB is connected

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // === Validate input ===
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password strength validation (min 8 characters, with letters & numbers)
    const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and contain letters and numbers",
        },
        { status: 400 }
      );
    }

    // === Check if user already exists ===
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // === Hash password ===
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // === Save user to DB ===
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("✅ New user created:", savedUser.email);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("❌ Signup error:", error.message || error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
