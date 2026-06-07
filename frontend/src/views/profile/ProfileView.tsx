// ProfileView.tsx
import { useAuth } from "../../hooks/useAuth";
import ProfileForm from "../../components/profile/ProfileForm";

const ProfileView = () => {
  const { data, isLoading } = useAuth();

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (data) return <ProfileForm data={data} />;
};

export default ProfileView;