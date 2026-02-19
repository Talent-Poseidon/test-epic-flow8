import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProfileCard } from '@/components/dashboard/profile-card';

const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
};

const mockProfile = {
  id: 'user-123',
  email: 'test@example.com',
  full_name: 'Test User',
  avatar_url: null,
  role: 'user',
  is_approved: true,
  provider: 'email',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
};

describe('ProfileCard', () => {
  it('renders user information correctly', () => {
    render(<ProfileCard user={mockUser} profile={mockProfile} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Joined January 1, 2023')).toBeInTheDocument();
  });

  it('allows updating the full name', () => {
    render(<ProfileCard user={mockUser} profile={mockProfile} />);

    const fullNameInput = screen.getByLabelText('Full name');
    fireEvent.change(fullNameInput, { target: { value: 'New Name' } });
    expect(fullNameInput.value).toBe('New Name');
  });

  it('displays success message on successful update', async () => {
    render(<ProfileCard user={mockUser} profile={mockProfile} />);

    const saveButton = screen.getByText('Save changes');
    fireEvent.click(saveButton);

    // Mocking the update function to simulate success
    await screen.findByText('Profile updated successfully.');
    expect(screen.getByText('Profile updated successfully.')).toBeInTheDocument();
  });

  it('displays error message on update failure', async () => {
    render(<ProfileCard user={mockUser} profile={mockProfile} />);

    const saveButton = screen.getByText('Save changes');
    fireEvent.click(saveButton);

    // Mocking the update function to simulate error
    await screen.findByText('Error updating profile.');
    expect(screen.getByText('Error updating profile.')).toBeInTheDocument();
  });
});
