
import { useState, useEffect } from 'react';
import { Edit, MapPin, Calendar, Link as LinkIcon, Mail, Phone, Sparkles, GraduationCap, User, BookOpen } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  university: string;
  major: string;
  graduationYear: number;
  bio: string;
  avatar: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editData, setEditData] = useState<UserData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch profile');
        }
      } catch (err) {
        setError('Network error while fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setEditData({ ...userData! });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditData(null);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserData, value: string | number) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleSaveProfile = async () => {
    if (!editData) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: editData.firstName,
          lastName: editData.lastName,
          username: editData.username,
          university: editData.university,
          major: editData.major,
          graduationYear: editData.graduationYear,
          bio: editData.bio,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setIsEditing(false);
        setEditData(null);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update profile');
      }
    } catch (err) {
      alert('Network error while updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="card-shadow">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg mb-4"></div>
              <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="card-shadow">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Profile</h3>
            <p className="text-muted-foreground">{error || 'User data not found'}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="card-shadow">
        <CardContent className="p-0">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/10 rounded-t-lg"></div>
          
          {/* Profile Info */}
          <div className="p-6 -mt-16">
            <div className="flex items-end justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={`${userData.firstName} ${userData.lastName}`} />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {userData.firstName[0]}{userData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-8">
                  <h1 className="text-3xl font-bold text-foreground">{userData.firstName} {userData.lastName}</h1>
                  <p className="text-lg text-muted-foreground">{userData.major} Student</p>
                  <p className="text-muted-foreground">{userData.university}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      Class of {userData.graduationYear}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      @{userData.username}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Enhance
                </Button>
                <Button onClick={handleEditClick} className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      {isEditing && editData && (
        <Card className="card-shadow">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Edit Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">University</label>
                <input
                  type="text"
                  value={editData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Major</label>
                <input
                  type="text"
                  value={editData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Graduation Year</label>
                <input
                  type="number"
                  value={editData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleSaveProfile} disabled={saving} className="flex items-center gap-2">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button onClick={handleCancelEdit} variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About */}
          <Card className="card-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">About</h3>
              <p className="text-muted-foreground leading-relaxed">
                {userData.bio || 'No bio added yet. Click edit to add your bio!'}
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="card-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.major}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userData.university}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Info */}
          <Card className="card-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Academic Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Major:</strong> {userData.major}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>University:</strong> {userData.university}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm"><strong>Graduation Year:</strong> {userData.graduationYear}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
