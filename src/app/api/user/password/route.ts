import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { findUserByEmail, verifyPassword, updateUserPassword } from '../../../../lib/userService';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to change your password.' },
        { status: 401 }
      );
    }

    const email = session.user.email;
    const body = await req.json();
    const { currentPassword, newPassword } = body || {};

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required.' },
        { status: 400 }
      );
    }

    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User record not found.' },
        { status: 404 }
      );
    }

    // Verify current password
    if (user.password && !verifyPassword(currentPassword, user.password)) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect. Please re-enter.' },
        { status: 400 }
      );
    }

    // Update password with secure PBKDF2 hash
    const ok = await updateUserPassword(email, newPassword);

    if (!ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to update password. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully! You can use your new password next time you log in.',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
