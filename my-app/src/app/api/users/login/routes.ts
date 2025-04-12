import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist", status: 404 });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid credentials", status: 401 });
    }

    // Login successful
    return NextResponse.json({ message: "Login successful", status: 200 });
    
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Something went wrong", status: 500 });
  }
}
