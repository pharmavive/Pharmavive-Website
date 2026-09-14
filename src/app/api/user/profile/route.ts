import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { findUserByEmail, updateUserProfile } from '../../../../lib/userService';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to view your profile.' },
        { status: 401 }
      );
    }

    const email = session.user.email;
    const user = await findUserByEmail(email);

    if (!user) {
      const userMeta = session.user as { role?: string; institution?: string };
      return NextResponse.json({
        success: true,
        user: {
          name: session.user.name || 'Researcher',
          email: session.user.email,
          role: userMeta.role || 'Customer',
          institution: userMeta.institution || '',
          phone: '',
          country: '',
          isAdmin: session.user.isAdmin || false,
        }
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        institution: user.institution || '',
        role: user.role || 'Customer',
        phone: user.phone || '',
        country: user.country || '',
        isAdmin: user.isAdmin || false,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve profile.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in to update your profile.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, institution, role, phone, country } = body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name cannot be empty.' },
        { status: 400 }
      );
    }

    const updated = await updateUserProfile(session.user.email, {
      name: name.trim(),
      institution: typeof institution === 'string' ? institution.trim() : '',
      role: typeof role === 'string' ? role.trim() : 'Customer',
      phone: typeof phone === 'string' ? phone.trim() : '',
      country: typeof country === 'string' ? country.trim() : '',
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      user: updated ? {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        institution: updated.institution || '',
        role: updated.role || 'Customer',
        phone: updated.phone || '',
        country: updated.country || '',
        isAdmin: updated.isAdmin || false,
      } : null,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update profile.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
